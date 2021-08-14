export interface ITopic {
    topicId: String;
    createdDateUnix: Number;
    lastUpdatedUnix: Number;
    topicInputDTO: ITopicInputDTO;
}

export interface ITopicInputDTO {
    meetingName: String;
    topicName: String;
    duration: number;
    isFinished: Boolean;
    topicDescription: String;
}
