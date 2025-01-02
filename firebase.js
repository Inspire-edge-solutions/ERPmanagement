import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDfCw-ftxh3nvBbzEmjedz4exlAUPXh920",
    authDomain: "try-two-4e55c.firebaseapp.com",
    projectId: "try-two-4e55c",
    storageBucket: "try-two-4e55c.firebaseapp.com",
    messagingSenderId: "133779617189",
    appId: "1:133779617189:web:492e0b26adf205c79de44c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

// Initially hide the registration form
document.getElementById("registrationForm").style.display = "none";

// Event listener for the "click here" button
document.getElementById("reg").addEventListener('click', function(event) {
    event.preventDefault(); // Prevents the default button behavior
    document.getElementById("registrationForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
});

// Event listener for the login form submission
document.getElementById("loginForm").addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    const loginEmail = document.getElementById("email").value;
    const loginPassword = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Successful login !! " + loginEmail);
            window.location.href = "home.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Sorry, incorrect credentials..!! " + errorMessage);
            console.error("Error Code:", errorCode);
            console.error("Error Message:", errorMessage);
        });
});

// Event listener for the registration form submission
document.getElementById("registrationForm").addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    const registerEmail = document.getElementById("registeremail").value;
    const registerPassword = document.getElementById("registerpassword").value;

    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Registration successful! Welcome, " + registerEmail);
            window.location.href = "index.html";
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/email-already-in-use') {
                alert("This email is already in use.");
                document.getElementById("loginForm").style.display = "block";
                document.getElementById("registrationForm").style.display = "none";
            } else {
                alert("Registration failed: " + errorMessage);
            }
            console.error("Error Code:", errorCode);
            console.error("Error Message:", errorMessage);
        });
});

// Event listener for the Google login button
const googlebtn = document.getElementById("imgtest");
googlebtn.addEventListener("click", function(event) {
    event.preventDefault(); // Prevents the default action for the anchor tag

    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            const user = result.user;
            alert("Successful login !! ");
            window.location.href = "home.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error Code:", errorCode);
            console.error("Error Message:", errorMessage);
        });
});

const reset = document.getElementById("reset");
reset.addEventListener("click", function(event) {
    event.preventDefault();
    const email = prompt("please enter your email id");
    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("email sent");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("error in sending email: " + errorMessage);
        });
});