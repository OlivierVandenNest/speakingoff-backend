import { StatusCodes } from "http-status-codes";

const meeting = function Meeting() {
    let meetingId;
    var createdDate;
    var meetingName;

    var meetingTopics;
    var totalDuration;
    var progress;
    var progressLastUpdated;

    var isFinished;
};

const addMeeting = (meeting) => {
    return new Promise((resolve, reject) => {
        if (meeting?.meetingName) {
            if (!allMeetings.hasOwnProperty(meeting.meetingName)) {
                meeting.createdDate = Date.now();
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
        if (topic && topic.meetingName && topic.topicName && topic.duration > 0) {
            if (allMeetings.hasOwnProperty(topic.meetingName)) {
                if (allMeetings[topic.meetingName].meetingTopics.hasOwnProperty(topic.topicName)) {
                    allMeetings[topic.meetingName].meetingTopics[topic.topicName] = Object.assign(
                        {},
                        allMeetings[topic.meetingName].meetingTopics[topic.topicName],
                        topic
                    );
                    console.log(allMeetings);
                    updateProgress(allMeetings[topic.meetingName]);
                    resolve("Topic updated");
                } else {
                    reject({ msg: "Please update a topic that the meeting contains", statusCode: StatusCodes.BAD_REQUEST });
                }
            } else {
                reject({ msg: "Please enter a name from an existing meeting", statusCode: StatusCodes.BAD_REQUEST });
            }
        } else {
            reject({ msg: "Please enter a valid meeting name and topic name and duration", statusCode: StatusCodes.BAD_REQUEST });
        }
    });
};

const updateProgress = (meeting) => {
    console.log(Object.values(meeting.meetingTopics));
    meeting.totalDuration = Object.values(meeting.meetingTopics).reduce((cumulativeDuration, topic) => {
        return cumulativeDuration + topic.duration;
    }, 0);
    console.log(meeting.totalDuration);
    meeting.progress =
        Object.values(meeting.meetingTopics).reduce((cumulativeDuration, topic) => {
            if (topic.isFinished) {
                return cumulativeDuration + topic.duration;
            }
            return cumulativeDuration;
        }, 0) / meeting.totalDuration;

    console.log(meeting.progress);

    meeting.isFinished = meeting.progress === 1;
    meeting.progressLastUpdated = Date.now();
};

const removeMeeting = (meetingName) => {
    delete allMeetings[meetingName];
};

var allMeetings = {};

export { meeting, getMeeting, addMeeting, updateTopic, updateProgress, removeMeeting, allMeetings };
