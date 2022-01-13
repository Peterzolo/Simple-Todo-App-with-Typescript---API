"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TodoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    isComplete: {
        type: String,
        enum: ['completed', 'non-completed'],
        default: 'non-completed',
        required: true
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Todo', TodoSchema);
