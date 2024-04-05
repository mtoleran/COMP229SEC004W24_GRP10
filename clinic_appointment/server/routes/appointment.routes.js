import express from 'express'
import appointmentCtrl from '../controllers/appointment.controller.js';
import authCtrl from "../controllers/auth.controller.js"

const router = express.Router()

router.route('/api/appointments').post(appointmentCtrl.create)
router.route('/api/appointments').get(appointmentCtrl.list)
router.route('/api/appointments/:id').put(authCtrl.requireSignin, appointmentCtrl.updateAppointmentById)
router.route('/api/appointments/:id').delete(authCtrl.requireSignin, appointmentCtrl.deleteAppointmentById)

router.route('/api/appointments/:id').put(appointmentCtrl.updateAppointmentById)
router.route('/api/appointments/:id').delete(appointmentCtrl.deleteAppointmentById)

export default router
