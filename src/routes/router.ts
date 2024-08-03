import express, { Router } from "express";
import { Trip } from '../models/schema';

const router = Router();

router.get('/trips',  async (req, res) => {
    try {
        const trips = await Trip.find();
        res.send(trips);
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