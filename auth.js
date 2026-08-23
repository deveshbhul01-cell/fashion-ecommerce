function getUsers() {

    return JSON.parse(
        localStorage.getItem("stylehub-users")
    ) || [];
}


function saveUsers(users) {

    localStorage.setItem(
        "stylehub-users",
        JSON.stringify(users)
    );
}


function showRegister() {

    document.getElementById("login-form")
        .style.display = "none";

    document.getElementById("register-form")
        .style.display = "block";
}


function showLogin() {

    document.getElementById("register-form")
        .style.display = "none";

    document.getElementById("login-form")
        .style.display = "block";
}


function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("register-name")
            .value.trim();

    const email =
        document.getElementById("register-email")
            .value.trim()
            .toLowerCase();

    const password =
        document.getElementById("register-password")
            .value;


    let users = getUsers();


    const existingUser =
        users.find(user => user.email === email);


    if (existingUser) {

        alert(
            "An account with this email already exists."
        );

        return;
    }


    users.push({
        name: name,
        email: email,
        password: password
    });


    saveUsers(users);


    alert(
        "Account created successfully! 🎉"
    );


    showLogin();
}


function loginUser(event) {

    event.preventDefault();


    const email =
        document.getElementById("login-email")
            .value.trim()
            .toLowerCase();

    const password =
        document.getElementById("login-password")
            .value;


    const users = getUsers();


    const user =
        users.find(
            item =>
                item.email === email &&
                item.password === password
        );


    if (!user) {

        alert(
            "Incorrect email or password."
        );

        return;
    }


    localStorage.setItem(
        "stylehub-current-user",
        JSON.stringify(user)
    );


    alert(
        "Welcome back, " + user.name + "! ❤️"
    );


    window.location.href = "index.html";
}


function logoutUser() {

    localStorage.removeItem(
        "stylehub-current-user"
    );

    window.location.href = "login.html";
}
