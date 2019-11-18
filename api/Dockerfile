# Build binary
FROM golang:1.13-alpine AS builder

RUN apk add --no-cache git
WORKDIR /go/src/github.com/2J/LeafMe/api/
COPY . .
RUN go get
RUN go build -o /bin/api.bin .

# Run binary
FROM alpine:latest

RUN apk --no-cache add ca-certificates curl
COPY --from=builder /bin/api.bin /bin/api.bin

CMD ["/bin/api.bin"]
