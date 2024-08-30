module.exports = {
  presets: [
    "@babel/preset-typescript",
    ["@babel/preset-env", { targets: { node: "current" }, modules: false }],
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["babel-plugin-add-module-exports"],
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@routes": "./src/adapters/routes",
          "@controllers": "./src/adapters/controllers",
          "@utils": "./src/adapters/utils",
          "@interfaces": "./src/adapters/interfaces",
          "@config": "./src/adapters/config",
          "@Entity": "./src/Entity",
          "@Repository": "./src/Repository",
          "@useCases": "./src/useCases",
          "@Dtos": "./src/Dtos",
          "@constants": "./src/CONSTANTS",
          "@frameworks": "./src/frameworks",
          "@middlewares": "./src/adapters/middleware",
          "@builders": "./src/builders",
          "@adapters": "./src/adapters",
        },
      },
    ],
    ["babel-plugin-add-import-extension", { extension: "js" }],
  ],
}
