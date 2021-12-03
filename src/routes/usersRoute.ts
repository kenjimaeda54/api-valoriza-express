import { Router } from "express";

const useRoute = Router();

useRoute.get("/", (req, res) => {
  res.send("Hello World");
});

export default useRoute;
