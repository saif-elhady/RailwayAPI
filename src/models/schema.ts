import mongoose, { Schema } from "mongoose";

const tripSchema = new Schema({
    departurePlace: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    startingDate: {
        type: Date,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    passengersNumber: {
        type: Number,
        required: true
    }
})

export const Trip = mongoose.model('Trip', tripSchema);
