import { Router } from "express";
import { Character } from "../entities/Character";

const routes = Router();

routes.param("id", (req: any, _res, next, id: number) => {
    req.id = id;
    next();
});

routes.get("/", async (_req, res) => {
    const result = await Character.find();

    res.status(200);
    res.send(result);
});

routes.put("/:id", async (req: any, res) => {
    const result = await Character.update({id: req.id}, req.body);

    res.status(200);
    res.send(result);
});

routes.post("/", async (req, res) => {
    const result = await Character.create({name: req.body.name, account: req.body.account}).save();

    res.status(200);
    res.send(result);
});

export default routes;