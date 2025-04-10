# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Use as template

In docusaurus.config.js, modify these for the new project:
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',
  url: 'https://eason4p34rk.github.io',
  baseUrl: '/Docusaurus/',

  organizationName: 'eason4p34rk', // Usually your GitHub org/user name.
  projectName: 'Docusaurus-test', // Usually your repo name.
  trailingSlash: false,

  everything in footer

In /static/CNAME, set your target custom domain.
  Example: docs.github.com