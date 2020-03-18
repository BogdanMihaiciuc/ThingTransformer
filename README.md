# Intro

A tool that allows the development of Thingworx models in a real IDE.

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

To install this extension on Thingworx, you can download one of the release packages and directly import it as an extension.

Alternatively, you can clone this repo and build the extension from it.

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
2. Open `package.json` and configure the `thingworxServer`, `thingworxUser` and `thingworxPassword` as needed.
3. Run `npm install`. This will install the development dependencies for the project.
4. Start working on the extension.

Note that whenever you add a new file to the extension, you should also declare it in `metadata.xml` in order for it to be included in the Thingworx extension. Additionally, if the files include comments from which additional definitions should be added to the Typescript definition file, they should be added in the build script in the `DTSFiles` array at the beginning of the script.

If the order of files is important, they will be combined in the order specified in `metadata.xml`.

### File Structure
```
BMUpdater
│   README.md         // this file
│   package.json      // here you specify Thingworx connection details
│   metadata.xml      // thingworx metadata file for this widget. This is automatically updated based on your package.json and build settings
│   LICENSE           // license file
│   Gulpfile.js       // build script
└───src               // main folder where your developement will take place
│   │   file1.js            // javascript file
|   |   ...
└───build             // temporary folder used during compilation
└───zip               // location of the built extension
```

### Build
To build the extension, run `gulp` in the root of the project. This will generate an extension .zip file in the zip folder in the root of the project.

To build the extension and upload it to Thingworx, run `gulp upload` in the root of the project. The details of the Thingworx server to which the script will upload the extension are declared in the project's `package.json` file. These are:
 * `thingworxServer` - The server to which the extension will be uploaded.
 * `thingworxUser` and `thingworxPassword` - The credentials used for uploading. This should be a user that has permission to install extensions.

Both of the build tasks can optionally take the `--p` parameter. When this is specified, the build script will generate a production build. Unlike development builds, files in the production build will be combined and minified.

### Deployment

Deployment to Thingworx is part of the build process as explained above. Alternatively, you can manually install the extension that is generated in the zip folder in the root of the project.

#  License

[MIT License](LICENSE)