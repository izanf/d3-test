# exp-hotsite

This repository contains sources used to compile the static hotsite. It uses
[Brunch](https://brunch.io) to handle all tasks through a Node container
(version 9.2.0). The stack is basically composed of the following dependencies:

- Babel/ES6
- React
- Redux
- jQuery
- Twitter Bootstrap
- Sass support
- Airbnb ESLint

## Installation

1. Ensure you have [Docker](https://docker.io) installed
2. Clone this repository
3. Copy the `.env.sample` file to `.env`, editing relevant keys
4. Run `docker-compose build` to install all required dependencies.
5. Run `docker-compose up` to start the development server
6. Point your favourite browser to [`http://localhost:3333`](http://localhost:3333)

Brunch includes a hot-reload mechanism. Changes should be visible as you save
modified files.

## Public Assets
The `public` folder is used by the development server to store precompiled
assets and is purged by the build command, when exporting the application for
production. **Do not place public assets in this folder**.

Instead, place them in `/app/assets`, since the contents of this folder are
copied to `/public` automatically.

## Exporting for Production

> **Notice**: Ensure you followed the _Installation_ step at least until step 4

### *nix Users

Simply run the `build` task defined in the `Makefile`:

```
$ make build
```

### Windows Users

Run `build.bat`, contained in this repository.

> **Notice**: Windows users using [WSL](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux)
or Cygwin can also follow the *nix way of building, if desired.


This will clean the `public` folder (if present), and rebuild the whole
application for production use. After the operation is complete, the contents of
the aforementioned folder can be uploaded to the preferred hosting service.

## Environment Variables
Environment variables are set in the `.env` file. This file is ignored by git in
order to prevent leakage of sensitive information. Please update `.env.sample`
accordingly when adding a new environment key.

> **Notice**: After editing the `.env` file, please remember to restart your
Docker container.

Using environment variables is only available in JavaScript files by using the
`$PROCESS_ENV_<VARIABLE_NAME>` macro. Example:

#### `.env`
```
FOO_BAR=123
```

#### `somefile.js`
```javascript
console.log($PROCESS_ENV_FOO_BAR);
```

#### Output
The macro `$PROCESS_ENV_FOO_BAR` is automatically replaced with `"123"`
(Notice: Quotes are added automatically)
