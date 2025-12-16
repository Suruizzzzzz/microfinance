lucide.createIcons();
// Theme Toggle
const themeToggle = document.getElementById("themeToggle")
const body = document.body

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
body.classList.add("dark-mode")
}

themeToggle.addEventListener("click", () => {
body.classList.toggle("dark-mode")
const isDark = body.classList.contains("dark-mode")
localStorage.setItem("theme", isDark ? "dark" : "light")
})

// Form Switching
function switchForm(formType) {
const loginForm = document.getElementById("loginForm")
const registerForm = document.getElementById("registerForm")

if (formType === "register") {
loginForm.classList.remove("active")
registerForm.classList.add("active")
} else {
registerForm.classList.remove("active")
loginForm.classList.add("active")
}

// Reinitialize Lucide icons after form switch
setTimeout(() => {
window.lucide.createIcons()
}, 100)
}

// Password Toggle
function togglePassword(inputId) {
const input = document.getElementById(inputId)
const button = input.parentElement.querySelector(".toggle-password")
const icon = button.querySelector(".eye-icon")

if (input.type === "password") {
input.type = "text"
icon.setAttribute("data-lucide", "eye-off")
} else {
input.type = "password"
icon.setAttribute("data-lucide", "eye")
}

window.lucide.createIcons()
}

// Simple password strength evaluation for UI only (no real security checks)
// HARDCODED: this is just front-end feedback; replace with real backend validation pag bakasyon na.
function getPasswordStrength(password) {
let score = 0;
if (password.length >= 8) score++;
if (/[a-z]/.test(password)) score++;
if (/[A-Z]/.test(password)) score++;
if (/\d/.test(password)) score++;
if (/[^A-Za-z0-9]/.test(password)) score++;

let label = "Very weak";
let cssClass = "weak";
let width = "20%";
if (score >= 4) {
label = "Strong";
cssClass = "strong";
width = "80%";
}
if (score === 5) {
label = "Very strong";
cssClass = "very-strong";
width = "100%";
} else if (score === 3) {
label = "Medium";
cssClass = "medium";
width = "60%";
} else if (score === 2) {
label = "Weak";
cssClass = "weak";
width = "40%";
}

return { score, label, cssClass, width };
}

function updatePasswordStrengthUI(password) {
const bar = document.getElementById("passwordStrengthBar");
const labelEl = document.getElementById("passwordStrengthLabel");
if (!bar || !labelEl) return;

if (!password) {
bar.style.width = "0%";
bar.style.backgroundColor = "#e5e7eb";
labelEl.textContent = "Password strength: not evaluated yet";
labelEl.className = "password-strength-label";
return;
}

const { score, label, cssClass, width } = getPasswordStrength(password);
bar.style.width = width;
// Basic color mapping for the bar
if (score <= 2) {
bar.style.backgroundColor = "#ef4444";
} else if (score === 3) {
bar.style.backgroundColor = "#f59e0b";
} else {
bar.style.backgroundColor = "#22c55e";
}

labelEl.textContent = "Password strength: " + label;
labelEl.className = "password-strength-label " + cssClass;
}

// HARDCODED demo OTP value for UI only – replace with backend later
const DEMO_OTP_CODE = "123456";

// Login Form Handler
function handleLogin(e) {
e.preventDefault()

const email = document.getElementById("loginEmail").value
const password = document.getElementById("loginPassword").value

console.log("Login:", { email, password })

// HARDCODED: fake successful login and redirect to dashboard UI
Swal.fire({
icon: "success",
title: "Login successful (demo)",
text: "Welcome back, " + email + "!",
confirmButtonColor: "#2ca078",
confirmButtonText: "Go to dashboard"
}).then(() => {
window.location.href = "modules/dashboard.html"
})
}

// Register Form Handler
function handleRegister(e) {
e.preventDefault()

const name = document.getElementById("registerName").value
const email = document.getElementById("registerEmail").value
const password = document.getElementById("registerPassword").value
const confirmPassword = document.getElementById("confirmPassword").value
const acceptTerms = document.getElementById("acceptTerms").checked
const otpCode = document.getElementById("otpCode").value.trim()

// Validation
const strength = getPasswordStrength(password)
// Do not allow weak passwords in this UI (require at least "Medium")
if (strength.score < 3) {
Swal.fire({
icon: "error",
title: "Weak password",
text: "Password is too weak (" + strength.label + "). Use upper, lower, number and symbol.",
confirmButtonColor: "#2ca078"
})
return
}

if (password !== confirmPassword) {
Swal.fire({
icon: "error",
title: "Passwords do not match",
text: "Please make sure both password fields are identical.",
confirmButtonColor: "#2ca078"
})
return
}

if (password.length < 8) {
Swal.fire({
icon: "error",
title: "Password too short",
text: "Password must be at least 8 characters long.",
confirmButtonColor: "#2ca078"
})
return
}

if (!acceptTerms) {
Swal.fire({
icon: "error",
title: "Accept the terms",
text: "Please accept the Terms and Privacy Policy to continue.",
confirmButtonColor: "#2ca078"
})
return
}

// HARDCODED OTP check for UI only
if (otpCode !== DEMO_OTP_CODE) {
Swal.fire({
icon: "error",
title: "Invalid OTP",
text: "For this demo UI, please use the OTP code 123456.",
confirmButtonColor: "#2ca078"
})
return
}

console.log("Register:", { name, email, password })

// HARDCODED: fake successful registration and redirect to dashboard UI
Swal.fire({
icon: "success",
title: "Account created (demo)",
html: "Name: <strong>" + name + "</strong><br>Email: <strong>" + email + "</strong>",
confirmButtonColor: "#2ca078",
confirmButtonText: "Continue to dashboard"
}).then(() => {
window.location.href = "modules/dashboard.html"
})
}

document.addEventListener("DOMContentLoaded", () => {
window.lucide.createIcons()

const registerPasswordInput = document.getElementById("registerPassword")
if (registerPasswordInput) {
registerPasswordInput.addEventListener("input", (e) => {
updatePasswordStrengthUI(e.target.value)
})
// Initial state
updatePasswordStrengthUI(registerPasswordInput.value || "")
}

const sendOtpButton = document.getElementById("sendOtpButton")
if (sendOtpButton) {
sendOtpButton.addEventListener("click", () => {
// HARDCODED: sending OTP for UI only ayusin ko sa pasko 
Swal.fire({
icon: "info",
title: "Demo OTP sent (UI only)",
text: "Use code: " + DEMO_OTP_CODE,
confirmButtonColor: "#2ca078"
})
})
}
})
