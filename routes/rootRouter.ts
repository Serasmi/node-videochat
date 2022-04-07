import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("App is working");
});

export default router;
