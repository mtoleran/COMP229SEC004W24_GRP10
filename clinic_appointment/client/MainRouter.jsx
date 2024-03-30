import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './core/Home'
import Menu from './core/Menu'
import Signup from "./user/Signup.jsx";
import Signin from './signin/Signin.jsx'
import PrivateRoute from './signin/PrivateRoute.jsx'
import BookAppointments from './appointment/BookAppointments.jsx'
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
                            <BookAppointments />
                        </PrivateRoute>
                    }
                />
                {/* Add Route for Book Appointments Page */}
                <Route path="/book-appointments" element={<BookAppointments />} />
            </Routes>
        </div>
    );
}

export default MainRouter
