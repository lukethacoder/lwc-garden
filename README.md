<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/lukethacoder/lwc-garden">
    <img width="180" src="./docs/icon.svg" alt="LWC Garden logo">
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

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#screenshots">Screenshots</a></li>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built with</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#install-lwc-garden">Install LWC Garden</a></li>
        <li><a href="#run-local-dev-server">Run Local Dev Server</a></li>
      </ul>
    </li>
    <li><a href="#next-steps">Next Steps</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- SCREENSHOTS -->

## Screenshots

![product-screenshot]

![product-screenshot-2]

![product-screenshot-3]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ABOUT THE PROJECT -->

## About The Project

LWC Garden aims to be a replacement for the official Salesforce [`@salesforce/lwc-dev-server`](https://www.npmjs.com/package/@salesforce/lwc-dev-server), which has not received an update since 2021.

LWC Garden brings an array of new features and customisation so you can develop how you want to, locally.

### Features

- 🚀 Local First Development
- 🧪 Mock Anything (Apex, OmniScript, 3rd Party Packages and on-platform imports)
- 🥧 `<slot/>` Placeholders
- ✏️ API Editor via Storybook-like `argTypes`
- 💅 Custom Theming API
- ⚙️ Config as much or as little as your like

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built with

- [![LWC][lwc]][lwc-url]
- [![Webpack][webpack]][webpack-url]
- [![PNPM][pnpm]][pnpm-url]
- [![Prettier][prettier]][prettier-url]

> Documentation site built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Make sure you have [`node`](https://nodejs.org/en), [`pnpm`](https://pnpm.io/) and [`sfdx`](https://developer.salesforce.com/tools/salesforcecli) installed as well as a `lwc.config.json` file.

### Install LWC Garden

```bash
pnpm add @lwc-garden/core
```

### Run Local Dev Server

```bash
npx @lwc-garden/core dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Next Steps

For more information, check out the [Official Documentation](https://lwc.garden).

![docs-screenshot]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Publishing

Only the `@lwc-garden/core` package should be published to npm (for now).

```bash
pnpm publish --filter @lwc-garden/core
```

<!-- LICENSE -->

## License

Distributed under the GNU General Public License v3.0. See [LICENSE](https://github.com/lukethacoder/lwc-garden/blob/main/LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

[Luke Secomb]([license-url]) - [@lukethacoder](https://github.com/lukethacoder)

Project Link: [https://github.com/lukethacoder/lwc-garden](https://github.com/lukethacoder/lwc-garden)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[forks-shield]: https://img.shields.io/github/forks/lukethacoder/lwc-garden.svg?style=for-the-badge
[forks-url]: https://github.com/lukethacoder/lwc-garden/network/members
[stars-shield]: https://img.shields.io/github/stars/lukethacoder/lwc-garden.svg?style=for-the-badge
[stars-url]: https://github.com/lukethacoder/lwc-garden/stargazers
[issues-shield]: https://img.shields.io/github/issues/lukethacoder/lwc-garden.svg?style=for-the-badge
[issues-url]: https://github.com/lukethacoder/lwc-garden/issues
[license-shield]: https://img.shields.io/github/license/lukethacoder/lwc-garden.svg?style=for-the-badge
[license-url]: https://github.com/lukethacoder/lwc-garden/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/luke-secomb/
[product-screenshot]: docs/screenshot.jpg
[product-screenshot-2]: docs/screenshot-2.jpg
[product-screenshot-3]: docs/screenshot-3.jpg
[docs-screenshot]: docs/screenshot-docs.jpg
[lwc]: https://img.shields.io/badge/lwc-009ddb?style=for-the-badge&logo=salesforce&logoColor=white
[lwc-url]: https://lwc.dev
[prettier]: https://img.shields.io/badge/Prettier-1a2b34?style=for-the-badge&logo=prettier&logoColor=white
[prettier-url]: https://prettier.io/
[pnpm]: https://img.shields.io/badge/pnpm-4e4e4e?style=for-the-badge&logo=pnpm
[pnpm-url]: https://pnpm.io/
[webpack]: https://img.shields.io/badge/webpack-6ea6c1?style=for-the-badge&logo=webpack
[webpack-url]: https://webpack.js.org/
