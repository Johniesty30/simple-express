// src/controller/noteController.js

import Note from "../models/note.js"; 

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({});
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil catatan", error: error.message });
    }
};

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Judul dan konten harus diisi" });
        }
        const newNote = new Note({ title, content });
        const savedNote = await newNote.save();
        res.status(201).json({ message: "Catatan berhasil dibuat", note: savedNote });
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat catatan", error: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true, runValidators: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: `Catatan dengan ID ${id} tidak ditemukan` });
        }
        res.status(200).json({ message: `Catatan dengan ID ${id} berhasil diperbarui`, note: updatedNote });
    } catch (error) {
        res.status(500).json({ message: "Gagal memperbarui catatan", error: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: `Catatan dengan ID ${id} tidak ditemukan` });
        }
        res.status(200).json({ message: `Catatan dengan ID ${id} berhasil dihapus` });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus catatan", error: error.message });
    }
};