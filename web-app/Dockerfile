FROM node:14.9.0-alpine as builder
RUN apk add gettext
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG API_HOST_URL
RUN envsubst < src/environments/environment.prod.ts.template > src/environments/environment.prod.ts && npx ng build --prod

# Deploy Angular App
FROM nginx:1.19-alpine
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist/web-app /usr/share/nginx/html
