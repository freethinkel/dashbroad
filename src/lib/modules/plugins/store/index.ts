import { fs, path } from "@tauri-apps/api";
import { atom } from "nanostores";
import type { Plugin } from "../types";
import { watchImmediate } from "tauri-plugin-fs-watch-api";

const CONFIG_DIR = ".config/dashbroad/";

class PluginsStore {
  plugins = atom<Plugin[]>([]);

  async init() {
    const pluginsDir = await this._getPluginsDir();

    this.loadPlugins().then((plugins) => this.plugins.set(plugins));

    const unwatch = await watchImmediate(pluginsDir, () => {
      this.loadPlugins().then((plugins) => this.plugins.set(plugins));
    });

    window.addEventListener("beforeunload", () => {
      unwatch();
    });
  }

  private async loadPlugins(): Promise<Plugin[]> {
    const pluginsDir = await this._getPluginsDir();
    if (!(await fs.exists(pluginsDir))) {
      await fs.createDir(pluginsDir);
    }

    const entries = (await fs.readDir(pluginsDir)).filter((entry) =>
      entry.name?.endsWith(".svelte")
    );
    const plugins = await Promise.all(
      entries.map(async (entry) => ({
        source: await fs.readTextFile(entry.path),
        path: entry.path,
      }))
    );

    return plugins;
  }
  private async _getPluginsDir() {
    const home = await path.homeDir();
    return path.join(home, CONFIG_DIR);
  }
}

export const plugins$ = new PluginsStore();
