import { fs, path } from "@tauri-apps/api";

const CONFIG_DIR = ".config/dashbroad/";

export const loadPlugins = async () => {
  const home = await path.homeDir();
  const pluginsDir = await path.join(home, CONFIG_DIR);
  if (!(await fs.exists(pluginsDir))) {
    await fs.createDir(pluginsDir);
  }

  const entries = (await fs.readDir(pluginsDir)).filter((entry) =>
    entry.name?.endsWith(".svelte")
  );
  const files = await Promise.all(
    entries.map((entry) => fs.readTextFile(entry.path))
  );
  console.log(home, files);
  return files;
};
