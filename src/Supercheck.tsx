import React, { useState, useRef, useCallback } from "react";

import { matchPc, matchTablet } from "./DetectDevice";
import Axios from "axios";
import { SuperCheckFeedBack } from "./SuperCheckFeedBack";
import SuperstarzIconLight from "./images/ssmall.png";
import SuperstarzIconDark from "./images/sdsmall.png";
import { Paper, Grid } from "@material-ui/core";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { IsLoggedProfileAction } from "./log/actions/IsLoggedAction";
import RestoreIcon from "@material-ui/icons/Restore";
import { rememberMeAction } from "./GlobalActions";
///import { usePalette } from "react-palette";
////const { data, loading, error } = usePalette(profilePic);
////setHoldcolorData(data.darkVibrant);

function Supercheck() {
  const dispatch = useDispatch();

  const pthumb = useRef<any>();
  const pro = useRef<any>();

  ///
  ///
  ///
  ///DOT ENV FILE
  const { REACT_APP_SUPERSTARZ_URL, REACT_APP_APPX_STATE } = process.env;

  var allow4dev = "";

  if (REACT_APP_APPX_STATE === "dev") {
    allow4dev = "http://localhost:1000";
  } else {
    allow4dev = "";
  }

  const [Feedbackshow, setFeedbackshow] = useState<boolean>(false);
  const [rememberMeButtonshow] = useState<boolean>(false);

  const [restoreTop, setrestoreTop] = useState<number>(0);
  const [restoreLeft, setrestoreLeft] = useState<number>(0);

  ///
  ///
  ///
  ///GOTO PROFILE PAGE FINALLY
  const Gotoprofile = () => {
    dispatch(IsLoggedProfileAction());
  };

  ///
  ///
  ///
  ///DARKMODE FROM REDUX
  interface RootStateGlobalReducer {
    GlobalReducer: {
      darkmode: boolean;
    };
  }
  const { darkmode } = useSelector((state: RootStateGlobalReducer) => ({
    ...state.GlobalReducer,
  }));
  const darkmodeReducer = darkmode;

  ///
  ///
  ///
  /// GET COLOR FROM REDUX STORE
  interface RootStateReducerColor {
    GlobalReducerColor: {
      color: string;
    };
  }
  const { color } = useSelector((state: RootStateReducerColor) => ({
    ...state.GlobalReducerColor,
  }));
  const colorReducer = color;

  ///
  ///
  ///
  /// GET KEEP ME LOGGED IN STATE FROM REDUX STORE
  interface RootStateReducerKeepMeLoggedIn {
    GlobalReducerKeepMeLoggedIn: {
      rememberMe: boolean;
    };
  }
  const { rememberMe } = useSelector(
    (state: RootStateReducerKeepMeLoggedIn) => ({
      ...state.GlobalReducerKeepMeLoggedIn,
    })
  );
  const rememberMeReducer = rememberMe;

  ///
  ///
  ///
  /// GET PROFILE IMAGE DATA FROM REDUX STORE
  interface RootStateReducerImage {
    UserdataReducer: {
      image: string;
      imageThumb: string;
    };
  }
  const { image, imageThumb } = useSelector((state: RootStateReducerImage) => ({
    ...state.UserdataReducer,
  }));
  const imageReducer = image;
  const imageThumbReducer = imageThumb;

  ///
  ///
  ///
  ///DARKMODE VARIABLE FOR  UI

  interface IsuperCheckVariables {
    logoimage: string;
    moreoptions: string;
  }

  var superCheckVariables: IsuperCheckVariables = {
    logoimage: "",

    moreoptions: "",
  };

  var superCheckVariablesDARK: IsuperCheckVariables = {
    logoimage: SuperstarzIconDark,
    moreoptions: "supercheck-options-dark",
  };

  var superCheckVariablesLIGHT: IsuperCheckVariables = {
    logoimage: SuperstarzIconLight,
    moreoptions: "supercheck-options-light",
  };

  ///
  ///
  ///
  ///MUI PAPER STYLES FROM REDUX
  const { PaperStyleLight, PaperStyleDark } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.PaperReducerLightnDark,
    })
  );

  var PaperStyleReducer = "";

  if (darkmodeReducer) {
    superCheckVariables = superCheckVariablesDARK;
    PaperStyleReducer = PaperStyleDark;
  } else {
    superCheckVariables = superCheckVariablesLIGHT;
    PaperStyleReducer = PaperStyleLight;
  }

  ///DARKMODE VARIABLE FOR  UI
  ///
  ///
  ///

  ///
  ///
  ///
  ///DETETCT DEVICE TYPE VARIABLES

  var superFont = "";

  ///
  ///
  ///
  ///CONDITIONAL STATEMENT FOR DEVICE TYPE
  if (matchPc) {
    superFont = "super-starz-text-Pc";

    ///
  } else if (matchTablet) {
    superFont = "super-starz-text-Tablet";

    ///
  } else {
    superFont = "super-starz-text-Mobile";
  }

  var imageWidth = "";
  var optionsClass = "";

  var fontOptions = "";

  var leftSupertext = "";
  var bottomSupertext = "";

  if (matchPc) {
    imageWidth = "26%";

    optionsClass = "supercheck-optionsImagePc";
    fontOptions = "2.4vw";

    leftSupertext = "45%";
    bottomSupertext = "3em";
  } else if (matchTablet) {
    imageWidth = "45%";

    optionsClass = "supercheck-optionsImageTablet";
    fontOptions = "5rem";

    leftSupertext = "41%";
    bottomSupertext = "7em";
  } else {
    imageWidth = "60%";

    optionsClass = "supercheck-optionsImageMobile";
    fontOptions = "2rem";

    leftSupertext = "36%";
    bottomSupertext = "2.5em";
  }
  ///DETETCT DEVICE TYPE VARIABLES
  ///
  ///
  ///

  var opacityremember = "";
  var rememberMeType = "";
  var FeedBackData = "";
  var rememberColor: any = colorReducer;
  var opacityrememberout = "";
  var colorremember = "";

  ///
  ///
  ///
  /// CONDITIONAL STATEMENT  KEEP ME LOGGED IN STYLING
  if (rememberMeReducer) {
    opacityrememberout = "1";
    colorremember = "#ffffff";
    opacityremember = "1";
    rememberColor = colorReducer;
    rememberMeType = "session";
    FeedBackData = "user will stay logged in on browser close";
  } else {
    opacityrememberout = "";
    colorremember = "";
    opacityremember = "0.3";
    rememberColor = "#000000";
    rememberMeType = "forever";
    FeedBackData = "user will be forgotten on browser close";
  }

  ///
  ///
  ///
  ///SERVER ACCESS TO  CHANGE COOKIE EXPIRATION DATE
  const rememberTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remembergoshow = () => {
    setFeedbackshow(true);
    if (rememberTimer.current) {
      clearTimeout(rememberTimer.current);
    }
    rememberTimer.current = setTimeout(() => {
      setFeedbackshow(false);
    }, 3000);
  };
  const rememberUser = () => {
    Axios.post(
      `${REACT_APP_SUPERSTARZ_URL}/keepmeloggedin`,
      {
        values: rememberMeType,
      },
      { withCredentials: true }
    )
      .then((response) => {
        if (response.data.message === "session_Cookie_Activated") {
          dispatch(rememberMeAction(false));
          remembergoshow();
        } else if (response.data.message === "forever_Cookie_Activated") {
          dispatch(rememberMeAction(true));
          remembergoshow();
        }
      })
      .catch(function (error) {
        alert("Connection failure ");
      });
  };
  ///
  ///
  ///
  ///TYPES FOR ISLOGGEDIN
  interface RootStateIsLogged {
    IsLoggedReducer: {
      loggedIn: boolean;
    };
  }

  ///
  ///
  ///
  ///LOGGED IN DATA FROM REDUX
  const { loggedIn } = useSelector((state: RootStateIsLogged) => ({
    ...state.IsLoggedReducer,
  }));
  const loggedInReducer = loggedIn;

  const hdimageloaded = () => {
    pro.current.style.display = "block";
    pthumb.current.style.display = "none";
    calculateRestorePosition();
  };

  const calculateRestorePosition = useCallback(() => {
    var t = pro.current.clientHeight;
    var v = pro.current.clientWidth;

    setrestoreTop(t - t / 1.4);
    setrestoreLeft(v - v / 1.65);
  }, [pro.current]);

  return loggedInReducer ? (
    <>
      {" "}
      <Paper
        style={{ borderRadius: "0px", backgroundImage: PaperStyleReducer }}
      >
        <Grid
          container
          style={{
            position: "absolute",
            top: "0em",
            transition: "opacity 1.5s",
            display: "flex",
          }}
        >
          <SuperCheckFeedBack
            Feedbackshow={Feedbackshow}
            rememberTimer={rememberTimer}
            setFeedbackshow={setFeedbackshow}
            FeedBackData={FeedBackData}
            rememberMeType={rememberMeType}
          />
        </Grid>

        <Grid container style={{ height: "100vh", width: "100%" }}>
          <Grid item xs={12}>
            <Grid
              item
              xs={12}
              className="center-content-vertically dontallowhighlighting"
              style={{
                cursor: "pointer",
                zIndex: 0,
                margin: "auto",
                display: "grid",
                position: "relative",
                marginTop: matchPc ? "-4.3vh" : matchTablet ? "-4vh" : "-1vh",
              }}
            >
              <Grid
                onClick={rememberUser}
                className={`${superCheckVariables.moreoptions}   ${optionsClass}  buttonshakelogoption `}
                style={{
                  zIndex: 2,
                  backgroundColor: rememberColor,
                  opacity: rememberMeButtonshow ? opacityrememberout : 0.7,
                  left: `-${restoreLeft}px`,
                  top: `${restoreTop}px`,
                }}
              >
                <RestoreIcon
                  style={{
                    fontSize: fontOptions,
                    opacity: opacityremember,
                    color: colorremember,
                  }}
                  titleAccess={
                    rememberMeReducer
                      ? "Forget User On Browser Close"
                      : "Keep Me Logged In"
                  }
                  className="zuperkinginfo"
                />
              </Grid>

              <img
                ref={pthumb}
                onLoad={calculateRestorePosition}
                onClick={Gotoprofile}
                className="make-small-image-clickable-neutral  iconPc"
                style={{
                  position: "relative",
                  objectFit: "contain",
                  width: imageWidth,
                  borderRadius: "50vh",
                  margin: "auto",
                  filter: "blur(3px)",
                  zIndex: 1,
                }}
                src={`${imageThumbReducer}`}
                alt="SuperstarZ logo"
              />

              <img
                ref={pro}
                onClick={Gotoprofile}
                className="make-small-image-clickable-neutral  iconPc"
                onLoad={hdimageloaded}
                style={{
                  position: "relative",
                  objectFit: "contain",
                  width: imageWidth,
                  borderRadius: "50vh",
                  margin: "auto",
                  zIndex: 1,
                  display: "none",
                }}
                src={`${imageReducer}`}
                alt="SuperstarZ logo"
              />
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              bottom: bottomSupertext,
              textAlign: "center",
              position: "fixed",
              left: leftSupertext,
            }}
          >
            <span className={superFont}>
              <span
                className={
                  darkmodeReducer
                    ? "text-superstarz-dark   text-superstarz-dark-colorA  "
                    : "text-superstarz-light  text-superstarz-light-colorA  "
                }
              >
                Clik
              </span>
              <span
                style={{ opacity: darkmodeReducer ? "0.73" : "0.7" }}
                className={
                  darkmodeReducer
                    ? "text-superstarz-dark     text-superstarz-dark-colorB  "
                    : "text-superstarz-light   text-superstarz-light-colorB   "
                }
              >
                Bate
              </span>
            </span>
          </Grid>

          <Grid item xs={6} className="text-align-right"></Grid>
        </Grid>
      </Paper>
    </>
  ) : null;
}

export default Supercheck;
