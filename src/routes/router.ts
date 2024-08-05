import express, { Router } from "express";
import { Trip } from '../models/schema';
import { APIFeatures } from "../utils/apiFeatures";
const router = Router();

router.get('/trips', async (req, res) => {
    const features = new APIFeatures(Trip.find(), req.query)
        .paginate()
        .sort()
        .filter();
    const trips = await features.query;
    try {
        res.status(200).json({
            status: 'success',
            results: trips.length,
            data: {
                trips
            }
        }); 
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
    
})

router.post('/trips/create', async (req, res) => {
    try {
        const newTrip = await Trip.create(req.body);

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
})

export default router;