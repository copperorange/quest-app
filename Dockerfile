
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./

# Install production deps deterministically
RUN npm ci --omit=dev
COPY . .

# Final image runs as non-root user
FROM node:22-alpine AS runtime
WORKDIR /app
COPY --from=builder /app .
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# TRICK: Create the file that the app looks for to prove it's in a container
RUN touch /.dockerenv

USER appuser
EXPOSE 3000

CMD ["npm", "start"]