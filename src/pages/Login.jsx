import Styles from './Login.module.css'
import blogspot from '../assets/blopspot.png'
import { Link } from 'react-router-dom'

function Login() {
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
                <h1 className={Styles.welcomeHeading}>Welcome <br/>to BlogSpot</h1>
                <p className={Styles.paraSignIn}>Sign in to <br/> continue access</p>
            </div>

            <div>
                <p className={Styles.paraCopy}>&copy; 2024 BlogSpot. All rights reserved.</p>
            </div>

        </div>

        <div className={`${Styles.rightContainer} container justify-content-center align-items-center`}>
            <div>
                <h1 className={Styles.heading}>Sign In</h1>
            </div>

            <div class="d-flex flex-column gap-4 align-items-center mt-5">
                <input type="text" className={Styles.inputField} placeholder="Email Address" name="" id="email"/>
                <input type="password" className={Styles.inputField} placeholder="Password" name="" id="pass"/>
                <div className={Styles.invalid}>
                    <sub>Invalid Email or Password!</sub>
                </div>
                <button className={Styles.continueBtn}>Login</button>
                <p className={Styles.paraCopy}><Link className={Styles.link} to={"/signup"}>Sign Up?</Link></p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login