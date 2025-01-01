// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMDxHWiWGIt7tREwEsFLaOUlZms9hh-qc",
    authDomain: "ecobits-f2f4e.firebaseapp.com",
    projectId: "ecobits-f2f4e",
    storageBucket: "ecobits-f2f4e.firebasestorage.app",
    messagingSenderId: "131342381931",
    appId: "1:131342381931:web:da7c7d85d757b84b44122e",
    measurementId: "G-F8H8EZJT92"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Toggle Forms
const toggleForm = (formType) => {
    const signInForm = document.getElementById("signInForm");
    const signUpForm = document.getElementById("signUpForm");
    const toggleToSignIn = document.getElementById("toggleToSignIn");
    const toggleToSignUp = document.getElementById("toggleToSignUp");

    if (formType === "signIn") {
        signInForm.style.display = "block";
        signUpForm.style.display = "none";
        toggleToSignIn.classList.add("active-btn");
        toggleToSignUp.classList.remove("active-btn");
    } else {
        signInForm.style.display = "none";
        signUpForm.style.display = "block";
        toggleToSignIn.classList.remove("active-btn");
        toggleToSignUp.classList.add("active-btn");
    }
};

// Login functionality
document.getElementById("login-btn").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form submission
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful!");
            console.log("Logged in user:", userCredential.user);
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
});

// Signup functionality
document.getElementById("signup-btn").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form submission
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Registration successful!");
            console.log("Registered user:", userCredential.user);
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
});

// Toggle password visibility
document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");
        const input = document.getElementById(targetId);
        const icon = button.querySelector("i");
        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("bi-eye-slash");
            icon.classList.add("bi-eye");
        } else {
            input.type = "password";
            icon.classList.remove("bi-eye");
            icon.classList.add("bi-eye-slash");
        }
    });
});
