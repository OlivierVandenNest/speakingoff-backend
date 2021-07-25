import { allMeetings } from "./meeting.js";
import { StatusCodes } from "http-status-codes";

// TODO: const resolve or reject messages

const topic = function Topic() {
    let topicId;
    var topicName;
    var topicCreator;
    let createdDate;
    var duration;
    var meetingName;
    var isFinished;
};

// TODO: data validation
const addTopic = (topic) => {
    return new Promise((resolve, reject) => {
        if (topic?.meetingName) {
            if (allMeetings.hasOwnProperty(topic.meetingName)) {
                if (topic.topicName) {
                    if (!allMeetings[topic.meetingName].meetingTopics.hasOwnProperty(topic.topicName)) {
                        allMeetings[topic.meetingName].meetingTopics[topic.topicName] = topic;
                        resolve("Topic added");
                    } else {
                        reject({ msg: "Topic with this topic name exists in the meeting already", statusCode: StatusCodes.BAD_REQUEST });
                    }
                } else {
                    reject({ msg: "Please add a topic with a valid topic name", statusCode: StatusCodes.BAD_REQUEST });
                }
            } else {
                reject({ msg: "Meeting with this meeting name does not exist yet", statusCode: StatusCodes.BAD_REQUEST }); // NOT FOUND?
            }
        } else {
            reject({ msg: "Please add a Topic with a valid meeting name", statusCode: StatusCodes.BAD_REQUEST });
        }
    });
};

const getTopic = (meetingName, topicName) => {
    return new Promise((resolve, reject) => {
        if (meetingName && topicName) {
            if (allMeetings.hasOwnProperty(meetingName)) {
                if (allMeetings[meetingName].meetingTopics.hasOwnProperty(topicName)) {
                    resolve(allMeetings[meetingName].meetingTopics[topicName]);
                } else {
                    reject({ msg: "Please enter a topic name that is in the meeting", statusCode: StatusCodes.NOT_FOUND });
                }
            } else {
                reject({ msg: "Please enter a name from an existing meeting", statusCode: StatusCodes.NOT_FOUND });
            }
        } else {
            reject({ msg: "Please enter a valid meeting name and topic name", statusCode: StatusCodes.BAD_REQUEST });
        }
    });
};

const getTopics = (meetingName) => {
    return new Promise((resolve, reject) => {
        if (meetingName) {
            if (allMeetings.hasOwnProperty(meetingName)) {
                resolve(allMeetings[meetingName].meetingTopics);
            } else {
                reject({ msg: "Please enter a name from an existing meeting", statusCode: StatusCodes.NOT_FOUND });
            }
        } else {
            reject({ msg: "Please enter a valid meeting name", statusCode: StatusCodes.BAD_REQUEST });
        }
    });
};

const removeTopic = (topicId) => {
    delete allTopics[topicId];
};

export { topic, addTopic, getTopic, getTopics, removeTopic };
