const loginForm = document.querySelector(".loginForm");
const usersStorageKey = "bleikerUsers";
const currentUserStorageKey = "bleikerCurrentUser";

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const usernameInput = loginForm.querySelector('input[name="username"]');
        const emailInput = loginForm.querySelector('input[name="email"]');
        const passwordInput = loginForm.querySelector('input[name="password"]');

        const username = usernameInput ? usernameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
        const password = passwordInput ? passwordInput.value : "";

        if (usernameInput) {
            registerUser(username, email, password);
            return;
        }

        loginUser(email, password);
    });
}

function getUsers() {
    const savedUsers = localStorage.getItem(usersStorageKey);

    if (!savedUsers) {
        return [];
    }

    try {
        const parsedUsers = JSON.parse(savedUsers);
        return Array.isArray(parsedUsers) ? parsedUsers : [];
    } catch (error) {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(usersStorageKey, JSON.stringify(users));
}

function registerUser(username, email, password) {
    if (!username || !email || !password) {
        alert("Fyll inn brukernavn, e-post og passord.");
        return;
    }

    const users = getUsers();
    const emailExists = users.some((user) => user.email === email);
    const usernameExists = users.some((user) => user.username.toLowerCase() === username.toLowerCase());

    if (emailExists || usernameExists) {
        alert("Brukernavn eller e-post finnes allerede.");
        return;
    }

    users.push({ username, email, password });
    saveUsers(users);
    localStorage.setItem(currentUserStorageKey, username);
    window.location.href = "../index.html";
}

function loginUser(email, password) {
    if (!email || !password) {
        alert("Skriv inn e-post og passord.");
        return;
    }

    const users = getUsers();
    const user = users.find((savedUser) => savedUser.email === email && savedUser.password === password);

    if (!user) {
        alert("Du må først opprette en konto fra Sign up, eller skrive riktig innlogging.");
        return;
    }

    localStorage.setItem(currentUserStorageKey, user.username);
    window.location.href = loginForm.action || "index.html";
}
