import mongoose, { Schema } from "mongoose";

export interface ITrip extends Document {
    departurePlace: string;
    destination: string;
    startingDate: Date;
    duration: String;
    passengersNumber: number;
}

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
        type: String,
        required: true,
        validate: {
            validator: function (val: string) {
                const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
                return regex.test(val);
            },
            message: 'Date must be in dd/mm/yyyy format!'
        }
    },
    duration: {
        type: String,
        required: true
    },
    passengersNumber: {
        type: Number,
        required: true,
        min: [2, 'The number of passengers must be greater than 1']
    }
}, { timestamps: true });  

export const Trip = mongoose.model('Trip', tripSchema);
