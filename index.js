import Express from "express"
import * as Topic from './topic.js'

const app = Express()

app.use(Express.json())
app.use(Express.urlencoded({extended: true}))

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/topics', (req, res) => {
    res.json(Topic.allTopics)
})

app.get('/topic/:topicid', (req, res) => {
    const t = Topic.getTopic(req.params.topicid)

    t.then(value => {res.json(value)}).catch(err => {res.send('Something went wrong: ' + err)})
})

app.post('/addtopic', (req, res) => {
    Topic.addTopic(req.body).catch((err) => {
        res.send(err)
    })
    console.log(Topic.allTopics)
})

app.listen(port, () => console.log('listening on port ' + port))