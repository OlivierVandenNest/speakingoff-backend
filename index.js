import Express from "express"
import * as Topic from './topic.js'

const app = Express()

app.use(Express.json())
app.use(Express.urlencoded({extended: true}))

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000', 'https://speakingoff.com', 'https://speakingoff.herokuapp.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const port = process.env.PORT || 3000

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