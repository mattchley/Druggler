import Modal from "../components/DrugModal";
import ActiveDrugs from "./ActiveDrugs";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import API from "../utils/API";
import Auth from "../utils/Auth";
import { Table, TableBody, TableRow } from "material-ui/Table";
import TableCell from "@material-ui/core/TableCell";
import { motion } from 'framer-motion';


const moment = require("moment");

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  addDrug: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    // backgroundColor: theme.palette.text.hint,
    backgroundColor: "seagreen",
    color: "white",
    fontWeight: "900",
    align: "left",
    overflow: "auto",
    fontFamily: "Comic Sans MS, Comic Sans, cursive"
  },
  title: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#23395d",
    color: "white",
    fontWeight: "800",
    fontSize: "30px",
    fontFamily: "Constantia",
  },
  titleText: {
    textAlign: "center",
    color: "white",
    fontWeight: "800",
    fontSize: "30px",
    fontFamily: "Constantia",
  },
  title2: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#23395d",
    color: "white",
    fontWeight: "800",
    fontSize: "30px",
    fontFamily: "Constantia",
    margin: "5%",
    marginBottom: "0"
  },
  title3: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white",
    fontWeight: "800",
    fontSize: "30px",
    fontFamily: "Constantia",
  },
  pillGrid2: {
    textAlign: "left",
    color: "midnightblue",
    fontWeight: "bold",
    fontSize: "14px",
    width: "20%",
  },
  removeCheckbox: {
    displayRowCheckbox: "false"
  },
  modal: {}
}));

export default function AddDrug() {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [drugDetails, setDrugDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [allDrugs, setAllDrugs] = useState([]);
  const [addedDrug, setAddedDrug] = useState("");
  const [drugQuarter, setDrugQuarter] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleTableRowColor = () => {
  //   setTableRowColor("red");
  // }

  useEffect(() => {
    const loadData = async () => {
      let currentUser = await API.dashboard(Auth.getToken());
      setUser(currentUser.data.user);
      console.log(currentUser);
      let currentDrugs = await API.getAllUserDrugs(
        currentUser.data.user._id,
        Auth.getToken()
      );
      console.log(currentDrugs);
      setAllDrugs(currentDrugs.data)
      API.saveDrugtoUser(currentUser.data, Auth.getToken())
        .then(res => console.log(res))
        .catch(err => console.log(err))
      let finalDrugArray = await updatingallDrugs(currentDrugs.data)
      setDrugQuarter(finalDrugArray)
    }

    loadData();
  }, [addedDrug]);




  const handleInputChange = e => {
    const { name, value } = e.target;
    setDrugDetails({ ...drugDetails, [name]: value });
    console.log(drugDetails);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    console.log("Drug Details: ",
      drugDetails.lastTakenDate,
      drugDetails.lastTakenTime,
      drugDetails.frequency
    );
    if (drugDetails.lastTakenDate && drugDetails.frequency && drugDetails.lastTakenTime) {
      console.log("before API front end")
      console.log("current user, ", user._id)

      if (isNaN(drugDetails.frequency)) {
        alert("Must input a number for how often the drug should be taken.");
        return false;
      }

      API.saveDrug(
        {
          name: drugDetails.name,
          lastTakenDate: drugDetails.lastTakenDate,
          lastTakenTime: drugDetails.lastTakenTime,
          frequency: parseInt(drugDetails.frequency),
          user: user._id
        },
        Auth.getToken()
      )
        .then(res => {
          console.log(res);
          setAddedDrug(allDrugs.length + 5);
        })
        .then(res => handleClose())
        // .then(res => handleTableRowColor())
        .catch(err => console.log(err));
    }
  };

  const handleDrugRemove = id => {
    API.removeDrug(id, Auth.getToken())
      .then(res => {
        setAddedDrug(allDrugs.length);
      })
      .catch(err => console.log(err));
  };
  let count = 0

  const handleLastTakenBtn = (id) => {
    let currentTime = moment().format()
    let timeArray = currentTime.split("T");
    let currentDate = timeArray[0]
    let currentTimeArray = timeArray[1].split(":")
    let presentHourMin = `${currentTimeArray[0]}:${currentTimeArray[1]}`
    API.drugTaken(id, {
      lastTakenDate: currentDate,
      lastTakenTime: presentHourMin
    }, Auth.getToken())
      .then(res => {
        setAddedDrug(count++)
      })
      .catch(err => console.log(err))
  }

  //all tracker related functions

  const getDrugTime = async (drugData) => {
    const drugT = await drugData.map(drug => ({
      id: drug._id,
      combinedTime: `${drug.lastTakenDate} ${drug.lastTakenTime}`,
      frequency: parseInt(drug.frequency)
    }))
    console.log(drugT);
    const allFutureDrug = await drugT.map(drug => ({
      id: drug.id,
      prediction: futureTimeCalcuation(drug.combinedTime, drug.frequency)
    }))
    return (allFutureDrug);
  }
  const compareTime = async (drugData) => {
    const currentTime = moment().format('YYYY-MM-DD hh:mm a');
    let myFutureTime = await getDrugTime(drugData);
    console.log("Current time: ", currentTime)
    console.log(myFutureTime);
    let drugQuarter = await myFutureTime.map(drug => {
      let quarterOneMet = moment(currentTime).isBefore(drug.prediction[0])
      let quarterTwoMet = moment(currentTime).isBetween(drug.prediction[0], drug.prediction[1], "minutes", "[)")
      let quarterThreeMet = moment(currentTime).isBetween(drug.prediction[1], drug.prediction[2], "minutes", "[)")
      let quarterFourMet = moment(currentTime).isBetween(drug.prediction[2], drug.prediction[3], "minutes", "[)")
      let timesUp = moment(currentTime).isBetween(drug.prediction[3], currentTime, "minutes", "[]")
      console.log(drug.id)
      console.log("Quarter 1 Met: ", quarterOneMet)
      console.log("Quarter 2 Met: ", quarterTwoMet)
      console.log("Quarter 3 Met: ", quarterThreeMet)
      console.log("Quarter 4 Met: ", quarterFourMet)

      if (quarterOneMet) {
        return "quarterOne"
      } else if (quarterTwoMet) {
        return "quarterTwo"
      } else if (quarterThreeMet) {
        return "quarterThree"
      } else if (quarterFourMet) {
        return "quarterFour"
      } else if (timesUp) {
        return "eatNow"
      }
    })
    return (drugQuarter)

  }
  const updatingallDrugs = async (drugsData) => {
    let finalDrugs = []
    await compareTime(drugsData)
      .then(res => {
        finalDrugs = drugsData.map((drug, index) => ({ ...drug, currentQuarter: res[index] }));
      }).catch(err => console.log(err))
    console.log("FINALLLLL: ", finalDrugs)
    return finalDrugs
  }

  // updatingallDrugs().then(res => console.log(res));

  const futureTimeCalcuation = (initialTime, frequency) => {

    const quarterFreq = hourToMinConverter(frequency / 4);
    console.log(quarterFreq)

    const futurePrediction = []

    let firstQuarter = momentCalculation(initialTime, quarterFreq)
    console.log("First Q: ", typeof firstQuarter)
    futurePrediction.push(firstQuarter)

    let secondQuarter = momentCalculation(firstQuarter, quarterFreq)
    console.log("Added min 2: ", secondQuarter)
    futurePrediction.push(secondQuarter)

    let thirdQuarter = momentCalculation(secondQuarter, quarterFreq)
    console.log("Added min 3: ", thirdQuarter);
    futurePrediction.push(thirdQuarter)
    let takeNow = momentCalculation(thirdQuarter, quarterFreq)
    console.log("Take now: ", takeNow);
    futurePrediction.push(takeNow);
    console.log("Future Prediction :", futurePrediction);

    return futurePrediction;
  }

  const momentCalculation = (time, frequency) => {
    let futureTime = moment(time).add(frequency, "minutes").format('YYYY-MM-DD hh:mm a')
    return futureTime;
  }


  const hourToMinConverter = (hour) => {
    const min = (hour - Math.floor(hour)) * 60;
    const hr = Math.floor(hour) * 60;
    const totalMin = hr + min;
    return totalMin;
  }


  return (
    <div className={classes.root}
      style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Grid container spacing={2} >
        <Grid item xs={12} className={classes.title2} >
          <motion.div
            animate={{
              scale: [1, 1.2, 1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
              loop: Infinity,
              repeatDelay: 0,
            }}
          >
            <p className={classes.titleText}>My Pills Tracker</p>
          </motion.div>

          <Table>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRow>
                  <TableCell className={classes.pillGrid2}>
                    Pill Name
                    </TableCell>
                  <TableCell className={classes.pillGrid2}>
                    Last Date
                    </TableCell>
                  <TableCell className={classes.pillGrid2}>
                    Last Time
                    </TableCell>
                  <TableCell className={classes.pillGrid2}>
                    Frequency (hours)
                    </TableCell>
                  <TableCell className={classes.pillGrid2}>Delete?</TableCell>
                  <TableCell className={classes.pillGrid2}>
                    Take Pill
                    </TableCell>
                </TableRow>
                {drugQuarter.map(drug => (
                  <ActiveDrugs
                    id={drug._id}
                    key={drug._id}
                    name={drug.name}
                    frequency={drug.frequency}
                    lastTakenDate={drug.lastTakenDate}
                    lastTakenTime={drug.lastTakenTime}
                    handleDrugRemove={handleDrugRemove}
                    handleDrugTaken={handleLastTakenBtn}
                    currentQuarter={drug.currentQuarter}
                  />
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={3} className={classes.title3}>
          <Modal
            className={classes.modal}
            name={"Drug 1"}
            user_id={user._id}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            handleOpen={handleOpen}
            handleClose={handleClose}
            open={open}
          />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <div style={{ marginTop: "0px", marginBottom: "40px"}}> </div>
    </div>
  );
}
