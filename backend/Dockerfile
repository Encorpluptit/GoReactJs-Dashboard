# Start from golang base image
#FROM golang:alpine as builder
FROM golang:alpine3.12 as builder

# ENV GO111MODULE=on

# Add Image info
LABEL name='Golang 1.15 (alpine) Image'
LABEL maintainer="Damien Bernard <damien.bernard@epitech.eu>"
LABEL version="1.0"
LABEL description="Temporary Image for Multi stage usage in Dashboard"

# Install git.
# Git is required for fetching the dependencies.
# TODO: Add gcc only for dev
RUN apk update && apk add --no-cache git gcc libc-dev

# Set the current working directory inside the container
WORKDIR /api

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and the go.sum files are not changed
RUN go mod download

# Copy the source from the current directory to the working Directory inside the container
COPY . .

# Build the Go app
# TODO: Enable CGo only for dev
#RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .
#RUN GOOS=linux go build -a -installsuffix cgo -o main .
RUN GOOS=linux go build -installsuffix cgo -o main .

# Start a new stage from scratch
FROM alpine:latest
LABEL name='Dashboard - go Rest API'
LABEL maintainer="Damien Bernard <damien.bernard@epitech.eu>"
LABEL version="1.0"
LABEL description="Go rest API. \
Run on port 8080."

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the Pre-built binary file from the previous stage. Observe we also copied the .env file
COPY --from=builder /api/main .
COPY --from=builder /api/.env .

#Command to run the executable
#CMD ["./main"]
ENTRYPOINT ["./main"]
