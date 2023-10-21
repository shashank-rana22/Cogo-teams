FROM busybox as packages 
WORKDIR /app
COPY cogo-control ./cogo-control
COPY common ./common
COPY packages ./packages

RUN find . -type f -not -name 'package.json'  -exec rm {} \;

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache build-base libc6-compat python3
WORKDIR /app

# Install dependencies based on the preferred package manager
#main package.json
COPY package.json pnpm-workspace.yaml* yarn.lock* package-lock.json* pnpm-lock.yaml* ./

#deprecated and packages
COPY  --from=packages /app .

ARG NPM_TOKEN
RUN \
  echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc; \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm@7.5.2 && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi; \
  rm -f .npmrc

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app /app
COPY . .
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn global add pnpm@7.5.2 && pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/cogo-control/public ./cogo-control/public

# Set the correct permission for prerender cache
RUN mkdir ./cogo-control/.next
RUN chown nextjs:nodejs ./cogo-control/.next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/cogo-control/.next/standalone/ .
COPY --from=builder --chown=nextjs:nodejs /app/cogo-control/.next/static ./cogo-control/.next/static

USER nextjs

EXPOSE 4160

ENV PORT 4160
ENV HOSTNAME "0.0.0.0"

CMD ["node", "/app/cogo-control/server.js"]




# FROM node:18-bullseye-slim as admin
# WORKDIR /app
# COPY . .
# WORKDIR /app/cogo-control
# CMD ["yarn","start","-p", "4160"]