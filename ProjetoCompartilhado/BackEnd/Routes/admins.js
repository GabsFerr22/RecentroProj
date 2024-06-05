import express from "express";
import { postUsers, getUsers } from "../controllers/LoginAdmin.js";
import autenticacaoJWT from "../Middleware/Autenticacao.js";

const router = express.Router();

router.post("/login", postUsers);
router.get("/users", autenticacaoJWT, getUsers);

export default router;
