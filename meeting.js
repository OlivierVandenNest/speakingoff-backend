import { StatusCodes } from "http-status-codes";

const meeting = function Meeting() {
    let meetingId;
    var meetingName;
    var meetingTopics;
    let createdDate;
};

const addMeeting = (meeting) => {
    return new Promise((resolve, reject) => {
        if (meeting?.meetingName) {
            if (!allMeetings.hasOwnProperty(meeting.meetingName)) {
                allMeetings[meeting.meetingName] = meeting;
                resolve("Meeting added");
            } else {
                reject({ msg: "Meeting with this meeting name already exists", statusCode: StatusCodes.BAD_REQUEST });
            }
        } else {
            reject({ msg: "Please add a Meeting with a valid meeting name", statusCode: StatusCodes.BAD_REQUEST });
        }
    });
};

const getMeeting = (meetingName) => {
    return new Promise((resolve, reject) => {
        if (meetingName && allMeetings.hasOwnProperty(meetingName)) {
            resolve(allMeetings[meetingName]);
        } else {
            reject({ msg: "Meeting with this meeting name not found", statusCode: StatusCodes.NOT_FOUND });
        }
    });
};

const updateTopic = (topic) => {
    return new Promise((resolve, reject) => {
        if (topic && topic.meetingName && topic.topicName) {
            if (allMeetings.hasOwnProperty(topic.meetingName)) {
                if (allMeetings[topic.meetingName].meetingTopics.hasOwnProperty(topic.topicName)) {
                    console.log("merging");
                    allMeetings[topic.meetingName].meetingTopics[topic.topicName] = Object.assign(
                        {},
                        allMeetings[topic.meetingName].meetingTopics[topic.topicName],
                        topic
                    );
                    resolve("Topic updated");
                } else {
                    reject({ msg: "Please update a topic that the meeting contains", statusCode: StatusCodes.BAD_REQUEST });
                }
            } else {
                reject({ msg: "Please enter a name from an existing meeting", statusCode: StatusCodes.BAD_REQUEST });
            }
        } else {
            reject({ msg: "Please enter a valid meeting name and topic name", statusCode: StatusCodes.BAD_REQUEST });
        }
    });
};

const removeMeeting = (meetingName) => {
    delete allMeetings[meetingName];
};

var allMeetings = {};

export { meeting, getMeeting, addMeeting, updateTopic, removeMeeting, allMeetings };
