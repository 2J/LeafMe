
FROM debian:jessie

RUN apt-get update && apt-get install -y ca-certificates curl
RUN mkdir /app
COPY api.bin /app/api.bin
CMD ["/app/api.bin"]
