import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './core/Home'
import Appointments from './appointment/BookAppointments.jsx'
import Menu from './core/Menu'
import AppointmentLanding from './appointment/AppointmentLanding.jsx'

function MainRouter() {
    return (
        <div>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/appointments" element={<AppointmentLanding />} />
                <Route path="/add-appointment" element={<Appointments />} />
            </Routes>
        </div>
    );
}

export default MainRouter
