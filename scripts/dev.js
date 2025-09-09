// node dev,js (要打包的名字 -f 打包的格式)
import minimist from "minimist";
import {fileURLToPath} from "url";
import { dirname,resolve } from "path";
import { createRequire } from "module";
import esbuild from "esbuild";
const args = minimist(process.argv.slice(2));
const require = createRequire(import.meta.url);
const __fileName = fileURLToPath(import.meta.url); // 获取文件绝对路径，file -> /user/xxx/xxx.js
const __dirName = dirname(__fileName); // 获取当前文件所在目录 /user/xxx
const target = args._[0] || "reactivity" // 打包哪个项目
const format = args.f || "iife" // 打包格式
const entry = resolve(__dirName, `../packages/${target}/src/index.ts`)
const pkg = require(resolve(__dirName, `../packages/${target}/package.json`))
// 开始打包
esbuild.context({
    entryPoints: [entry], //入口
    outfile: resolve(__dirName, `../packages/${target}/dist/${target}.js`), //出口
    bundle: true, //是否打包
    platform: "browser", //打包平台
    sourcemap: true, //是否生成sourcemap文件
    format, //cjs esm iife
    globalName: pkg.buildOptions?.name
}).then( (ctx) => {
  return ctx.watch()
})