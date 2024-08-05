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
        type: Date,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    passengersNumber: {
        type: Number,
        required: true,
        min:[2, 'The number of passengers must be greater than 1']
    }
})  

// //change Date format to  
// function formatDate(date: Date): string {
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
// }

// tripSchema.pre('save', function (next) {
//     const trip = this;
//     if (trip.isModified('startingDate')) {
//         const date = new Date(trip.startingDate);
//         const formattedDate = formatDate(date);
//         trip.startingDate = formattedDate;
//     }
//     next();
// });
export const Trip = mongoose.model('Trip', tripSchema);
