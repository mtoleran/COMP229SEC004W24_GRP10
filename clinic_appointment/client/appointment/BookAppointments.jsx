/**import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
//import { list } from './api-appointment.js'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
//import Person from '@material-ui/core/Person'
//import ArrowForward from '@material-ui/core/ArrowForward'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
//import ArrowForward from '@material-ui/core/ArrowForward'
import ArrowForward from '@material-ui/icons/ArrowForward';
import unicornbikeImg from './../assets/images/dentalclinic.jpg'

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
    },
    root: {
        // Define your root styles here
    },
}));

 * FROM MANU
 * 
 * //TO MODIFY LATER
export default function Users() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        list(signal).then((data) => {
            console.log(data)
            if (data && data.error) {
                console.log(data.error)
            } else {
                console.log(data)
                setUsers(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [])

    const classes = useStyles()
    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                All Users
            </Typography>
            <List dense>
                {users.map((item, i) => {
                    return <Link component={RouterLink} to={"/user/" + item._id} key={i}>

                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.name} />
                            <ListItemSecondaryAction>
                                <IconButton>
                                    <ArrowForward />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Link>
                })}
            </List>
        </Paper>
    )
}

 */

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Select,
  MenuItem,
  ListItemText,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { create } from "./api-appointment";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    margin: "0 auto",
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    textAlign: "center",
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  selectField:{
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  error: {
    color: "red",
  },
  submit: {
    margin: "0 auto",
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: 18,
  },
}));

export default function AddAppointment() {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    date: "",
    time: "Select Time",
    procedure: "",
    dentist: "",
  });
  const [open, setOpen] = useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clickSubmit = async () => {
    const appointment = {
      firstName: values.firstName || undefined,
      lastName: values.lastName || undefined,
      date: values.date || undefined,
      time: values.time || undefined,
      procedure: values.procedure || undefined,
      dentist: values.dentist || undefined,
    };
    create(appointment).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setOpen(true);
      }
    });
  };

  AddAppointment.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign Up for Appointment
          </Typography>

          <TextField
            id="firstName"
            label="First Name"
            className={classes.textField}
            value={values.firstName}
            onChange={handleChange("firstName")}
            margin="normal"
          />
          <TextField
            id="lastName"
            label="Last Name"
            className={classes.textField}
            value={values.lastName}
            onChange={handleChange("lastName")}
            margin="normal"
          />
          <TextField
            id="date"
            label="Date"
            className={classes.textField}
            value={values.date}
            onChange={handleChange("date")}
            margin="normal"
          />
          <Select
            id="time"
            label="Time"
            value={values.time}
            onChange={handleChange("time")}
            className={classes.selectField}
            margin="normal"
            renderValue={(selected) => (
              <ListItemText
                primary={selected}
                style={{
                  color: selected === "Select Time" ? "#757575" : "#000000",
                  textAlign: "left",
                }}
              />
            )}
          >
            <MenuItem value="Select Time" disabled>
              Select Time
            </MenuItem>
            <MenuItem value="09:00 AM">09:00 AM</MenuItem>
            <MenuItem value="10:00 AM">10:00 AM</MenuItem>
            <MenuItem value="11:00 AM">11:00 AM</MenuItem>
            <MenuItem value="12:00 PM">12:00 PM</MenuItem>
            <MenuItem value="01:00 PM">01:00 PM</MenuItem>
            <MenuItem value="02:00 PM">02:00 PM</MenuItem>
            <MenuItem value="03:00 PM">03:00 PM</MenuItem>
            <MenuItem value="04:00 PM">04:00 PM</MenuItem>
            <MenuItem value="05:00 PM">05:00 PM</MenuItem>
          </Select>
          <TextField
            id="procedure"
            label="Procedure"
            className={classes.textField}
            value={values.procedure}
            onChange={handleChange("procedure")}
            margin="normal"
          />
          <TextField
            id="dentist"
            label="Dentist"
            className={classes.textField}
            value={values.dentist}
            onChange={handleChange("dentist")}
            margin="normal"
          />
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Appointment successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button
              color="primary"
              autoFocus
              variant="contained"
              onClick={handleClose}
            >
              Close
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
