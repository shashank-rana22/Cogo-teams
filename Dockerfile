FROM alpine:latest as admin-artifacts
WORKDIR /app
COPY . .
RUN rm -rf /app/cogo-control/.next/cache /app/.git

FROM node:18-bullseye-slim as admin
COPY --from=admin-artifacts /app /app
WORKDIR /app/cogo-control
CMD ["yarn","start","-p", "4160"]