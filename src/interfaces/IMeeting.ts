import { ITopic } from "./ITopic";

export enum MeetingStatus {
    NotStarted,
    Started,
    Finished
}
export interface IMeeting {
    meetingId: String;
    createdDateUnix: Number;
    meetingInputDTO: IMeetingInputDTO;

    meetingTopicsList: ITopic[];
    meetingTopicsMap: Map<String, ITopic>;
    totalDuration: number;
    progress: number;

    lastUpdatedUnix: Number;
    status: MeetingStatus;
    isFinished: Boolean;
}

export interface IMeetingInputDTO {
    meetingName: String;
}
