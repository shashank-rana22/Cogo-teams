# cogo-admin

A `TurboRepo` for the optimized build system.

## Installation

- Clone the project from `Github` using `git clone git@github.com:Cogoport/cogo-admin.git`

- Use `pnpm install` to install all dependencies

## Structure

`cogo-control`-  Is a single `NextJS` project to control whole admin.

`common` - Directory contains the code like `store, useRequest, form etc...`

`packages` directory contains the individual services as package.

  

## Getting Started with new package

Create a directory `<package-name>` and navigate to the project using `cd packages/<package-name>`.

- Use `pnpm init` to create a `package.json`.

- Use this package in `cogo-control` by adding this package in `cogo-control`'s  `package.json` .
 ```sh
cogo-admin/cogo-control/package.json                                                 
 { ...
 "<package-name>": "workspace:version"
 }
```

## With Typescript
- To support `Typescript` we need to add a `tsconfig.json` file.
-  We are using  `Rollup` for build.
- Add a file `rollup.config.js`and install the dependencies .