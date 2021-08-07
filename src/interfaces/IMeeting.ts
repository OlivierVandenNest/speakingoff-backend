import { ITopic } from "./ITopic";

export interface IMeeting {
    meetingId: String;
    createdDateUnix: Number;
    meetingInputDTO: IMeetingInputDTO;

    meetingTopicsList: ITopic[];
    meetingTopicsMap: Map<String, ITopic>;
    totalDuration: number;
    progress: number;

    lastUpdatedUnix: Number;
    isFinished: Boolean;
}

export interface IMeetingInputDTO {
    meetingName: String;
}
