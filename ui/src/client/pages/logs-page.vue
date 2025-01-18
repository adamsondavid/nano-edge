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
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from "radix-vue";
import { Request } from "@/common/contract";
import { cn } from "@/client/lib/utils";

const server = useServer();
const route = useRoute();

const requests = ref([] as Request[]);
const selectedRequestId = ref<string>();

watchEffect(async () => {
  requests.value = [];
  const response = await server.getLogs({ params: { deployment: route.params.deployment.toString() } });
  if (response.status === 200) requests.value = response.body.reverse();
});

const variants = cva(
  "w-full rounded-sm mb-0.5 min-h-7 max-h-fit font-mono text-sm text-nowrap flex py-1 gap-8 text-left select-text px-2",
  {
    variants: {
      type: {
        request: "",
        log: "",
      },
      logLevel: {
        info: "",
        warn: "bg-yellow-50 hover:bg-yellow-100 text-yellow-700",
        error: "bg-red-50 hover:bg-red-100 text-red-700",
      },
    },
    compoundVariants: [
      {
        logLevel: "info",
        type: "request",
        class: "[&:nth-of-type(2n)]:bg-gray-100 hover:!bg-gray-200",
      },
      {
        logLevel: "info",
        type: "log",
        class: "hover:bg-gray-50",
      },
    ],
  },
);

// TODO: turn functions into computed properties once. Performance with calling these functions (multiple times) on every rerender is a performance issue!

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
  if (status < 300) return "text-green-700";
  else if (status < 400) return "text-yellow-700";
  else return "text-red-700";
}
</script>

<template>
  <accordion-root v-model="selectedRequestId" type="single" collapsible class="p-2">
    <accordion-item v-for="request in requests" :key="request.requestId" :value="request.requestId" as-child>
      <!-- TODO: extract component -->
      <accordion-trigger :class="variants({ type: 'request', logLevel: getMostSignificantLogLevel(request) })">
        <span :title="getMostSignificantLogLevel(request).toUpperCase()">
          <Icon v-if="getMostSignificantLogLevel(request) === 'info'" :icon="info" width="16" />
          <Icon v-if="getMostSignificantLogLevel(request) === 'warn'" :icon="alertTriangle" width="16" />
          <Icon v-else-if="getMostSignificantLogLevel(request) === 'error'" :icon="alertTriangle" width="16" />
        </span>
        <span>
          <span class="opacity-60">{{ formatDate(new Date(request.timestamp)) }}</span>
          <span>{{ formatTime(new Date(request.timestamp)) }}</span>
          <span class="opacity-60">{{ formatMilliseconds(new Date(request.timestamp)) }}</span>
        </span>
        <span class="opacity-60">{{ request.requestId }}</span>
        <span :class="mapStatusCodeColor(request.status)">{{ request.status }}</span>
        <span class="flex items-center gap-2">
          <span class="opacity-60">
            <span v-if="request.type === 'INBOUND_FUNCTION_REQUEST'" title="Edge Function Request">
              <Icon :icon="functionSquare" width="16" />
            </span>
            <span v-else-if="request.type === 'INBOUND_STATIC_REQUEST'" title="Static File Request">
              <Icon :icon="database" width="16" />
            </span>
          </span>
          <span class="min-w-[25em] max-w-[25em] truncate">
            <span class="opacity-60">{{ request.method + " " }}</span>
            <span :title="request.path">{{ request.path }}</span>
          </span>
        </span>
        <span v-if="request.logs" class="truncate">{{ request.logs.at(-1)?.message }}</span>
        <span v-if="request.logs && request.logs.length > 1" class="opacity-60">
          ({{ request.logs.length - 1 }} more)
        </span>
        <span v-if="request.duration !== undefined" class="ml-auto">{{ request.duration }}ms</span>
      </accordion-trigger>
      <!-- TODO: extract component?? -->
      <accordion-content class="overflow-hidden content">
        <div class="ml-12">
          <div v-if="request.logs" class="relative">
            <div class="absolute w-[3px] top-0 bottom-4 left-[-33px] bg-gray-100" />
            <div
              v-for="(log, i) of request.logs"
              :key="i"
              :class="cn(variants({ type: 'log', logLevel: log.level }), 'relative')"
            >
              <div
                class="absolute w-[11px] h-[11px] top-2 bottom-4 left-[-37px] bg-gray-200 rounded-full border-[1px] border-white"
              />
              <div>
                <span class="opacity-60">{{ formatDate(new Date(log.timestamp)) }}</span>
                <span>{{ formatTime(new Date(log.timestamp)) }}</span>
                <span class="opacity-60">{{ formatMilliseconds(new Date(log.timestamp)) }}</span>
              </div>
              <span class="whitespace-pre">{{ log.message }}</span>
            </div>
          </div>
          <div class="text-xs opacity-60 pl-2 pt-2 pb-6">
            <span v-if="request.logs?.length">no more log entries to show</span>
            <span v-else>no log entries to show</span>
          </div>
        </div>
      </accordion-content>
    </accordion-item>
  </accordion-root>
</template>

<style scoped>
.content[data-state="open"] {
  animation: slide-down 150ms cubic-bezier(0.87, 0, 0.13, 1);
}
.content[data-state="closed"] {
  animation: slide-up 150ms cubic-bezier(0.87, 0, 0.13, 1);
}

@keyframes slide-down {
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
}

@keyframes slide-up {
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
}
</style>
