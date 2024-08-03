"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schema_1 = require("../models/schema");
const router = (0, express_1.Router)();
router.get('/trips', async (req, res) => {
    try {
        const trips = await schema_1.Trip.find();
        res.send(trips);
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});
router.post('/trips/create', async (req, res) => {
    try {
        const newTrip = await schema_1.Trip.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                Trip: newTrip
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});
