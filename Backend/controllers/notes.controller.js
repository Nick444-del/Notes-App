
import notesModel from "../models/notes.model";

export const createNote = async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if(!title){
        return res.status(400).json({
            error: true,
            message: "Title is required"
        })
    }

    if(!content){
        return res.status(400).json({
            error: true,
            message: "Content is required"
        })
    }

    try{
        const note = new notesModel({
            title,
            content,
            tags: tags || [],
            userId: user._id
        })

        await note.save();
        return res.json({
            error: false,
            note,
            message: "Note saved successfully"
        })
    }catch(err){
        return res.status(400).json({
            error: true,
            message: err.message
        })
    }
}

export const getNotes = async (req, res) => {
    try {
        const data = await notesModel.find();

        return res.status(200).json({
            data: data,
            message: "Notes fetched successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const deleteNotes = async (req, res) => {
    try {
        const { id } = req.params.id;
        const data = await notesModel.deleteOne(id);
        return res.status(200).json({
            data: data,
            message: "Note deleted successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const updateNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, tags } = req.body;
        const data = await notesModel.updateOne({_id: id}, {title: title, content: content, tags: tags});
        return res.status(200).json({
            data: data,
            message: "Note updated successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const getAllNotes = async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await notesModel.find({ userid: user._id }).sort({ isPinned: -1 })

        return res.json({
            error: false,
            notes,
            message: "All notes fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
}