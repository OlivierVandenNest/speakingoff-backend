import Express from "express";
import * as Topic from "./topic.js";
import * as Meeting from "./meeting.js";
import cors from "cors";
import { StatusCodes } from "http-status-codes";

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// TODO: change content headers when error is returned (maybe in frontend)

// Add headers
app.use(cors());

const port = process.env.PORT || 3002;

app.get("/", (req, res) => {
    res.status(StatusCodes.OK).send("Hello World!");
});

// Meetings
app.get("/meetings", (req, res) => {
    res.status(StatusCodes.OK).json(Meeting.allMeetings);
});

app.get("/meetings/:meetingName", (req, res) => {
    Meeting.getMeeting(req.params.meetingName)
        .then((meeting) => res.status(StatusCodes.OK).json(meeting))
        .catch(({ msg, statusCode }) => res.status(statusCode).send(`Error when getting meeting with name ${req.params.meetingName}: ${msg}`));
});

app.post("/addmeeting", (req, res) => {
    Meeting.addMeeting(req.body)
        .then((msg) => res.status(StatusCodes.OK).send(msg))
        .catch(({ msg, statusCode }) => res.status(statusCode).send(`Error when adding meeting: ${msg}`));
});

// Topics
app.get("/meetings/:meetingName/topics/:topicName", (req, res) => {
    Topic.getTopic(req.params.meetingName, req.params.topicName)
        .then((value) => {
            res.status(StatusCodes.OK).json(value);
        })
        .catch(({ msg, statusCode }) => {
            res.status(statusCode).send(`Error when getting topic with name ${req.params.topicName}: ${msg}`);
        });
});

app.get("/meetings/:meetingName/topics", (req, res) => {
    Topic.getTopics(req.params.meetingName)
        .then((topics) => res.status(StatusCodes.OK).json(topics))
        .catch(({ msg, statusCode }) => {
            res.status(statusCode).send(`Error when getting topics from meeting with name ${req.params.meetingName}: ${msg}`);
        });
});

app.post("/addtopic", (req, res) => {
    Topic.addTopic(req.body)
        .then((msg) => res.status(StatusCodes.OK).send(msg))
        .catch(({ msg, statusCode }) => {
            res.status(statusCode).send(`Error when adding topic: ${msg}`);
        });
});

app.put("/updatetopic", (req, res) => {
    Meeting.updateTopic(req.body)
        .then((msg) => res.status(StatusCodes.OK).send(msg))
        .catch(({ msg, statusCode }) => {
            res.status(statusCode).send(`Error when updating topic: ${msg}`);
        });
});

app.listen(port, () => console.log(`listening on port ${port}`));
