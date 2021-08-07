import { Router } from "express";
import MeetingService from "../../services/meeting";
import { StatusCodes } from "http-status-codes";
import { Container } from "typedi";
import { celebrate, Joi, Segments } from "celebrate";
import logger from "../../loaders/logger";
import { IMeetingInputDTO } from "../../interfaces/IMeeting";
import { ITopicInputDTO } from "../../interfaces/ITopic";

const route = Router();

export default (app: Router) => {
    app.use("/meetings", route);

    route.get(
        "/",
        // Use next() if you want extra handlers to run after this one is (reached and) finished
        (req, res, next) => {
            logger.debug(`Reading all meetings`);
            try {
                const meetingService = Container.get(MeetingService);
                const allMeetings = meetingService.getAllMeetings();
                res.json({ meetingList: allMeetings }).status(StatusCodes.OK);
            } catch (e) {
                logger.error(`Failed reading all meetings: ${e}`);
            }
        }
    );

    route.get("/:meetingName", (req, res, next) => {
        logger.debug(`Reading meeting ${req.params.meetingName}`);
        try {
            const meetingService = Container.get(MeetingService);
            const requestedMeeting = meetingService.getMeeting(req.params.meetingName);
            if (requestedMeeting) {
                res.json({ meeting: requestedMeeting }).status(StatusCodes.OK);
            } else {
                res.send(`No meeting found`).status(StatusCodes.NOT_FOUND);
            }
        } catch (e) {
            logger.error(`Failed reading meeting ${req.params.meetingName}: ${e}`);
        }
    });

    route.post(
        "/addmeeting",
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                meetingName: Joi.string().required()
            })
        }),
        (req, res, next) => {
            logger.debug(`Adding meeting`);
            try {
                const meetingInputDTO = req.body as IMeetingInputDTO;
                if (meetingInputDTO) {
                    const meetingService = Container.get(MeetingService);
                    meetingService.addMeeting(meetingInputDTO);
                    res.send(`Meeting created`).status(StatusCodes.CREATED);
                } else {
                    res.send(`Could not interpret request body`).status(StatusCodes.BAD_REQUEST);
                }
            } catch (e) {
                logger.error(`Failed adding meeting: ${e}`);
            }
        }
    );

    route.put("/updatetopic", (req, res, next) => {
        logger.debug("Updating meeting topic");
        try {
            const topicInputDTO = req.body as ITopicInputDTO;
            if (topicInputDTO) {
                const meetingService = Container.get(MeetingService);
                meetingService.updateMeeting(topicInputDTO);
                res.send(`Meeting topic updated`).status(StatusCodes.OK);
            } else {
                res.send(`Could not interpret request body`).status(StatusCodes.BAD_REQUEST);
            }
        } catch (e) {
            logger.error(`Failed updating meeting topic: ${e}`);
        }
    });

    route.post(
        "/addtopic",
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                meetingName: Joi.string().required(),
                topicName: Joi.string().required(),
                duration: Joi.number().required()
            })
        }),
        (req, res, next) => {
            logger.debug("Adding meeting topic");
            try {
                const topicInputDTO = req.body as ITopicInputDTO;
                if (topicInputDTO) {
                    const meetingService = Container.get(MeetingService);
                    meetingService.addMeetingTopic(topicInputDTO);
                    res.send(`Meeting topic added`).status(StatusCodes.CREATED);
                } else {
                    res.send(`Could not interpret request body`).status(StatusCodes.BAD_REQUEST);
                }
            } catch (e) {
                logger.error(`Failed adding meeting topic: ${e}`);
            }
        }
    );

    route.get("/:meetingName/start", (req, res, next) => {
        logger.debug(`Starting meeting ${req.params.meetingName}`);
        try {
            const meetingService = Container.get(MeetingService);
            const requestedMeeting = meetingService.startMeeting(req.params.meetingName);
            if (requestedMeeting) {
                res.json({ meeting: requestedMeeting }).status(StatusCodes.OK);
            } else {
                res.send(`No meeting found`).status(StatusCodes.NOT_FOUND);
            }
        } catch (e) {
            logger.error(`Failed starting meeting ${req.params.meetingName}: ${e}`);
        }
    });

    route.get("/:meetingName/finish", (req, res, next) => {
        logger.debug(`Finishing meeting ${req.params.meetingName}`);
        try {
            const meetingService = Container.get(MeetingService);
            const requestedMeeting = meetingService.finishMeeting(req.params.meetingName);
            if (requestedMeeting) {
                res.json({ meeting: requestedMeeting }).status(StatusCodes.OK);
            } else {
                res.send(`No meeting found`).status(StatusCodes.NOT_FOUND);
            }
        } catch (e) {
            logger.error(`Failed finishing meeting ${req.params.meetingName}: ${e}`);
        }
    });
};
