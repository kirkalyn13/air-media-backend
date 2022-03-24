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
            const videoPath: string = `./media/videos/${result[0].path}.mp4`
            const videoStream: any = fs.createReadStream(videoPath)
            videoStream.pipe(res)
        }
    })
})

//
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


app.listen(port, () => {
    console.log(`Air Media Server is running on port ${port}...`)
})