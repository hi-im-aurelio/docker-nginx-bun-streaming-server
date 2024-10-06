import express, { json } from "express";
import fileUpload from "express-fileupload";
import path from "node:path";
import fs from "node:fs";
import Morgans from "./utils/morgans_util";

const app = express();
app.use(Morgans.big_news);
app.use(fileUpload());
app.use(json());

const upload_path = "/var/www/videos";

if (!fs.existsSync(upload_path)) {
    fs.mkdirSync(upload_path, { recursive: true });
}

app.post("/upload", (req: any, res: any) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "no files were sent" });
    }

    const video_file = req.files.file;

    const validMimeTypes = ["video/mp4", "video/x-m4v", "video/x-msvideo", "video/ogg", "video/webm"];
    if (!validMimeTypes.includes(video_file.mimetype)) {
        return res.status(400).json({ message: "unsupported file type. Only videos are allowed" });
    }

    const upload_file_path = path.join(upload_path, video_file.name);

    if (fs.existsSync(upload_file_path)) {
        return res.status(409).json({ message: "file already exists" });
    }

    video_file.mv(upload_file_path, (err: any) => {
        if (err) {
            return res.status(500).json({ message: "failed to move the file" });
        }

        const video_url = `https://${req.headers.host}/videos/${video_file.name}`;

        res.status(200).json({
            message: "upload completed successfully",
            url: video_url,
        });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor de upload rodando na porta ${PORT}`);
});
