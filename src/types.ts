export interface DopplerMe {
  workplace: { name: string; slug: string };
  type: string;
  token_preview: string;
  slug: string;
  created_at: string;
  name: string;
  last_seen_at: string;
}

export interface DopplerSecret {
  computed: string;
  computedValueType: { type: string };
  computedVisibility: string;
  note: string;
}

export interface PluginConfig {
  /** Absolute path to the `doppler` binary, or the directory containing it. */
  cliPath?: string;
  /** Seconds to keep fetched secrets in memory. `0` caches forever. Default 3600. */
  cacheTTL?: number;
}
