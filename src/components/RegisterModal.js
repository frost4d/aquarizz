import "./RegisterModal.css";
import Button from "./Button.js";
import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterModal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="overlayContainer" onClick={props.onClose}>
      <div className="overlayCard" onClick={(e) => e.stopPropagation()}>
        <header className="headerOverlay">
          <h1>Register</h1>
        </header>

        <main className="contents">
          <form className="registerForm">
            <div className="inputBoxes fullNameBox">
              <input placeholder="Enter your name" className="fullNameFld" />
            </div>
            <div className="inputBoxes emailBox">
              <input placeholder="Enter your email" className="emailFld" />
            </div>
            <div className="inputBoxes passwordBox">
              <input
                placeholder="Create a password"
                className="passwordRegFld"
              />
            </div>
            <div className="inputBoxes confirmPassBox">
              <input
                placeholder="Confirm a password"
                className="confirmPassFld"
              />
            </div>
            <Button className="registerBtnForm"> Register</Button>
            <Button className="close" onClick={props.onClose}>
              Close
            </Button>
          </form>
        </main>

        <footer className="footer"></footer>
      </div>
    </div>
  );
};

// backend signupform
const signupForm = document.querySelector('.registerForm')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user created:', cred.user)
      signupForm.reset()
    })
    .catch((err) => {
      console.log((err.message))
  })
})


export default RegisterModal;
