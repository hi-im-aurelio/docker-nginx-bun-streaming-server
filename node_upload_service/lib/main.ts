import express, { json } from "express";
import fileUpload from "express-fileupload";
import path from "node:path";

const app = express();

app.use(fileUpload());
app.use(json());

const upload_path = "/var/www/videos";

app.post("/upload", (req: any, res: any) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("Nenhum arquivo foi enviado.");
    }

    const video_file = req.files.file;

    const upload_file_path = path.join(upload_path, video_file.name);

    video_file.mv(upload_file_path, (err: unknown) => {
        if (err) {
            return res.status(500).json({
                message: "!failure",
            });
        }

        res.status(200).json({
            message: "!ok",
            url: `http://localhost:8080/videos/${video_file.name}">`,
        });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor de upload rodando na porta ${PORT}`);
});
