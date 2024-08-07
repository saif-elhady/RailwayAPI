"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schema_1 = require("../models/schema");
const apiFeatures_1 = require("../utils/apiFeatures");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
const isValidDate = (value) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(value)) {
        throw new Error('Date must be in dd/mm/yyyy format');
    }
    return true;
};
router.get('/trips', [
    (0, express_validator_1.check)('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    (0, express_validator_1.check)('limit').optional().isInt({ min: 1 }).withMessage('limit must be a positive integer'),
    (0, express_validator_1.check)('sort').optional().isString().withMessage('sort must be a string'),
    (0, express_validator_1.check)('date_from').optional().custom(isValidDate).withMessage('Date from must be in dd/mm/yyyy format'),
    (0, express_validator_1.check)('date_till').optional().custom(isValidDate).withMessage('Date till must be in dd/mm/yyyy format')
], async (req, res) => {
    const features = new apiFeatures_1.APIFeatures(schema_1.Trip.find(), req.query)
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
exports.default = router;
