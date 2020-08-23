import { Router } from "express";
import jwt from "jsonwebtoken";
import { PlayerModel } from "../models";
import Exception from "./exception";
import { showMessage } from "./showMessage";

const publicRouter = Router();
publicRouter.get("/", (_, res) => res.redirect("graphql"));

publicRouter.get("/accountVerification/:token", (req, res) => {
  const { token } = req.params;
  const defaultError = new Exception("Utilisateur introuvable.");
  const payload = jwt.verify(token, process.env.JWT_SECRET) as any;
  if (!payload.id) return res.status(defaultError.code).send(defaultError.message);
  PlayerModel.findById(payload.id, (err, player) => {
    if (err || !player) res.status(defaultError.code).send(defaultError);
    else if (player.emailVerified) {
      defaultError.message = "Votre e-mail a déjà été vérifié.";
      res.status(defaultError.code).send(defaultError.message);
    } else {
      player.emailVerified = true;
      player.save((error, updatedPlayer) => {
        if (error || !updatedPlayer) return res.status(defaultError.code).send(defaultError.message);

        const fullName = updatedPlayer.firstName + " " + updatedPlayer.lastName;
        const message = "Votre email a été vérifié.";
        return res.status(200).send(showMessage({ fullName, message }));
      });
    }
  }).catch(() => res.status(defaultError.code).send(defaultError.message));
});

export default publicRouter;
