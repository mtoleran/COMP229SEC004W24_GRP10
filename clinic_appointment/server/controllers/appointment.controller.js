import Appointment from '../models/appointment.model.js';
import errorHandler from './error.controller.js';

const create = async (req, res) => { 
    const appointment = new Appointment(req.body); 
    try {
        await appointment.save();
        return res.status(200).json({ 
            message: "Successfully Added!",
            appointment: appointment
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        });
    } 
};

const list = async (req, res) => { 
    try {
        let appointment = await Appointment.find().select('firstName lastName date time procedure dentist status'); 
        res.json(appointment);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        });
    } 
};

export default { create, list };
