import express from "express";
import { addLocations, deleteLocations, getLocations, updateLocations, getCoordinates } from "../controllers/Moradias.js";

const router = express.Router()

router.get("/", getLocations)

router.post("/", addLocations)

router.put("/:idpredio", updateLocations)

router.delete("/:idpredio", deleteLocations)

router.get("/api/coordinates", getCoordinates)

export default router