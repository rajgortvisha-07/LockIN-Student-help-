document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");
    const message = document.getElementById("message");

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();


        // Check empty fields
        if (name === "" || email === "" || password === "") {

            message.innerHTML = `
                <div class="alert alert-danger">
                    Please fill in all fields.
                </div>
            `;

            return;
        }


        // Check email
        if (!email.includes("@")) {

            message.innerHTML = `
                <div class="alert alert-danger">
                    Please enter a valid email address.
                </div>
            `;

            return;
        }


        // Create user
        const user = {
            name: name,
            email: email
        };


        // Save user
        localStorage.setItem("user", JSON.stringify(user));

        localStorage.setItem("isLoggedIn", "true");


        // Show success message
        message.innerHTML = `
            <div class="alert alert-success">
                Login successful!
            </div>
        `;


        // Go to dashboard
        setTimeout(function () {
            window.location.href = "dashboard.html";
        }, 1500);

    });

});