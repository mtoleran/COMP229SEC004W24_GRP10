import express from 'express'
import appointmentCtrl from '../controllers/appointment.controller.js';

// import userCtrl from '../controllers/user.controller.js' 
// import authCtrl from '../controllers/auth.controller'
 //import authCtrl from '../controllers/auth.controller.js'

 const router = express.Router()
 router.route('/api/appointments').post(appointmentCtrl.create)
 router.route('/api/schedule').get(appointmentCtrl.list);
 router.route('/api/appointments/:id').delete(appointmentCtrl.deleteAppointmentById);
 router.route('/api/appointments/:id').put(appointmentCtrl.updateAppointmentById)
//  router.route('/api/users').post(userCtrl.create)
//  router.route('/api/users').get(userCtrl.list)
//  router.route('/api/users/:userId')
// .get(authCtrl.requireSignin, userCtrl.read)
// .put(authCtrl.requireSignin, authCtrl.hasAuthorization, 
// userCtrl.update)
// .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, 
// userCtrl.remove)
// router.param('userId', userCtrl.userByID)
//  router.route('/api/users/:userId').get(userCtrl.read)
//  router.route('/api/users/:userId').put(userCtrl.update)
//  router.route('/api/users/:userId').delete(userCtrl.remove)

 export default router
