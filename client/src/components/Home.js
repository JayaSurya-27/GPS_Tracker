import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const Home = () => {
  const classes = useStyles();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (from === to) {
      setError("From and To cannot be the same");
      return;
    }

    // Here you can place your API call logic
    try {
      // API call logic
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
                <MenuItem value="clt">CLT</MenuItem>
                <MenuItem value="bhooopali">Bhooopali</MenuItem>
                <MenuItem value="hostel pc">Hostel PC</MenuItem>
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
                <MenuItem value="clt">CLT</MenuItem>
                <MenuItem value="bhooopali">Bhooopali</MenuItem>
                <MenuItem value="hostel pc">Hostel PC</MenuItem>
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
