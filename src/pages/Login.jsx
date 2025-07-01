import Styles from './Login.module.css'
import blogspot from '../assets/blopspot.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {TextField,CircularProgress} from '@mui/material'
import { ToastAlert } from '../utils';

function Login() {

    const navigate = useNavigate()

useEffect(()=>{
    const userUid = localStorage.getItem("uid")
    if (userUid) {
        navigate('/dashboard')
    }
    return
},[])

const [email , setEmail] = useState("")
const [password, setPassword] = useState("")
const [loading, setLoading] = useState(false);



let loginHandler = async () => {
    setLoading(true);
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        localStorage.setItem("uid", res.user.uid)
        ToastAlert({
          type: "success",
          message: "Logged in Successfully!"
    })
        navigate('/dashboard')

    } catch (error) {
         ToastAlert({
          type: "error",
          message: "Invalid Email or Password!"
    })
    } finally {
    setLoading(false); 
  }
    
    setEmail("")
    setPassword("")
  

}



  return (
    <>
      <div
        className={`${Styles.signInLogoContainer} d-flex justify-content-center mt-2`}
      >
        <img src={blogspot} className={`${Styles.signInLogo}`} alt="" />
      </div>
      <div className={Styles.mainContainer}>
        <div className={Styles.leftContainer}>
          <div>
            <img className={Styles.mainLogo} src={blogspot} alt="" />
          </div>

          <div>
            <h1 className={Styles.welcomeHeading}>
              Welcome <br />
              to BlogSpot
            </h1>
            <p className={Styles.paraSignIn}>
              Sign in to <br /> continue access
            </p>
          </div>

          <div>
            <p className={Styles.paraCopy}>
              &copy; 2024 BlogSpot. All rights reserved.
            </p>
          </div>
        </div>

        <div
          className={`${Styles.rightContainer} container justify-content-center align-items-center`}
        >
          <div>
            <h1 className={Styles.heading}>Sign In</h1>
          </div>

          <div className="d-flex flex-column gap-4 align-items-center mt-4">
            <TextField
            sx={{marginBottom:"1px"}}
              id="email"
              label="Email Address"
              variant="standard"
              className={Styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color="dark"
            />

            <TextField
              id="pass"
              label="Password"
              variant="standard"
              type="password"
              className={Styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              color="dark"
            />

            <button
              className={`${Styles.continueBtn} mt-4`}
              onClick={loginHandler}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Login"
              )}
            </button>

            <p className={Styles.paraCopy}>
              <Link className={Styles.link} to={"/signup"}>
                Sign Up?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login