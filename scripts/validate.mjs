import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import Ajv2020 from "ajv/dist/2020.js";
import { parseDocument } from "yaml";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pluginRoot = join(root, "plugins", "terminal");
const schemaRoot = join(root, "schemas", "agent-plugins", "1.0.0");
const failures = [];
const ajv = new Ajv2020({ allErrors: true, strict: true });

function fail(message) {
  failures.push(message);
}

function readText(path) {
  try {
    return readFileSync(path, "utf8");
  } catch (error) {
    fail(`${relative(root, path)}: ${error.message}`);
    return "";
  }
}

function readJson(path) {
  const text = readText(path);
  try {
    return JSON.parse(text);
  } catch (error) {
    fail(`${relative(root, path)}: invalid JSON (${error.message})`);
    return {};
  }
}

function walk(path) {
  return readdirSync(path)
    .filter((name) => name !== ".git" && name !== "node_modules")
    .flatMap((name) => {
      const child = join(path, name);
      return statSync(child).isDirectory() ? walk(child) : [child];
    });
}

function validateJsonSchema(label, value, schema) {
  try {
    const validate = ajv.compile(schema);
    if (!validate(value)) {
      for (const error of validate.errors ?? []) {
        fail(`${label}${error.instancePath || "/"}: ${error.message}`);
      }
    }
  } catch (error) {
    fail(`${label}: could not compile schema (${error.message})`);
  }
}

const portable = readJson(join(pluginRoot, "plugin.json"));
const claude = readJson(join(pluginRoot, ".claude-plugin", "plugin.json"));
const codex = readJson(join(pluginRoot, ".codex-plugin", "plugin.json"));
const packageJson = readJson(join(root, "package.json"));
const mcp = readJson(join(pluginRoot, "mcp.json"));
const pluginSchema = readJson(join(schemaRoot, "plugin.schema.json"));
const mcpSchema = readJson(join(schemaRoot, "mcp.schema.json"));

validateJsonSchema("plugins/terminal/plugin.json", portable, pluginSchema);
validateJsonSchema("plugins/terminal/mcp.json", mcp, mcpSchema);

for (const [manifestPath, manifest] of [
  ["plugins/terminal/plugin.json", portable],
  ["plugins/terminal/.claude-plugin/plugin.json", claude],
  ["plugins/terminal/.codex-plugin/plugin.json", codex],
]) {
  if (manifest.name !== "terminal") fail(`${manifestPath}: name must be terminal`);
  if (manifest.version !== portable.version) {
    fail(`${manifestPath}: version ${manifest.version} does not match ${portable.version}`);
  }

  for (const field of ["description", "author", "homepage", "repository", "license", "keywords"]) {
    if (!isDeepStrictEqual(manifest[field], portable[field])) {
      fail(`${manifestPath}: ${field} does not match the portable manifest`);
    }
  }
}

if (packageJson.version !== portable.version) {
  fail(`package.json version ${packageJson.version} does not match plugin version ${portable.version}`);
}

for (const marketplacePath of [
  join(root, ".agents", "plugins", "marketplace.json"),
  join(root, ".claude-plugin", "marketplace.json"),
  join(root, ".cursor-plugin", "marketplace.json"),
]) {
  const marketplace = readJson(marketplacePath);
  const entry = marketplace.plugins?.find((plugin) => plugin.name === "terminal");
  if (!entry) {
    fail(`${relative(root, marketplacePath)}: missing terminal plugin entry`);
  } else if (entry.version && entry.version !== portable.version) {
    fail(`${relative(root, marketplacePath)}: version ${entry.version} does not match ${portable.version}`);
  }
}

const terminalMcp = mcp.mcpServers?.terminal;
if (terminalMcp?.type !== "streamable-http" || terminalMcp?.url !== "https://mcp.withterminal.com/mcp") {
  fail("plugins/terminal/mcp.json: Terminal must use the official Streamable HTTP endpoint");
}

const skillsRoot = join(pluginRoot, "skills");
const skillDirectories = readdirSync(skillsRoot)
  .map((name) => join(skillsRoot, name))
  .filter((path) => statSync(path).isDirectory());

for (const skillDirectory of skillDirectories) {
  const directoryName = relative(skillsRoot, skillDirectory);
  const skillPath = join(skillDirectory, "SKILL.md");
  const content = readText(skillPath);
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) {
    fail(`${relative(root, skillPath)}: missing YAML frontmatter`);
    continue;
  }

  const document = parseDocument(frontmatter[1], { uniqueKeys: true });
  for (const error of document.errors) {
    fail(`${relative(root, skillPath)}: invalid YAML frontmatter (${error.message})`);
  }

  const metadata = document.errors.length ? {} : document.toJS();
  const name = metadata?.name;
  const description = metadata?.description;
  if (name !== directoryName) fail(`${relative(root, skillPath)}: name must match its directory`);
  if (typeof description !== "string" || !description.trim()) {
    fail(`${relative(root, skillPath)}: description must be a non-empty string`);
  } else if (description.length > 1024) {
    fail(`${relative(root, skillPath)}: description exceeds 1024 characters`);
  }

  for (const match of content.matchAll(/\[[^\]]+\]\(([^)]+\.md)\)/g)) {
    const target = resolve(skillDirectory, match[1]);
    try {
      if (!statSync(target).isFile()) fail(`${relative(root, skillPath)}: missing reference ${match[1]}`);
    } catch {
      fail(`${relative(root, skillPath)}: missing reference ${match[1]}`);
    }
  }
}

if (skillDirectories.length !== 3) fail(`expected 3 skills, found ${skillDirectories.length}`);

for (const path of walk(root)) {
  if (/\[(TODO|PLACEHOLDER):/i.test(readText(path))) {
    fail(`${relative(root, path)}: contains an unfinished placeholder`);
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Validated Terminal plugin ${portable.version}, portable schemas, and ${skillDirectories.length} skills.`);
