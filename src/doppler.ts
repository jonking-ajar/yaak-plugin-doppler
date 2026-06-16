import { runCommand } from "./command";
import { DopplerMe, DopplerSecret } from "./types";

export const dopplerCliInstalled = async (cliPath?: string) => {
  try {
    const me = await runCommand("doppler", ["me", "--json"], cliPath);
    const result = JSON.parse(me) as DopplerMe;
    if (!result.name) {
      throw new Error("Doppler CLI is not installed or not logged in");
    }
    return true;
  } catch (e) {
    if (e instanceof Error) {
      const err = new Error(
        `There was an issue with the Doppler CLI. If you have the Doppler CLI installed, run 'doppler login'. If the binary is not on Yaak's PATH, set 'cliPath' in the plugin's config.json. Error details: ${e.message}`,
      );
      err.stack = e.stack;
      throw err;
    }
  }
  return false;
};

export const getSecret = async (
  project: string,
  config: string,
  secret: string,
  cliPath?: string,
) => {
  const secretValue = await runCommand(
    "doppler",
    [
      "secrets",
      "get",
      "--project",
      project,
      "--config",
      config,
      "--json",
      secret,
    ],
    cliPath,
  );
  const result = JSON.parse(secretValue) as Record<string, DopplerSecret>;
  const found = result[secret];
  if (!found) {
    throw new Error("Secret Value not found");
  }
  return found.computed;
};
