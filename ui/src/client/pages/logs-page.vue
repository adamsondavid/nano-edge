<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useServer } from "../composables/server";
import { useRoute } from "vue-router";

const server = useServer();
const route = useRoute();

const logs = ref();

watchEffect(async () => {
  const response = await server.getLogs({ params: { deployment: route.params.deployment.toString() } });
  if (response.status === 200) logs.value = response.body;
  else logs.value = "some error";
});
</script>

<template>
  <h1>Logs for {{ route.params.deployment }}:</h1>
  <div v-for="log of logs">
    {{ log }}
  </div>
  <pre class="font-mono">{{ JSON.stringify(logs, null, 2) }}</pre>
</template>
