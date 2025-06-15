const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

if (loginForm && registerForm) {
  function toggleForms() {
    loginForm.classList.toggle("hidden");
    registerForm.classList.toggle("hidden");
  }

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;

    // Regular Expressions
    const nameRegex = /^[a-zA-Z ]{3,}$/;
    const emailRegex =  /^[a-zA-Z]{3,}+@"gmail.com"$/; 
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    // Validation
    if (!nameRegex.test(name)) {
      alert("❌ Please enter a valid name (at least 3 letters).");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("❌ Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("❌ Password must be at least 6 characters and contain letters and numbers.");
      return;
    }

    // Save user
    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("✅ Registered successfully! Please log in.");
    toggleForms();
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert("✅ Login successful!");
      window.location.href = "products.html";
    } else {
      alert("❌ Invalid email or password.");
    }
  });
}
