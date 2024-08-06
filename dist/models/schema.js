"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const tripSchema = new mongoose_1.Schema({
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
            validator: function (val) {
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
exports.Trip = mongoose_1.default.model('Trip', tripSchema);
