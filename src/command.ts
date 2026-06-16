import { spawn } from "node:child_process";
import * as path from "node:path";
import * as fs from "node:fs";

/**
 * Finds the absolute path of an executable by searching in common directories
 * across different operating systems. This is a robust way to find a command
 * when the process's PATH might be incomplete (as it often is for GUI apps).
 *
 * @param command The executable name to find (e.g., 'doppler').
 * @param cliPath Optional path to the binary, or the directory containing it.
 * @returns The absolute path of the command, or null if not found.
 */
async function findExecutablePath(
  command: string,
  cliPath?: string,
): Promise<string | null> {
  // Determine the executable name based on the OS (e.g., doppler.exe on Windows)
  const commandWithExt =
    process.platform === "win32" ? `${command}.exe` : command

  // An explicit override always wins. It may point at the binary or its dir.
  if (cliPath) {
    try {
      const stats = await fs.promises.stat(cliPath);
      const candidate = stats.isDirectory()
        ? path.join(cliPath, commandWithExt)
        : cliPath;
      await fs.promises.access(candidate, fs.constants.X_OK);
      return candidate;
    } catch {
      // Fall through to the standard search if the override is unusable.
    }
  }

  // Define common installation directories for each platform
  const searchPaths: string[] = [];
  const homeDir = process.env.HOME || process.env.USERPROFILE || "";

  if (process.platform === "win32") {
    // Windows search paths
    searchPaths.push(
      process.env.ProgramFiles
        ? path.join(process.env.ProgramFiles, "Doppler")
        : "",
      process.env.LOCALAPPDATA
        ? path.join(process.env.LOCALAPPDATA, "Doppler")
        : "",
      path.join("C:", "ProgramData", "Doppler", "bin"),
    );
  } else {
    // macOS and Linux search paths
    searchPaths.push(
      "/usr/local/bin",
      "/opt/homebrew/bin", // For Apple Silicon Homebrew
      "/usr/bin",
      "/bin",
      path.join(homeDir, ".local", "bin"),
    );
  }

  // Also include directories from the current process's PATH environment variable
  const pathDirs = process.env.PATH?.split(path.delimiter) || [];
  const allPathsToSearch = [...new Set([...searchPaths, ...pathDirs])].filter(
    Boolean,
  );

  // Check each path for the existence of the executable
  for (const dir of allPathsToSearch) {
    const fullPath = path.join(dir, commandWithExt);
    try {
      await fs.promises.access(fullPath, fs.constants.X_OK);
      return fullPath;
    } catch {
      // File not found or not executable, continue to the next path
    }
  }

  return null;
}

/**
 * Executes a command with arguments in a platform-agnostic way. It first finds
 * the executable's absolute path and then spawns a child process.
 *
 * @param command The command to execute (e.g., 'doppler').
 * @param args An array of string arguments for the command.
 * @param cliPath Optional path to the binary, or the directory containing it.
 * @returns A promise that resolves with the command's stdout, or rejects with an error.
 */
export async function runCommand(
  command: string,
  args: string[],
  cliPath?: string,
): Promise<string> {
  const executablePath = await findExecutablePath(command, cliPath);

  if (!executablePath) {
    throw new Error(
      `Command not found: '${command}'. Ensure the Doppler CLI is installed and accessible, or set 'cliPath' in the plugin's config.json.`,
    );
  }

  return new Promise((resolve, reject) => {
    const child = spawn(executablePath, args);

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(
          new Error(
            `Command failed with exit code ${code}: ${command} ${args.join(" ")}\n\nStderr:\n${stderr.trim()}`,
          ),
        );
      }
    });

    child.on("error", (err) => {
      // This event fires for issues like permissions errors when spawning
      reject(new Error(`Failed to start command: ${err.message}`));
    });
  });
}
