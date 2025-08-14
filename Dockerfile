FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 5173
CMD ["npm", "run", "dev"]

# FROM node:21 as builder

# WORKDIR /app

# COPY package*.json ./
# RUN npm install --frozen-lockfile

# COPY . .
# RUN npm run build

# FROM nginx:alpine as runner

# WORKDIR /usr/share/nginx/html

# COPY --from=builder /app/dist .
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
