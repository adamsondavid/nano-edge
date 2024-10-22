#!/bin/sh

export FUNCTIONS_BLOCKED_NETWORKS="${FUNCTIONS_BLOCKED_NETWORKS},$(ip -o addr show | awk '{print $4}' | paste -sd, -)"
edge-runtime start --import-map deno.json --main-service src
