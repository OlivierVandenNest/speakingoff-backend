import { Router } from "express";
import basicAuth from "express-basic-auth";
import agendash from "agendash";
import { Container } from "typedi";
import config from "../../config";

export default (app: Router) => {
    const agendaInstance = Container.get("agendaInstance");

    app.use(
        "/dash",
        basicAuth({
            // https://www.npmjs.com/package/express-basic-auth@
            users: {
                agendashuser: "iwanttoschedulejobsviaadashboard",
                [config.agendash.user]: config.agendash.password
            },
            challenge: true
        }),
        // Agendash = dashboard for agenda
        // Agenda = package to schedule jobs
        // Use cases: send (periodic) emails to clients or backup database
        // However we cannot use agendash
        // Because this job scheduling tool is completely built for MongoDB
        // We most likely need a structured database
        // For example, PostgreSQL: https://severalnines.com/database-blog/overview-job-scheduling-tools-postgresql
        agendash(agendaInstance)
    );
};
