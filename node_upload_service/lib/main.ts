import express, { json } from "express";
import fileUpload from "express-fileupload";
import path from "node:path";
import cors from "cors";
import fs from "node:fs";
import Morgans from "./utils/morgans_util";

const app = express();
app.options(
    "*",
    cors({
        origin: ["https://stream.nitativa.com", "https://www.nitativa.com", "https://nitativa.com"],
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: "Content-Type,Authorization",
        credentials: true,
    }),
);

app.use(
    cors({
        origin: ["https://stream.nitativa.com", "https://www.nitativa.com", "https://nitativa.com"],
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type,Authorization",
        credentials: true,
    }),
);

app.use(Morgans.big_news);
app.use(
    fileUpload({
        abortOnLimit: true,
        limits: { fileSize: 1 * 1024 * 1024 * 1024 },
        useTempFiles: true,
    }),
);

app.use(json());

const upload_path = "/var/www/videos";

if (!fs.existsSync(upload_path)) {
    fs.mkdirSync(upload_path, { recursive: true });
}

app.get("/check-file", (req: any, res: any) => {
    const { filename } = req.query;

    if (!filename) {
        return res.status(400).json({ message: "Filename is required" });
    }

    const file_path = path.join(upload_path, filename as string);
    const video_url = `https://${req.headers.host}/videos/${filename}`;

    if (fs.existsSync(file_path)) {
        return res.status(200).json({
            exists: true,
            message: "File already exists",
            url: video_url,
        });
    }

    return res.status(200).json({
        exists: false,
        message: "File does not exist",
    });
});

app.post("/upload", (req: any, res: any) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "no files were sent" });
    }

    const video_file = req.files.file;
    const upload_file_path = path.join(upload_path, video_file.name);
    const video_url = `https://${req.headers.host}/videos/${video_file.name}`;

    if (fs.existsSync(upload_file_path)) {
        return res.status(409).json({
            message: "file already exists",
            url: video_url,
        });
    }

    video_file.mv(upload_file_path, (err: any) => {
        if (err) {
            console.error(`Err: ${err}`);
            return res.status(500).json({ message: "failed to move the file" });
        }

        res.status(200).json({
            message: "upload completed successfully",
            url: video_url,
        });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Upload server running on the port ${PORT}`);
});
