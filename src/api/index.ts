import { Router } from "express";
import auth from "./routes/auth";
import user from "./routes/user";
import agendash from "./routes/agendash";
import meeting from "./routes/meeting";

export default () => {
    const app = Router();
    // auth(app);
    // user(app);
    // agendash(app);
    meeting(app);

    return app;
};
