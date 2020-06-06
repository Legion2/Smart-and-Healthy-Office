FROM node:14.4.0-alpine as builder
RUN npm install -g @angular/cli
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
#RUN ng build --prod

FROM nginx:1.17-alpine

#COPY --from=builder /usr/src/app/dist/web-app /usr/share/nginx/html
