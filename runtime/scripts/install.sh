#!/bin/sh

edge-runtime bundle --import-map deno.json --entrypoint src/index.ts
rm bin.eszip
