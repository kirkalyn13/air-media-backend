import express, {Application, Request, Response} from 'express'
import mysql, {Connection, MysqlError} from 'mysql'
import cors from 'cors'
import fs from 'fs'

const app: Application = express()
const port: number | string = process.env.PORT || 3010

app.use(cors())
app.use(express.json({limit: '50mb'}))

//Connect to SQL Database
const db: Connection = mysql.createConnection({
    user: 'testuser',
    password: 'test123',
    host: 'localhost',
    database: 'airmediadb',
    dateStrings: true

})

//Stream Video
app.get('/videos/watch/:id', (req: Request, res: Response) =>{
    const videoQuery: string = `SELECT path FROM videos WHERE videoID=${req.params.id}`
    db.query(videoQuery,(err,result) => {
        if(err){
            console.log(err)
        }else{
            try{
                const range: any = req.headers.range
                if(!range){
                    res.status(400).send("Requires Range Header.")
                }
                const videoPath: string = `./media/videos/${result[0].path}.mp4`
                const videoSize: number =  fs.statSync(videoPath).size
                const CHUNK_SIZE: number = 10**9
                const start: number = Number(range.replace(/\D/g, ""))
                const end: number = Math.min(start + CHUNK_SIZE, videoSize - 1)
                const contentLength: number = end - start + 1
                type Headers = {
                    "Content-Range": string,
                    "Accept-Ranges": string,
                    "Content-Length": number,
                    "Content-Type": string,
                }
                const headers: Headers = {
                    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": contentLength,
                    "Content-Type": "video/mp4",
                    };
                
                
                res.writeHead(206, headers);
                const videoStream: any = fs.createReadStream(videoPath)
                videoStream.pipe(res)
            }catch(err){
                console.log(err)
            }
            
        }
    })
})

//Fetch All Available Videos
app.get('/videos', (req: Request, res: Response) =>{
    const videoQuery: string = 'SELECT videoID, title, genre FROM videos'
    db.query(videoQuery,(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

//Fetch All Available Music
app.get('/music', (req: Request, res: Response) =>{
    const musicQuery: string = 'SELECT musicID, title, artist, genre FROM music'
    db.query(musicQuery,(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})


app.listen(port, () => {
    console.log(`Air Media Server is running on port ${port}...`)
})