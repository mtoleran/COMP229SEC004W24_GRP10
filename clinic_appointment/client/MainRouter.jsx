import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './core/Home'
import Menu from './core/Menu'
import Signup from "./user/Signup.jsx";
import Signin from './signin/Signin.jsx'
import PrivateRoute from './signin/PrivateRoute.jsx'
import Appointments from './appointment/BookAppointments.jsx'
import AppointmentLanding from './appointment/AppointmentLanding.jsx'
import ViewAppointment from "./appointment/ViewAppointments.jsx"


function MainRouter() {
    return (
        <div>
            <Menu />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/appointments" element={<AppointmentLanding />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route
                    path="/schedule"
                    element={
                        <PrivateRoute>
                            <ViewAppointment />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/add-appointment"
                    element={
                        <PrivateRoute>
                            <Appointments />
                        </PrivateRoute>
                    }
                />
                {/* <Route path="/add-appointment" element={<Appointments />} /> */}
                {/* <Route path="/schedule" element={<ViewAppointment />} /> */}

            </Routes>
        </div>
    );
}

export default MainRouter
