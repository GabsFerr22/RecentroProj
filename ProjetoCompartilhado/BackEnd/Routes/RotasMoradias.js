import express from "express";
import { addUser, deleteUser, getUsers, updateUser, getCoordinates } from "../controllers/Moradias.js";

const router = express.Router()

router.get("/", getUsers)

router.post("/", addUser)

router.put("/:idpredio", updateUser)

router.delete("/:idpredio", deleteUser)

router.get("/api/coordinates", getCoordinates)

export default router