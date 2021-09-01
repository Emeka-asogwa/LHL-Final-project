import React from "react";
import "./index.css";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  
  const menuId = "primary-search-account-menu";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const userID = localStorage.getItem("userID");

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logOut = () => {
    localStorage.clear();
  };

  return (
    <div className={classes.grow}>
      <React.StrictMode>
        <AppBar position="static">
          <Toolbar>
            <Link to="/" style={{ textDecoration: 'none', color: "white", fontSize: 35 }}>
              DateNite
            </Link>
            <div className={classes.grow} />
            {!userID && <div className={classes.sectionDesktop}>
                <Button
                  disableElevation
                  variant="contained"
                  color="primary"
                  onClick={() => { history.push("/register") }}
                >
                  Register
                </Button>
                <Button
                  disableElevation
                  variant="contained"
                  color="primary"
                  onClick={() => { history.push("/login") }}
                >
                  Login
                </Button>
            </div>}
            {userID && <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <ButtonGroup
                disableElevation
                variant="contained"
                color="primary"
                style={{ textTransform: "none" }}
              >
                <Button href="/" onClick={logOut}>Logout</Button>
              </ButtonGroup>
            </div>}
          </Toolbar>
        </AppBar>
        {props.children}
      </React.StrictMode>
    </div>
  );
}