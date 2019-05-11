import mongoose from 'mongoose'
import { strict } from 'assert';

const DataSchema = new mongoose.Schema(
    {
        _id: String,
        type: String,
        isAccepted: {
            type: Boolean,
            default: false,
        },
        maxLength: {
            type: Number,
            default: 0,
        },
        originalText: String,
        bestTranslate: {
            type: String,
            default: '',
        },
        translatedText: [{
            text: String,
            registerTime: {
                type: Date,
                default: Date.now,
            },
            isAccepted: {
                type: Boolean,
                default: false,
            },
        }],
        registerTime: {
            type: Date,
            default: Date.now,
        },
        relatedText: [{
            _id: String,
        }],
    })

export const Data = mongoose.model('Data', DataSchema)