FROM supabase/edge-runtime:v1.58.3
WORKDIR /app
COPY src/deps.ts src/deps.ts
RUN edge-runtime bundle --entrypoint src/deps.ts && rm bin.eszip
COPY . .
EXPOSE 9000
ENTRYPOINT ["edge-runtime", "start", "--main-service", "src"]
