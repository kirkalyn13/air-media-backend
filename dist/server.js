"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3010;
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
//Connect to SQL Database
const db = mysql_1.default.createConnection({
    user: 'testuser',
    password: 'test123',
    host: 'localhost',
    database: 'airmediadb',
    dateStrings: true
});
//Fetch All Available Videos
app.get('/videos', (req, res) => {
    const videoQuery = 'SELECT videoID, title, genre FROM videos';
    db.query(videoQuery, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});
//Fetch All Available Music
app.get('/music', (req, res) => {
    const musicQuery = 'SELECT musicID, title, artist, genre FROM music';
    db.query(musicQuery, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});
//Stream Video
app.get('/videos/watch/:id', (req, res) => {
    const videoQuery = `SELECT path FROM videos WHERE videoID=${req.params.id}`;
    db.query(videoQuery, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            try {
                const range = req.headers.range;
                if (!range) {
                    res.status(400).send("Requires Range Header.");
                }
                const videoPath = `./media/videos/${result[0].path}.mp4`;
                const videoSize = fs_1.default.statSync(videoPath).size;
                const CHUNK_SIZE = 10 ** 9;
                const start = Number(range.replace(/\D/g, ""));
                const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
                const contentLength = end - start + 1;
                const headers = {
                    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": contentLength,
                    "Content-Type": "video/mp4",
                };
                res.writeHead(206, headers);
                const videoStream = fs_1.default.createReadStream(videoPath);
                videoStream.pipe(res);
            }
            catch (err) {
                console.log(err);
            }
        }
    });
});
//Stream Music
app.get('/music/listen/:id', (req, res) => {
    const songQuery = `SELECT path FROM music WHERE musicID=${req.params.id}`;
    db.query(songQuery, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            try {
                const range = req.headers.range;
                if (!range) {
                    res.status(400).send("Requires Range Header.");
                }
                const musicPath = `./media/music/${result[0].path}.mp3`;
                const songSize = fs_1.default.statSync(musicPath).size;
                const CHUNK_SIZE = 10 ** 12;
                const start = Number(range.replace(/\D/g, ""));
                const end = Math.min(start + CHUNK_SIZE, songSize - 1);
                const contentLength = end - start + 1;
                const headers = {
                    "Content-Range": `bytes ${start}-${end}/${songSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": contentLength,
                    "Content-Type": "video/mp4",
                };
                res.writeHead(206, headers);
                const musicStream = fs_1.default.createReadStream(musicPath);
                musicStream.pipe(res);
            }
            catch (err) {
                console.log(err);
            }
        }
    });
});
app.listen(port, () => {
    console.log(`Air Media Server is running on port ${port}...`);
});
