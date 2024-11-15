import express from "express";

import { createNote, getNotes, deleteNotes, updateNotes, getAllNotes } from "../controllers/notes.controller";
import { auth, isAdmin, authenticateToken } from "../middleware/tokens";

const router = express.Router();

router.post("/createnote", authenticateToken, createNote);
router.get("/getallnotes", getNotes);
router.delete("/deletenotes/:id", deleteNotes);
router.put("/updatenotes/:id", updateNotes);
router.get("/getallnotes", getAllNotes);

export default router;