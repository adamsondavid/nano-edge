FROM denoland/deno:2.0.0 as builder
WORKDIR /build
COPY deno.* .
RUN deno install --lock
COPY . .
RUN deno task build

FROM supabase/edge-runtime:v1.58.3
WORKDIR /app
COPY --from=builder /build/dist .
ENTRYPOINT ["edge-runtime", "start", "--main-service", "main"]
