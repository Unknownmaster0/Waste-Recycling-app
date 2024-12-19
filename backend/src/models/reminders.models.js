import mongoose, { mongo, Mongoose } from "mongoose";
import User from "./user.models";

const ReminderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    message: {
        type: String,
    },
    reminder_date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'closed'],
        default: 'active',
        required: true,
    }
}, {timestamps: true});

const Reminder = mongoose.model('Reminder', ReminderSchema);
export default Reminder;