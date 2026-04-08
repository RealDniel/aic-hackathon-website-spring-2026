import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    // Anchor Turbopack resolution to this config's directory.
    root: projectRoot,
  },
};

export default nextConfig;
