import React, { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../assets/R.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const push = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Email is required, Kindly fill all fields");
      return false;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      toast.error("Email is not valid");
      return false;
    }

    if (password === "") {
      toast.error("Password is required, Kindly fill all fields");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password should not be less than 6 characters");
      return false;
    }
    setIsLoading(true);

    const response = await axios.post(
      "http://localhost:7000/api/v1/user/login",
      { email, password }
    );

    if (!response) {
      setIsLoading(false);
      return;
    }

    toast.success("Logged in Successfully");
    setEmail("");
    setPassword("");
    setIsLoading(false);
    push("/redirect");
  };
  return (
    <div className={styles.container}>
      <p className={styles.logo}>Doheney.</p>

      <div className={styles.flex}>
        <div className={styles.introduction}>
          <p>
            Introducing Global <br /> Payroll you can run <br /> in your sleep
          </p>

          <p className={styles["team-member"]}>
            Pay Team members hired through your own <br /> entities in 90+
            countries with Global payroll
          </p>

          <div className={styles.learnMore}>
            <button className={styles.learnMoreButton}>
              <a href="#learn-more">Learn More</a>
            </button>
            <span>
              <ArrowForwardIcon />
            </span>
          </div>
        </div>
        <div className={styles.form}>
          <h2 className={styles["login-header"]}>Login</h2>
          <div className={styles.google}>
            <img src={logo} alt="logo" width={20} height={20} />
            <button className={styles["google-button"]}>
              <span className={styles["google-text"]}>
                Sign Up Using Google
              </span>
            </button>
          </div>
          <br />
          <h2 className={styles.hr}>
            <span>or</span>
          </h2>
          <h5 className={styles["email-login"]}>Login using email address</h5>
          <div className={styles["form-container"]}></div>
          <form onSubmit={handleLogin} className={styles.formControl}>
            <Box
              component="div"
              sx={{
                "& > :not(style)": { m: 1, width: "95%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Box>
            <FormControl sx={{ m: 1, width: "95%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <p className={styles.forgot}>
              <a href="#">Forgot password?</a>
            </p>

            <button type="submit" className={styles.submitButton}>
              Login
            </button>
          </form>
          <br />
          <br />
          <p className={styles.signUp}>
            Need to create an account?{" "}
            <span>
              <a href="#">Sign Up</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
