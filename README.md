# Akkoma-FE 

This is a fork of Akkoma-FE from the Pleroma project, with support for new Akkoma features such as:
- MFM support via [marked-mfm](https://akkoma.dev/sfr/marked-mfm)
- Custom emoji reactions

# For Translators
Alternatively, edit/create `src/i18n/$LANGUAGE_CODE.json` (where `$LANGUAGE_CODE` is the [ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) for your language), then add your language to [src/i18n/messages.js](https://akkoma.dev/AkkomaGang/pleroma-fe/src/branch/develop/src/i18n/messages.js) if it doesn't already exist there.

Akkoma-FE will set your language by your browser locale, but you can temporarily force it in the code by changing the locale in main.js.

# FOR ADMINS

To use Akkoma-FE in Akkoma, use the [frontend](https://docs.akkoma.dev/stable/administration/CLI_tasks/frontend/) CLI task to install Akkoma-FE, then modify your configuration as described in the [Frontend Management](https://docs.akkoma.dev/stable/configuration/frontend_management/) doc.

## Build Setup

``` bash
# install dependencies
pnpm install -g yarn
yarn

# serve with hot reload at localhost:8080
pnpm run dev

# build for production with minification
pnpm run build

# run unit tests
pnpm run unit
```

# For Contributors:

You can create file `/config/local.json` (see [example](https://git.pleroma.social/pleroma/pleroma-fe/blob/develop/config/local.example.json)) to enable some convenience dev options:

* `target`: makes local dev server redirect to some existing instance's BE instead of local BE, useful for testing things in near-production environment and searching for real-life use-cases.
* `staticConfigPreference`: makes FE's `/static/config.json` take preference of BE-served `/api/statusnet/config.json`. Only works in dev mode.

FE Build process also leaves current commit hash in global variable `___pleromafe_commit_hash` so that you can easily see which pleroma-fe commit instance is running, also helps pinpointing which commit was used when FE was bundled into BE.

# Configuration

Edit config.json for configuration.

## Options

### Login methods

```loginMethod``` can be set to either ```password``` (the default) or ```token```, which will use the full oauth redirection flow, which is useful for SSO situations. 
