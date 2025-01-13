<script setup lang="ts">
import { Button } from "@/client/components/ui/button";
import { RouterLink } from "vue-router";
</script>

<template>
  <h1>nano edge</h1>
  <Button :as="RouterLink" to="/deployments/tapw/logs">click here to see logs of tapw</Button>
</template>
