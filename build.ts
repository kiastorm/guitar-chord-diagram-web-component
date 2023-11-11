import esbuild from "esbuild";
import pkg from "./package.json";

const name = "guitar-chord-diagram";
const iifeName = "GuitarChordDiagram";
const formats = ["iife", "esm", "cjs"] as const;
const entryFile = "./src/guitar-chord-diagram.ts";
const outDir = "./dist";
const watch = process.argv.includes("--watch");

const watchPlugin = {
  name: "watch-feedback",
  setup(build: esbuild.PluginBuild) {
    build.onStart(() => {
      console.clear();
      console.log("Building...");
    });

    build.onEnd((result) => {
      if (result.errors.length === 0) {
        console.log(`\x1b[32mBuild successful: ${name}\x1b[0m`);
      } else {
        console.error(
          `\x1b[31mBuild failed with ${result.errors.length} errors\x1b[0m`
        );
      }
    });
  },
};

const formatExtension = {
  iife: "umd",
  esm: "es",
  cjs: "cjs",
} as const;

// Function to create build options
const buildOptions = (
  format: (typeof formats)[number],
  { minify }: { minify: boolean }
): esbuild.BuildOptions => ({
  entryPoints: [entryFile],
  bundle: true,
  outfile: `${outDir}/${name}.${formatExtension[format]}${
    minify ? ".min" : ""
  }.js`,
  format,
  globalName: format === "iife" ? iifeName : undefined,
  sourcemap: true,
  minify,
  banner: {
    js: `/*! ${name} v${pkg.version} | (c) ${new Date().getFullYear()} ${
      pkg.author.name
    } | ${pkg.license} License | ${pkg.repository.url} */`,
  },
  plugins: watch ? [watchPlugin] : undefined,
});

const startServer = async () => {
  let ctx = await esbuild.context({
    entryPoints: [entryFile],
    outdir: "./dist",
    bundle: true,
    sourcemap: true,
  });

  await ctx.watch();

  let { host, port } = await ctx.serve({
    servedir: outDir,
    port: 2121,
  });

  console.log(`Server running at http://${host}:${port}`);
};

if (watch) {
  startServer().catch(() => process.exit(1));
} else {
  // Regular build process for non-watch mode
  formats.forEach(async (format) => {
    await esbuild.build(buildOptions(format, { minify: false })).then(() => {
      console.log(`Build successful: ${name} (${format})`);
    });
    await esbuild.build(buildOptions(format, { minify: true })).then(() => {
      console.log(`Build successful: ${name} (${format} minified)`);
    });
  });
}
