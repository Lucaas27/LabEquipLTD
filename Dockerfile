FROM nginx:alpine

WORKDIR /labEquip

COPY dist .

# Set appropriate permissions (read-execute for everyone) for the /labEquip directory
RUN chmod -R 755 /labEquip

COPY nginx.config /etc/nginx/nginx.conf