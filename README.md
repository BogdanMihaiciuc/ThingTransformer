# Intro

A tool that allows the development of Thingworx models in a real IDE. This repo contains the following:
 * The `bm-thing-transformer` module, which is a `tsc` transformer that converts TypeScript source files into Thingworx entity XML files.
 * The declarations of the decorators and thingworx specific types that are interpreted by the transformer
 * The declarations of the standard thingworx entities such as `GenericThing` and `InfoTableFunctions`

# Index

- [Intro](#intro)
- [Index](#index)
- [Usage](#usage)
- [Development](#development)
    - [Pre-Requisites](#pre-requisites)
    - [Development Environment](#development-environment)
    - [File Structure](#file-structure)
    - [Build](#build)
    - [Contributors](#contributors)
- [License](#license)

# Usage

You should primarily use this via the [Thingworx VSCode Project Template](https://github.com/BogdanMihaiciuc/ThingworxVSCodeProject). For more information, refer to that repository.

Nevertheless, you can use this standalone as well, by including it in your project with `npm install bm-thing-transformer`.

This must be used together with the typescript compiler api. Create a TWConfig object then use the transformer factory as a transformer in your TypeScript project in both the `before` and `after` phases of the transformation e.g.

```ts
import { TWThingTransformerFactory, TWConfig, TWThingTransformer } from 'bm-thing-transformer';

// Initialize the typescript program
const program = ...

// Create a twconfig object
const twConfig: TWConfig = {
    projectName: 'MyProject',
    store: {} // This should be empty
}

// Use the transformer factory in both the before & after phases
const emitResult = program.emit(undefined, () => {}, undefined, undefined, {
    before: [
        TWThingTransformerFactory(program, path, false, false, twConfig)
    ],
    after: [
        TWThingTransformerFactory(program, path, true, false, twConfig)
    ]
});
```

After the emit finishes, the transformers will properties to the `store` object of your twconfig object. This is an object whose keys are the names of the generated entities and their values are each an instance of the transformer. Beyond those related to the actual transformation, the transformer has the following public methods that can be invoked after the program's emit method returns:

 - `toXML(): string` - Returns a string that represents the XML definition of the entity
 - `toDeclaration(): string` - Returns a string that represents the declaration of the entity in its relevant collection. For example, with a Thing, the declaration will be something like:
```ts
declare interface Things { MyThing: MyThing }
```
 - `write(path?: string): void` - Writes the result of `toXML()` to a file at the specified path, in `path/build/Entities/<CollectionName>/<EntityName>.xml`. The path defaults to the project path.

# Development

### Pre-Requisites

The following software is required:

* [NodeJS](https://nodejs.org/en/): needs to be installed and added to the `PATH`. You should use the LTS version.

The following software is recommended:

* [Visual Studio Code](https://code.visualstudio.com/): An integrated developer environment with great javascript and typescript support. You can also use any IDE of your liking, it just that most of the testing was done using VSCode.

### Development Environment
In order to develop this extension you need to do the following:
1. Clone this repository
2. Run `npm install`. This will install the development dependencies for the project.
3. Start working on the project.

### File Structure
```
ThingTransformer
│   README.md         // this file
│   package.json      // node package details
│   LICENSE           // license file
└───scripts           // build scripts
│   │   clean.js            // clean script
└───src               // main folder where your development will take place
│   │   file1.ts            // typescript file
|   |   ...
└───static            // folder containing declarations to be used in a thingworx project
└───dist              // files used in the distribution
```

### Build

To build the project, run `npm run build` in the root of the project. This will generate the appropriate files in the `dist` folder.

### Contributors

 - [dwil618](https://github.com/dwil618): support for min/max aspects and date initializers.
 - [stefan-lacatus](https://github.com/stefan-lacatus): support for inferred types in property declarations, method helpers, bug fixes, support for the `@exported` decorator and API generation

#  License

[MIT License](LICENSE)
