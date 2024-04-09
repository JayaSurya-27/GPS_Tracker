import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from "@material-ui/core";
//import BusLogo from "./bus-logo.png"; // import your bus tracking logo

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  logo: {
    maxWidth: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  select: {
    minWidth: 200,
  },
  button: {
    minWidth: 200,
    fontSize: "1.5rem",
    padding: "0rem",
  },
}));

const API_END_POINT = process.env.API_END_POINT || "http://localhost:8000/";

const Home = ({ data, setData }) => {
  const classes = useStyles();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (from === to) {
      setError("From and To cannot be the same");
      return;
    }

    if (!from || !to) {
      setError("From and To are required");
      return;
    }

    const data = {
      bus_id: 2,
      day_id: 1,
      from_location: from,
      to_location: to,
    };

    const url = `${API_END_POINT}apis/get_schedule/`;
    console.log("url:", url);
    axios
      .post(url, data)
      .then((response) => {
        console.log("Response:", response.data);
        setData(response.data.data[0]);
        navigate("/map");
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  const fromOptions = ["clt", "bhoopali", "hostel pc"];

  const toOptions = ["clt", "bhoopali", "hostel pc"];

  return (
    <div className={classes.root}>
      {/* <img src={BusLogo} alt="Bus Tracking" className={classes.logo} /> */}
      <Grid container justify="center">
        <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="from-label">From</InputLabel>
              <Select
                labelId="from-label"
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                label="From"
                className={classes.select}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {fromOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="to-label">To</InputLabel>
              <Select
                labelId="to-label"
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                label="To"
                className={classes.select}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {toOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {error && <Typography style={{ color: "red" }}>{error}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default Home;
