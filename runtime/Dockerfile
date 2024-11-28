FROM supabase/edge-runtime:v1.65.0
WORKDIR /app
COPY . .
RUN edge-runtime bundle --import-map deno.json --entrypoint src/index.ts && rm bin.eszip
EXPOSE 9000
ENTRYPOINT ["edge-runtime", "start", "--import-map", "deno.json", "--main-service", "src", "--event-worker", "event-manager"]
