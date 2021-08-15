import { Service } from "typedi";
import { IMeeting, IMeetingInputDTO, MeetingStatus } from "../interfaces/IMeeting";
import { v4 as uuid_v4 } from "uuid";
import { ITopic, ITopicInputDTO } from "../interfaces/ITopic";

@Service()
export default class MeetingService {
    private meetingArray: IMeeting[] = [];
    private meetingMap: Map<String, IMeeting> = new Map<String, IMeeting>();

    getAllMeetings(): IMeeting[] {
        return this.meetingArray;
    }

    getMeeting(meetingName: String): IMeeting {
        return this.meetingMap.get(meetingName);
    }

    // TODO: instead of void, return Error (when working with database)
    addMeeting(meetingInput: IMeetingInputDTO): void {
        if (this.meetingMap.has(meetingInput.meetingName)) {
            return;
        }
        const newMeeting: IMeeting = {
            meetingId: uuid_v4(),
            meetingInputDTO: meetingInput,
            createdDateUnix: Date.now(),
            meetingTopicsList: [] as ITopic[],
            meetingTopicsMap: new Map<String, ITopic>(),
            totalDuration: 0,
            progress: 0,
            lastUpdatedUnix: Date.now(),
            status: MeetingStatus.Preparation,
            isFinished: false
        };

        this.meetingArray.push(newMeeting);
        this.meetingMap.set(meetingInput.meetingName, newMeeting);
    }

    deleteMeeting(meetingName: String): void {
        // ...
    }

    updateMeeting(receivedTopic: ITopicInputDTO): void {
        if (!this.meetingMap.has(receivedTopic.meetingName) || !this.meetingMap.get(receivedTopic.meetingName).meetingTopicsMap.has(receivedTopic.topicName)) {
            return;
        }

        let updatedMeeting = this.meetingMap.get(receivedTopic.meetingName);
        let updatedTopic = updatedMeeting.meetingTopicsMap.get(receivedTopic.topicName);
        updatedTopic.topicInputDTO = receivedTopic;
        updatedTopic.lastUpdatedUnix = Date.now();
        updatedMeeting.meetingTopicsList = [...updatedMeeting.meetingTopicsMap.values()];

        this.updateMeetingProgress(receivedTopic.meetingName);
        updatedMeeting.lastUpdatedUnix = Date.now();
    }

    updateMeetingProgress(meetingName: String): void {
        let updatedMeeting = this.meetingMap.get(meetingName);
        updatedMeeting.totalDuration = updatedMeeting.meetingTopicsList.reduce((cumulativeDuration, topic) => {
            return cumulativeDuration + topic.topicInputDTO.duration;
        }, 0);

        updatedMeeting.progress =
            updatedMeeting.meetingTopicsList.reduce((cumulativeDuration, topic) => {
                if (topic.topicInputDTO.isFinished) {
                    return cumulativeDuration + topic.topicInputDTO.duration;
                }
                return cumulativeDuration;
            }, 0) / updatedMeeting.totalDuration;

        updatedMeeting.isFinished = updatedMeeting.progress === 1;
    }

    addMeetingTopic(newTopic: ITopicInputDTO): void {
        if (!this.meetingMap.has(newTopic.meetingName) || this.meetingMap.get(newTopic.meetingName).meetingTopicsMap.has(newTopic.topicName)) {
            return;
        }

        newTopic.isFinished = false;

        const forgedTopic: ITopic = {
            topicId: uuid_v4(),
            createdDateUnix: Date.now(),
            lastUpdatedUnix: Date.now(),
            topicInputDTO: newTopic
        };
        let updatedMeeting = this.meetingMap.get(newTopic.meetingName);
        updatedMeeting.meetingTopicsMap.set(newTopic.topicName, forgedTopic);
        updatedMeeting.meetingTopicsList.push(forgedTopic);

        this.updateMeetingProgress(newTopic.meetingName);
        updatedMeeting.lastUpdatedUnix = Date.now();
    }

    startMeeting(meetingName: String): IMeeting {
        if (!this.meetingMap.has(meetingName)) {
            return;
        }

        let updatedMeeting = this.meetingMap.get(meetingName);
        updatedMeeting.status = MeetingStatus.Started;
        updatedMeeting.lastUpdatedUnix = Date.now();
        return updatedMeeting;
    }

    finishMeeting(meetingName: String): IMeeting {
        if (!this.meetingMap.has(meetingName)) {
            return;
        }

        let updatedMeeting = this.meetingMap.get(meetingName);
        updatedMeeting.status = MeetingStatus.Finished;
        updatedMeeting.lastUpdatedUnix = Date.now();
        return updatedMeeting;
    }
}
