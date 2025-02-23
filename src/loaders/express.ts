import express from "express";
import cors from "cors";
import { OpticMiddleware } from "@useoptic/express-middleware";
import routes from "../api";
import config from "../config";
export default ({ app }: { app: express.Application }) => {
    //https://microservices.io/patterns/observability/health-check-api.html
    app.get("/status", (req, res) => {
        res.status(200).end();
    });
    app.head("/status", (req, res) => {
        res.status(200).end();
    });

    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    //app.enable("trust proxy");

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Middleware that transforms the raw string of req.body into json
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // Load API routes
    app.use(config.api.prefix, routes());

    // API Documentation
    app.use(
        OpticMiddleware({
            enabled: process.env.NODE_ENV !== "production"
        })
    );

    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error("Not Found");
        err["status"] = 404;
        next(err);
    });

    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === "UnauthorizedError") {
            return res.status(err.status).send({ message: err.message }).end();
        }
        return next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message
            }
        });
    });
};
