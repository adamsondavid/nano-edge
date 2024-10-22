FROM supabase/edge-runtime:v1.59.0
RUN apt-get update && apt-get install -y iproute2 jq
WORKDIR /app
COPY . .
RUN sh scripts/install.sh
EXPOSE 9000
ENTRYPOINT ["sh", "scripts/entrypoint.sh"]
