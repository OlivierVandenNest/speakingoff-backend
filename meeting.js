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

const removeMeeting = (meetingName) => {
    delete allMeetings[meetingName];
};

var allMeetings = {};

export { meeting, getMeeting, addMeeting, removeMeeting, allMeetings };
