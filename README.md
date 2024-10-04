# Docker Nginx Bun Streaming Server

This project implements a video upload and streaming server using Docker, Nginx with RTMP support, and Bun for the video upload service, serving content via HTTP.

## Overview

-   **Nginx**: HTTP server used to distribute stored videos, configured with support for the RTMP protocol.
-   **Bun**: Runs the video upload service, using express and express-fileupload.
-   **Docker**: Complete isolation of the development environment, with containers for the Nginx server and the Bun service.

### Project Structure

```bash
.
├── docker-compose.yml   # Docker Compose file for orchestrating services
├── nginx.conf           # Nginx and RTMP configurations
├── node_upload_service
│ ├── Dockerfile         # Dockerfile for the Bun service (upload)
│ ├── lib/               # Source code for the upload service
│ ├── package.json       # Dependencies for the Bun service
│ ├── tsconfig.json      # TypeScript configurations
├── test_web_uploader    # Example page for uploading
│ └── index.html         # Form for uploading videos
└── videos/              # Directory where videos are stored
└── video.mp4            # Example video
```
## Requirements

- **Docker** e **Docker Compose** installed in the system.

## How to Use

### Step 1: Clone the repository

```bash
git clone https://github.com/seu-usuario/docker-nginx-bun-streaming-server.git
cd docker-nginx-bun-streaming-server
```

### Step 2: Upload containers with Docker

```bash
docker-compose up --build
```

This will create two containers:
- **nginx-rtmp**: Nginx server with RTMP support, responsible for streaming and serving videos via HTTP.
- **node-upload**: Bun service that handles video uploads.

### Step 3: Access the upload server

You can access the upload page in your browser:

```
$HOME/clone-project-path/test_web_uploader/index.html
```

### Step 4: Access uploaded videos

Uploaded videos will be served via Nginx at the URL:

```
http://localhost:8080/videos/[video-name].mp4
```

### Exemplos

Upload a video via the upload form in the `/upload` route. The video will be saved in the `/videos` directory and can be accessed via HTTP on the Nginx server.

---

## Technologies Used

- **Nginx**: Used for video streaming and RTMP.
- **Bun**: Used for managing the upload service (alternative to Node.js).
- **Docker**: For containerization of services.

## License

[MIT](LICENSE)
```
