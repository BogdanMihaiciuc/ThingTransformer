# Intro

A tool that allows the development of Thingworx models in a real IDE. This repo contains the `bm-thing-transformer` module, which is a `tsc` transformer that converts TypeScript source files into Thingworx entity XML files.

# Index

- [Usage](#usage)
- [Development](#development)
  - [Pre-Requisites](#pre-requisites)
  - [Development Environment](#development-environment)
  - [File Structure](#file-structure)
  - [Build](#build)  
  - [Deployment](#deployment)
- [License](#license)

# Usage

You should primarily use this via the [Thingworx VSCode Project Template](https://github.com/ptc-iot-sharing/ThingworxVSCodeProject). For more information, refer to that repository.

Nevertheless, you can use this standalone as well, by including it in your project with `npm install bm-thing-transformer`.

This must be used together with `tsc`. Specify it as a transformer in your TypeScript project in both the `before` and `after` phases of the transformation e.g.

```js
const transformer = require('bm-thing-transformer');

const project = ts.createProject('./tsconfig.json', {
        getCustomTransformers: () => ({
            before: [
                transformer.TWThingTransformerFactory(__dirname)
            ],
            after: [
                transformer.TWThingTransformerFactory(__dirname, true)
            ]
        })
    });
```

After `tsc` runs, the transformer will add the `_TWEntities` key to the **`global scope`**. This is an object whose keys are the names of the generated entites and their values are each an instance of the transformer. Beyond those related to the actual transformation, the transformer has the following public methods that can be invoked after `tsc` has run:

 - `toXML(): string` - Returns a string that represents the XML definition of the entity
 - `toDefinition(): string` - Returns a string that represents the declaration of the entity in its relevant collection. For example, with a Thing, the declaration will be something like:
```ts
declare interface Things { MyThing: MyThing }
```
 - `write(path?: string): void` - Writes the result of `toXML()` to a file at the specified path, in `path/build/Entities/<CollectionName>/<EntityName>.xml`. The path defaults to the project path.

# Development

### Pre-Requisites

The following software is required:

* [NodeJS](https://nodejs.org/en/): needs to be installed and added to the `PATH`. You should use the LTS version.
* [gulp command line utility](https://gulpjs.com/docs/en/getting-started/quick-start): is needed to run the build script.

The following software is recommended:

* [Visual Studio Code](https://code.visualstudio.com/): An integrated developer enviroment with great javascript and typescript support. You can also use any IDE of your liking, it just that most of the testing was done using VSCode.

### Development Environment
In order to develop this extension you need to do the following:
1. Clone this repository
2. Run `npm install`. This will install the development dependencies for the project.
3. Start working on the project.

### File Structure
```
BMUpdater
│   README.md         // this file
│   package.json      // node package details
│   LICENSE           // license file
│   gulpfile.js       // build script
└───src               // main folder where your developement will take place
│   │   file1.ts            // typescript file
|   |   ...
└───dist              // files used in the distribution
```

### Build

To build the project, run `gulp` in the root of the project. This will generate the appropriate files in the `dist` folder.

### Deployment

Deployment to Thingworx is part of the build process as explained above. Alternatively, you can manually install the extension that is generated in the zip folder in the root of the project.

### Contributors

 - [dwil618](https://github.com/dwil618): support for min/max aspects and date initializers.

#  License

[MIT License](LICENSE)
