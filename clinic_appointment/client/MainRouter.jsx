import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './core/Home'
import Appointments from './appointment/BookAppointments.jsx'
import Menu from './core/Menu'
import AppointmentLanding from './appointment/AppointmentLanding.jsx'
<<<<<<< HEAD
import Signup from "./user/Signup.jsx";
=======
import ViewAppointments from './appointment/ViewAppointments.jsx'

>>>>>>> f4b413d6413a92afb305d3dee1a8b907d171c7fe
function MainRouter() {
    return (
        <div>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/appointments" element={<AppointmentLanding />} />
                <Route path="/add-appointment" element={<Appointments />} />
<<<<<<< HEAD
                <Route path="/signup" element={<Signup />} />
=======
                <Route path="/schedule" element={<ViewAppointments/>}/>
>>>>>>> f4b413d6413a92afb305d3dee1a8b907d171c7fe
            </Routes>
        </div>
    );
}

export default MainRouter
