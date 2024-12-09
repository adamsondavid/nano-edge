<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useServer } from "../composables/server";
import { useRoute } from "vue-router";

const server = useServer();
const route = useRoute();

const logs = ref();
const l = ref();

watchEffect(async () => {
  const response = await server.getLogs({ params: { deployment: route.params.deployment.toString() } });
  if (response.status === 200) logs.value = response.body;
  else logs.value = "some error";
});
</script>

<template>
  <h1>Logs for {{ route.params.deployment }}:</h1>
  <table class="w-full table-auto">
    <tr v-for="(log, i) of logs" :key="i" @click="l = log" class="cursor-pointer">
      <td>{{ log.level }}</td>
      <td>{{ log.timestamp }}</td>
      <td>{{ log.status }}</td>
      <td>{{ log.type }}</td>
      <td>{{ log.method }}</td>
      <td>{{ log.path }}</td>
      <td v-if="log.logs">{{ log.logs.at(-1)?.message.substring(0, 32) }} ({{ log.logs.length }})</td>
      <td v-else></td>
      <td v-if="log.duration !== undefined">{{ log.duration }}ms</td>
    </tr>
  </table>
  <div v-if="l" class="py-12">
    <h2>Log details for request: {{ l.requestId }}</h2>
    <table class="w-full table-auto">
      <tr v-for="(log, i) in l.logs" :key="i">
        <td>{{ log.level }}</td>
        <td>{{ log.timestamp }}</td>
        <td>{{ log.message }}</td>
      </tr>
    </table>
  </div>
</template>
