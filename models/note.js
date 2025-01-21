import mongoose, { mongo } from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            ref: 'User'
        },
        dateCreated: {
            type: Date,
            default: Date.now
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
        },
        tags: {
            type: [String],
            trim: true,
        },
        content: {
            type: String,
            required: true,
        }

    }
);


const Note = mongoose.model('Note', noteSchema);

export default Note; 