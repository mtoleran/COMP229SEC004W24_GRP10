import React, { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

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
import { getUsersByUsertype } from "./../user/api-user";

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
  datePickerField: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  customDatePicker: {
    width: "363px",
    height: "25px",
    border: "none",
    borderBottom: "1px solid #bdbdbd",
    borderRadius: "0px", 
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    fontSize: "16px",
    marginLeft:"-2px",
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
    date: "Select Date",
    time: "Select Time",
    procedure: "",
    dentist: "Select Doctor",
  });
  const [open, setOpen] = useState(false);
  const [dentists, setDentists] = useState([]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clickSubmit = async () => {
    const formattedDate = selectedDate.toLocaleDateString("en-US");
  
    const appointment = {
      firstName: values.firstName || undefined,
      lastName: values.lastName || undefined,
      date: formattedDate,
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

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  AddAppointment.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await getUsersByUsertype("dentist");
        setDentists(response); 
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchDentists();
  }, []);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

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

<DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/YYYY"
            id="date"
            label="Date"
            minDate={tomorrow}
            value={selectedDate}
            margin="normal"
            placeholderText="Select Date"
            className={`${classes.datePickerField} ${classes.customDatePicker}`}
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
          
          <Select
            id="dentist"
            label="Dentist"
            value={values.dentist}
            onChange={handleChange("dentist")}
            className={classes.selectField}
            margin="normal"
            renderValue={(selected) => (
              <ListItemText
                primary={selected}
                style={{
                  color: selected === "Select Doctor" ? "#757575" : "#000000",
                  textAlign: "left",
                }}
              />
            )}
          >
            {dentists.map((dentist) => (
              <MenuItem key={dentist._id} value={`${dentist.firstName} ${dentist.lastName}`}>
                {dentist.firstName} {dentist.lastName}
              </MenuItem>
            ))}
          </Select>
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
          <Link to="/appointments">
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
