import express, { Router } from "express";
import { Trip } from '../models/schema';
import { APIFeatures } from "../utils/apiFeatures";
import { check, validationResult } from "express-validator";
const router = Router();

const isValidDate = (value: string) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(value)) {
        throw new Error('Date must be in dd/mm/yyyy format');
    }
    return true;
};

router.get('/trips', [
    check('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    check('limit').optional().isInt({ min: 1 }).withMessage('limit must be a positive integer'),
    check('sort').optional().isString().withMessage('sort must be a string'),
    check('date_from').optional().custom(isValidDate).withMessage('Date from must be in dd/mm/yyyy format'),
    check('date_till').optional().custom(isValidDate).withMessage('Date till must be in dd/mm/yyyy format')
],  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'fail', errors: errors.array() });
    }
    const features = new APIFeatures(Trip.find(), req.query)
        .paginate()
        .sort()
        .filter()
        .filterByDate();
    const trips = await features.query;
    try {
        console.log(req.body)
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