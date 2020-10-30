import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
  input: './index.js', // 入口
  output: [{ // 输出文件
      file: 'dist/candao-iife.js',
      format: 'iife',
      name: '$candao',
      globals: {
        http: "http",
        https: "https",
        url: "url",
        assert: "assert",
        stream: "stream",
        tty: "tty",
        util: "util",
        os: "os",
        zlib: "zlib",
      },
      sourcemap: true
    }, {
      file: 'dist/candao-module.js',
      format: 'es',
      name: 'candao',
      sourcemap: true
  }],
  plugins: [ // 插件
    commonjs({ // 针对CommonJS作转换
       // non-CommonJS modules will be ignored, but you can also
       // specifically include/exclude files
       include: 'node_modules/**',  // Default: undefined
       // exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
       // these values can also be regular expressions
       // include: /node_modules/

       // search for files other than .js files (must already
       // be transpiled by a previous plugin!)
       // extensions: [ '.js', '.coffee' ],  // Default: [ '.js' ]

       // if true then uses of `global` won't be dealt with by this plugin
       ignoreGlobal: false,  // Default: false

       // if false then skip sourceMap generation for CommonJS modules
       // sourceMap: false,  // Default: true

       // explicitly specify unresolvable named exports
       // (see below for more details)
       // namedExports: { './module.js': ['foo', 'bar' ] },  // Default: undefined
    }),
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    globals(), // 转换node变量
    // builtins(), // 转换node内置api
    json({
      // All JSON files will be parsed by default,
      // but you can also specifically include/exclude files
      // include: 'node_modules/**',
      // exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],

      // for tree-shaking, properties will be declared as
      // variables, using either `var` or `const`
      preferConst: true, // Default: false

      // specify indentation for the generated default export —
      // defaults to '\t'
      indent: '  ',

      // ignores indent and generates the smallest code
      compact: true, // Default: false

      // generate a named export for every property of the JSON object
      namedExports: true // Default: true
    }),
    babel({ exclude: ['**/node_modules/**'] })
  ]
};
