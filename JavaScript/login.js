const loginForm = document.querySelector(".loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const emailInput = loginForm.querySelector('input[name="email"]');
        const email = emailInput ? emailInput.value.trim() : "";

        if (email) {
            const username = email.split("@")[0];
            localStorage.setItem("bleikerCurrentUser", username);
        } else {
            localStorage.removeItem("bleikerCurrentUser");
        }

        window.location.href = loginForm.action || "index.html";
    });
}
