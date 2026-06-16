# Doppler plugin for Yaak

Fetch secrets from [Doppler](https://www.doppler.com/) directly inside [Yaak](https://yaak.app),
using the local Doppler CLI. This is a port of the
[Insomnia Doppler plugin](https://github.com/jonking-ajar/insomnia-plugin-doppler) and follows the
structure of the [Yaak 1Password plugin](https://github.com/david-dreyer/yaak-plugin-op).

## Getting started

1. Install the [Doppler CLI](https://docs.doppler.com/docs/install-cli) and authenticate with
   `doppler login`.
2. Build the plugin: `npm install && npm run build`.
3. Install it in Yaak: **Settings → Plugins → Select Plugin**, and choose this directory.

## Usage

In any field that supports template functions, type `doppler.secret` and select it from the
autocomplete. Fill in the three arguments:

| Argument  | Description           | Example        |
| --------- | --------------------- | -------------- |
| `project` | Doppler project name  | `web-frontend` |
| `config`  | Doppler config name   | `prd`          |
| `secret`  | Doppler secret name   | `API_KEY`      |

Under the hood this runs:

```sh
doppler secrets get --project <project> --config <config> --json <secret>
```

and returns the secret's `computed` value. Results are cached in memory (see `cacheTTL`).

## Configuration

Configuration is optional. To override defaults, copy `config.example.json` to `config.json` in the
built plugin's `build/` directory (next to `index.js`):

### `cliPath`

Absolute path to the `doppler` binary, or the directory containing it. The plugin auto-detects the
CLI in common locations (`/usr/local/bin`, `/opt/homebrew/bin`, your `PATH`, etc.), so this is only
needed if Yaak can't find it — common when Yaak is launched from the GUI with a minimal `PATH`.

### `cacheTTL`

Seconds to keep fetched secrets in memory. Defaults to `3600` (1 hour). Use `0` to cache forever
(requires restarting Yaak to pick up changed secrets).

## Development

```sh
npm run dev    # watch + rebuild
npm test       # run unit tests
```
