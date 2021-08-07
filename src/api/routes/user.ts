import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
const route = Router();

// route is going to be a subrouter for user routes
export default (app: Router) => {
    app.use("/users", route);

    // route.get("/me", middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    //     return res.json({ user: req.currentUser }).status(200);
    // });
};
