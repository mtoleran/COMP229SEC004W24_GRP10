import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useNavigate } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import { list } from './api-appointment.js'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward';
import DeleteAppointment from './DeleteAppointment.jsx'
import UpdateButton from './components/UpdateButton.jsx'
import UpdateAppointment from './UpdateAppointment.jsx'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const useStyles = makeStyles(theme => ({
    card: {
        // Define your card styles here
    },
    textField: {
        // Define your text field styles here
    },
    error: {
        // Define your error icon styles here
    },
    submit: {
        // Define your submit button styles here
    },
    title: {
        // Define your title styles here
        fontWeight: 'bold'
    },
    root: {
        // Define your root styles here
        maxWidth: 1250,
        margin: "0 auto",
        marginTop: theme.spacing(3),
    },
}));


export default function ViewAppointments() {
    const [appointments, setList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        list(signal).then((data) => {
            console.log(data)
            if (data && data.error) {
                console.log(data.error)
            } else {
                console.log(data)
                setList(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [])

    const onUpdateAppointment = (appointment) => {
        navigate('/update-appointment', { state: appointment });
    }

    const removeAppointments = (appoint) => {
        const updatedAppointments = [...appointments]
        const index = updatedAppointments.indexOf(appoint)
        updatedAppointments.splice(index, 1)
        setList(updatedAppointments)
    }

    const classes = useStyles()
    return (
        <TableContainer className={classes.root} component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow >
                <TableCell style = {{fontWeight: 'bold',textAlign: 'center'}}>Patient Name</TableCell>
                <TableCell style = {{fontWeight: 'bold',textAlign: 'center'}}>Date & Time</TableCell>
                <TableCell style = {{fontWeight: 'bold',textAlign: 'center'}}>Procedure</TableCell>
                <TableCell style = {{fontWeight: 'bold',textAlign: 'center'}}>Status</TableCell>
                <TableCell align="center"style = {{fontWeight: 'bold',textAlign: 'center'}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((item, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                  {item.firstName + " " + item.lastName}
                  </TableCell>
                  <TableCell align="center">{"Date: " + item.date + " Time: " + item.time}</TableCell>
                  <TableCell align="center">{item.procedure}</TableCell>
                  <TableCell align="center">{item.status}</TableCell>
                  <TableCell align="center">
                    <UpdateButton appointment={item} onUpdateAppointment={onUpdateAppointment} />
                    <DeleteAppointment appointment={item} onRemove={removeAppointments}/>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}
