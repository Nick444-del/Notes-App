
import notesModel from "../models/notes.model";

export const createNote = async (req, res) => {
    try{
        const { title, content, tags, userId } = req.body;
        const newNote = await notesModel.create({
            title: title,
            content: content,
            tags: tags || [],
            userId: userId
        });

        return res.status(201).json({
            data: newNote,
            message: "Note created successfully",
            success: true
        });
    }catch(err){
        return res.status(500).json({
            message: err.message,
            success: false
        });
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