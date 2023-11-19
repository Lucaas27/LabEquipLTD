FROM nginx:alpine

WORKDIR /equipLab

COPY dist .

# Set appropriate permissions (read-execute for everyone) for the /src directory
RUN chmod -R 755 /equipLab

COPY nginx.config /etc/nginx/nginx.conf