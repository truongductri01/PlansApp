import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Todo from "./todo/Todo";
import Search from "./search/Search";
import { Button } from "@material-ui/core";
import * as firebase from "firebase";
import { useHistory } from "react-router";
import Friends from "./friends/Friends";
import Header from "./Header";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logOut: {
    margin: "auto 5px auto auto",
    width: "10rem",
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const logOut = () => {
    firebase.auth().signOut();
    props.setUid(undefined);
    history.push("/");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Search Friends" {...a11yProps(1)} />
          <Tab label="Friends" {...a11yProps(2)} />
          <Button
            variant="contained"
            color="secondary"
            onClick={logOut}
            className={classes.logOut}
          >
            Log out
          </Button>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className="fade-in">
        <Header uid={props.uid} userName={props.userName} />
        <Todo uid={props.uid} userName={props.userName} />
      </TabPanel>
      <TabPanel value={value} index={1} className="fade-in">
        <Search uid={props.uid} userName={props.userName} />
      </TabPanel>
      <TabPanel value={value} index={2} className="fade-in">
        <Friends uid={props.uid} userName={props.userName} />
      </TabPanel>
    </div>
  );
}
