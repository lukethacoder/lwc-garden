<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/lukethacoder/lwc-garden">
    <img width="180" src="https://raw.githubusercontent.com/lukethacoder/lwc-garden/main/docs/icon.svg" alt="LWC Garden logo">
  </a>

<h3 align="center">LWC Garden</h3>
  <p align="center">
    LWC development doesn't need to be slow and painful.
    <br />
    Build your Lightning Web Components locally.
    <br />
    <br />
    <a href="https://lwc.garden">View Documentation</a>
    ·
    <a href="https://github.com/lukethacoder/lwc-garden/issues">Report Bug</a>
    ·
    <a href="https://github.com/lukethacoder/lwc-garden/issues">Request Feature</a>
  </p>
  
  <!-- PROJECT SHIELDS -->
  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]
  [![LinkedIn][linkedin-shield]][linkedin-url]
</div>

View the <a href="https://github.com/lukethacoder/lwc-garden/issues">Documentation</a>
for more information.

This package may be used standalone and is not dependant on the `@lwc-garden/core` package. You can run a simple `npx lwr dev` site and still take advantage of the following utilities and configuration.

## Apex Mocking

This configuration allows you to mock apex methods without having to explicitly map all files in your `lwr.config.json`|`lwc.config.json` file.

There are two approaches to mocking apex classes:

1. Create a single JavaScript file for each Apex Class (e.g. `MyClass.js`)
2. Create a single JavaScript file for each Apex Method (e.g. `MyClass.myMethod.js`)

> [!warning]
> Only one of the two available approaches should be taken. Using both at the same time may lead to issues

### Single JavaScript file per Apex Class

This is a cleaner approach and keeps your file system cleaner, at the expense of potentially longer JavaScript files.

This approach uses a custom module provider, which can be configured in your `lwr.config.json`|`lwc.config.json` file as follows:

```json
"moduleProviders": [
  [
    "@lwc-garden/utils/resolvers/apex.ts",
    {
      "paths": ["apex"]
    }
  ],
]
```

Noting you are able to split up your apex code into multiple folders to better organise your files.

Here is an example of what a `MyClass.js` file might look like:

```js
export const myMethod = () => {
  // TODO: custom logic here - you may even wish to call Salesforce directly here via fetch
  return 'response text'
}
export const anotherMethodHere = ({ properties }) => {
  // TODO: custom logic here
  return `another piece of response text ${properties}`
}
```

The above methods an then be imported using the standard apex import syntax:

```js
import apex_myMethod from '@salesforce/apex/MyClass.myMethod'
import apex_anotherMethodHere from '@salesforce/apex/MyClass.anotherMethodHere'
```

> [!note]
> Wire methods take on a different structure to imperative methods. TODO: link to docs here.

### Single JavaScript file per Apex Method

This approach may align more closely with existing mocking approaches and result in smaller JavaScript files at the expense of more files in the file system.

This approach uses a custom hook, which can be configured in your `lwr.config.json`|`lwc.config.json` file as follows:

```json
"moduleProviders": [
  [
    "@lwc-garden/utils/hooks/apex.ts",
    {
      "paths": ["apex"]
    }
  ],
]
```

Under the hood this hook creates mapping for all apex classes found in the provided `"paths"` configuration array. Here is an example of what is generated:

```json
[
  {
    "name": "@salesforce/apex/MyClass.myMethod",
    "path": "./apex/MyClass.myMethod.js"
  }
]
```

## Static Resource Resolving

This configuration allows you to define multiple staticresource paths to be resolved locally without having to explicitly map all files in your `lwr.config.json`|`lwc.config.json` file.

The configuration uses both a custom hook and module provider. These can be configured as follows:

```json
"moduleProviders": [
  [
    "@lwc-garden/utils/resolvers/staticresources.ts",
    {
      "paths": ["force-app/main/default/staticresources"]
    }
  ]
]
"hooks": [
  "@lwc-garden/utils/hooks/staticresources.ts"
],
"globalData": {
  "garden": {
    "staticresources": {
      "paths": ["force-app/main/default/staticresources"]
    }
  }
}
```

> [!note]
> Both `"paths"` value should have the same values.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[stars-shield]: https://img.shields.io/github/stars/lukethacoder/lwc-garden.svg?style=for-the-badge
[stars-url]: https://github.com/lukethacoder/lwc-garden/stargazers
[issues-shield]: https://img.shields.io/github/issues/lukethacoder/lwc-garden.svg?style=for-the-badge
[issues-url]: https://github.com/lukethacoder/lwc-garden/issues
[license-shield]: https://img.shields.io/github/license/lukethacoder/lwc-garden.svg?style=for-the-badge
[license-url]: https://github.com/lukethacoder/lwc-garden/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/luke-secomb/
