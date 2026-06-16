import type {
  CallTemplateFunctionArgs,
  Context,
  PluginDefinition,
} from "@yaakapp/api";
import * as fs from "node:fs";
import * as path from "node:path";
import * as cache from "./cache";
import { dopplerCliInstalled, getSecret } from "./doppler";
import type { PluginConfig } from "./types";

let pluginConfig: PluginConfig | undefined;

export const plugin: PluginDefinition = {
  templateFunctions: [
    {
      name: "doppler.secret",
      description: "Fetch a secret from your Doppler config via the CLI",
      aliases: ["dopplersecret"],
      args: [
        {
          name: "project",
          label: "Project",
          type: "text",
          placeholder: "e.g. web-frontend",
        },
        {
          name: "config",
          label: "Config",
          type: "text",
          placeholder: "e.g. prd",
        },
        {
          name: "secret",
          label: "Secret",
          type: "text",
          placeholder: "e.g. API_KEY",
        },
      ],
      async onRender(
        _ctx: Context,
        args: CallTemplateFunctionArgs,
      ): Promise<string | null> {
        const project = stringArg(args, "project");
        const config = stringArg(args, "config");
        const secret = stringArg(args, "secret");

        if (!project || !config || !secret) {
          return null;
        }

        try {
          loadConfig();
          await checkCli();
          return await fetchEntry(project, config, secret);
        } catch (err) {
          return err instanceof Error ? err.toString() : String(err);
        }
      },
    },
  ],
};

function stringArg(args: CallTemplateFunctionArgs, name: string): string {
  const value = args.values[name];
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Reads the optional `config.json` that sits next to the built plugin. Missing
 * or malformed config is non-fatal — the plugin falls back to auto-detecting
 * the CLI and the default cache TTL.
 */
function loadConfig() {
  if (pluginConfig) {
    return;
  }

  pluginConfig = {};
  try {
    const configPath = path.resolve(__dirname, "config.json");
    const raw = fs.readFileSync(configPath, "utf-8");
    pluginConfig = JSON.parse(raw) as PluginConfig;
  } catch {
    // No config.json present — use defaults.
  }

  if (typeof pluginConfig.cacheTTL === "number") {
    cache.setStdTTL(pluginConfig.cacheTTL);
  }
}

async function checkCli() {
  if (cache.dopplerCliInstalled() !== true) {
    const installed = await dopplerCliInstalled(pluginConfig?.cliPath);
    cache.writeDopplerCliInstalled(installed);
  }
}

async function fetchEntry(
  project: string,
  config: string,
  secret: string,
): Promise<string> {
  const cacheKey = `${project}:${config}-${secret}`;
  const existing = cache.getEntry(cacheKey);

  if (existing) {
    return existing;
  }

  const secretValue = await getSecret(
    project,
    config,
    secret,
    pluginConfig?.cliPath,
  );
  cache.writeEntry(cacheKey, secretValue);

  return secretValue;
}
