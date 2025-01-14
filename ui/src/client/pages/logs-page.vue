<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useServer } from "../composables/server";
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";
import info from "@iconify-icons/lucide/info";
import alertTriangle from "@iconify-icons/lucide/alert-triangle";
import functionSquare from "@iconify-icons/lucide/function-square";
import database from "@iconify-icons/lucide/database";
import { cva } from "class-variance-authority";

const server = useServer();
const route = useRoute();

const logs = ref();
const l = ref();

watchEffect(async () => {
  const response = await server.getLogs({ params: { deployment: route.params.deployment.toString() } });
  if (response.status === 200) logs.value = response.body;
  else logs.value = "some error";
});

const buttonVariants = cva(
  "w-full rounded-sm m-0.5 h-7 font-mono text-sm text-nowrap flex items-center gap-8 text-left select-text px-2",
  {
    variants: {
      logLevel: {
        info: "even:bg-gray-100 hover:bg-gray-200",
        warn: "bg-yellow-100 hover:bg-yellow-200",
        error: "bg-red-100 hover:bg-red-200",
      },
    },
  },
);

function getMostSignificantLogLevel(log: any) {
  const logLevels = [log.level, ...(log.logs?.map((l: any) => l.level) ?? [])];
  if (logLevels.includes("error")) return "error";
  if (logLevels.includes("warn")) return "warn";
  else return "info";
}

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const formatDate = (date: Date) => `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, "0")} `;
function formatTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
const formatMilliseconds = (date: Date) => `.${date.getMilliseconds().toString().padStart(4, "0")}`;

function mapStatusCodeColor(status: number) {
  if (status < 300) return "text-green-600";
  else if (status < 400) return "text-yellow-600";
  else return "text-red-600";
}
</script>

<template>
  <div class="p-1">
    <button
      v-for="(log, i) of logs"
      :key="i"
      :class="buttonVariants({ logLevel: getMostSignificantLogLevel(log) })"
      @click="l = log"
    >
      <span>
        <Icon v-if="getMostSignificantLogLevel(log) === 'info'" :icon="info" width="16" class="text-muted-foreground" />
        <Icon
          v-else-if="getMostSignificantLogLevel(log) === 'warn'"
          :icon="alertTriangle"
          width="16"
          class="text-yellow-600"
        />
        <Icon
          v-else-if="getMostSignificantLogLevel(log) === 'error'"
          :icon="alertTriangle"
          width="16"
          class="text-red-600"
        />
      </span>
      <span>
        <span class="text-muted-foreground">{{ formatDate(new Date(log.timestamp)) }}</span>
        <b>{{ formatTime(new Date(log.timestamp)) }}</b>
        <span class="text-muted-foreground">{{ formatMilliseconds(new Date(log.timestamp)) }}</span>
      </span>
      <span>{{ log.requestId }}</span>
      <span :class="mapStatusCodeColor(log.status)">{{ log.status }}</span>
      <span class="flex items-center gap-2">
        <Icon v-if="log.type === 'INBOUND_FUNCTION_REQUEST'" :icon="functionSquare" width="16" />
        <Icon v-else-if="log.type === 'INBOUND_STATIC_REQUEST'" :icon="database" width="16" />
        <span class="min-w-[40em] max-w-[40em] truncate">
          <span class="text-muted-foreground">{{ log.method + " " }}</span>
          <span :title="log.path">{{ log.path }}</span>
        </span>
      </span>
      <span v-if="log.logs" class="truncate">{{ log.logs.at(-1).message }}</span>
      <span v-if="log.logs" class="text-muted-foreground">({{ log.logs.length - 1 }} more)</span>
      <span v-if="log.duration !== undefined" class="ml-auto">{{ log.duration }}ms</span>
    </button>
  </div>
  <div v-if="l" class="py-12">
    <h2>Log details for request: {{ l.requestId }}</h2>
    <table class="w-full table-auto">
      <tr v-for="(log, i) in l.logs" :key="i">
        <td>{{ log.level }}</td>
        <td>{{ log.timestamp }}</td>
        <td class="font-mono whitespace-pre">{{ log.message }}</td>
      </tr>
    </table>
  </div>
</template>
