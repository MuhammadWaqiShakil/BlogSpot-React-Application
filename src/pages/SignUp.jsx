import React, { useEffect, useState } from 'react'
import Styles from './Login.module.css'
import blogspot from '../assets/blopspot.png'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { TextField,CircularProgress } from '@mui/material';
import { ToastAlert } from '../utils'

function SignUp() {

    const navigate = useNavigate();

    useEffect(() => {
       const userUid = localStorage.getItem("uid")
    if (userUid) {
        navigate('/dashboard')
    }
    return
    },[])

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePass, setRePass] = useState("")
    const [age, setAge] = useState("")
    const [loading, setLoading] = useState(false);


   

let signUpHandler = async () => {
 if (password != rePass || password.length < 6 || email == "") {
    ToastAlert({
      type:"error",
      message:"Check Email or Verify your Password! (min length should be 6)"
    })
    return
 }else{
setLoading(true);
try{
   const res = await createUserWithEmailAndPassword(auth, email, password)
   await setDoc(doc(db, "users", res.user.uid), {
    firstName: firstName,
    lastName: lastName,
    age: age,
    email: email,
    bio: '',
    avatarUrl: '',
    coverUrl: '',
    role:'',
    posts:0,
    followers:0,
    following:0,
    socialLinks: {},
    isProfileComplete: false
  });
 ToastAlert({
  type:"success",
  message:"User successfully Registered!"
 })
 
 navigate('/')
}catch(error) {
     ToastAlert({
      type:"error",
      message: error.message
     })
  } finally {
    setLoading(false);
  }
 
 }

 setEmail("")
 setPassword("")
 setRePass("")
 setFirstName("")
 setLastName("")
 setAge("")

 }

  return (
   <>
    <div  className={`${Styles.signInLogoContainer} d-flex justify-content-center mt-2`}>
          <img src={blogspot} className={`${Styles.signInLogo}`} alt="" />
    </div>
    <div className={Styles.mainContainer}>
        <div className={Styles.leftContainer}>
            <div>
                <img className={Styles.mainLogo} src={blogspot} alt=""/>
            </div>

            <div>
                <h1 className={Styles.welcomeHeading}>Register Now!</h1>
                <p className={Styles.paraSignIn}>Sign up to continue </p>
            </div>

            <div>
                <p className={Styles.paraCopy}>&copy; 2024 BlogSpot. All rights reserved.</p>
            </div>

        </div>
        <div className={`${Styles.rightContainer} container justify-content-center align-items-center`}>
            <div className="d-flex justify-content-center">
                <h1 className={Styles.heading}>Sign Up</h1>
            </div>

            <div className="d-flex flex-column gap-4 align-items-center mt-5">
                <TextField
  sx={{marginBottom:"1px"}}
  id="firstName"
  label="First Name"
  variant="standard"
  className={Styles.inputField}
  value={firstName}
  onChange={(e) => setFirstName(e.target.value)}
  color="dark"
/>

<TextField
   sx={{marginBottom:"1px"}}
  id="lastName"
  label="Last Name"
  variant="standard"
  className={Styles.inputField}
  value={lastName}
  onChange={(e) => setLastName(e.target.value)}
  color="dark"
/>

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
 sx={{marginBottom:"1px"}}
  id="pass"
  label="Password"
  variant="standard"
  type="password"
  className={Styles.inputField}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  color="dark"
/>

<TextField
 sx={{marginBottom:"1px"}}
  id="rePass"
  label="Re-type Password"
  variant="standard"
  type="password"
  className={Styles.inputField}
  value={rePass}
  onChange={(e) => setRePass(e.target.value)}
  color="dark"
/>

<TextField
 sx={{marginBottom:"1px"}}
  id="age"
  label="Age"
  variant="standard"
  type="number"
  className={Styles.inputField}
  value={age}
  onChange={(e) => setAge(e.target.value)}
  color="dark"
/>
                <button
                style={{marginTop:"10px"}}
  className={Styles.continueBtn}
  onClick={signUpHandler}
  disabled={loading}
>
  {loading ? (
    <CircularProgress size={20} color="inherit" />
  ) : (
    "Register"
  )}
</button>

                <p className={Styles.paraCopy}><Link to='/' className={Styles.link}>Already Registered?</Link></p>
            </div>
        </div>
    </div>
   </>
  )
}
export default SignUp