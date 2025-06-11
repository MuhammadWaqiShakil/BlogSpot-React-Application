import React from 'react'
i

function SignUp() {
  return (
   <>
    <div class="mainContainer">
        <div class="leftContainer">
            <div>
                <img class="mainLogo" src="./assets/blopspot.png" alt=""/>
            </div>

            <div>
                <h1 class="welcomeHeading">Register Now!</h1>
                <p class="paraSignIn">Sign up to continue </p>
            </div>

            <div>
                <p class="paraCopy">&copy; 2024 BlogSpot. All rights reserved.</p>
            </div>

        </div>
        <div class="rightContainer container justify-content-center align-items-center">
            <div class="d-flex justify-content-center">
                <h1>Sign Up</h1>
            </div>

            <div class="d-flex flex-column gap-4 align-items-center mt-5">
                <input type="text" class="inputField" placeholder="First Name" name="" id="firstName"/>
                <input type="text" class="inputField" placeholder="Last Name" name="" id="lastName"/>
                <input type="text" class="inputField" placeholder="Email Address" name="" id="email"/>
                <input type="password" class="inputField" placeholder="Password" name="" id="pass"/>
                <input type="password" class="inputField" placeholder="Re-type Password" name="" id="rePass"/>
                <input type="number" class="inputField" placeholder="Age" name="" id="age"/>
                <button class="continueBtn" onclick="signUpHandler()">Register</button>
                <p class="paraCopy"><a href="./index.html">Already Registered?</a></p>
            </div>
        </div>
    </div>
   </>
  )
}

export default SignUp