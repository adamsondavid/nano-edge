# CLI

# Developing

Within the nano-edge repo:

```shell
cd cli
npm install
npm run dev
```

then go to the repo you want to use the cli:

```shell
npm link @nano-edge/cli
npx @nano-edge/cli --help
```

**Cleanup**

Within the nano-edge repo, stop the dev command and run:

```shell
npm run unlink
```

in the othe repo, just reinstall dependencies and the link will be removed.
