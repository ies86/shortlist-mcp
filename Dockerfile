# Dockerfile for the Shortlist Price Index MCP server.
#
# This is a Next.js app (mcp-handler) that serves a streamable-HTTP MCP endpoint
# at /mcp. Glama builds this image to verify a reproducible build; once running,
# the server responds to introspection (tools/list) on port 3000 without any
# external dependency, so the listing's build/introspection check passes.
#
# The public production endpoint remains https://shortlist-mcp.vercel.app/mcp;
# this container is the self-hostable equivalent.

FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/app ./app
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/next-env.d.ts ./next-env.d.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json
EXPOSE 3000
CMD ["npm", "run", "start"]
