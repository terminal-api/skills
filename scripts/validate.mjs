import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pluginRoot = join(root, "plugins", "terminal");
const failures = [];

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

const portable = readJson(join(pluginRoot, "plugin.json"));
const claude = readJson(join(pluginRoot, ".claude-plugin", "plugin.json"));
const codex = readJson(join(pluginRoot, ".codex-plugin", "plugin.json"));
const packageJson = readJson(join(root, "package.json"));
const manifests = [portable, claude, codex];

for (const [index, manifest] of manifests.entries()) {
  if (manifest.name !== "terminal") fail(`plugin manifest ${index + 1}: name must be terminal`);
  if (manifest.version !== portable.version) {
    fail(`plugin manifest ${index + 1}: version ${manifest.version} does not match ${portable.version}`);
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

const mcp = readJson(join(pluginRoot, "mcp.json"));
const terminalMcp = mcp.mcpServers?.terminal;
if (mcp.$schema !== "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json") {
  fail("plugins/terminal/mcp.json: unexpected schema");
}
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

  const name = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
  if (name !== directoryName) fail(`${relative(root, skillPath)}: name must match its directory`);
  if (!description) fail(`${relative(root, skillPath)}: description is required`);
  if (description && description.length > 1024) fail(`${relative(root, skillPath)}: description exceeds 1024 characters`);

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

console.log(`Validated Terminal plugin ${portable.version} and ${skillDirectories.length} skills.`);
