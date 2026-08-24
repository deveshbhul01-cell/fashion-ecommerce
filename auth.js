async function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("register-name").value.trim();

    const email =
        document.getElementById("register-email").value.trim();

    const password =
        document.getElementById("register-password").value;


    if (password.length < 6) {

        alert("Password must be at least 6 characters.");

        return;
    }


    const { data, error } =
        await supabaseClient.auth.signUp({

            email: email,

            password: password,

            options: {

                data: {
                    full_name: name
                }

            }

        });


    if (error) {

        alert(error.message);

        return;
    }


    alert(
        "Account created successfully! 🎉 Check your email if verification is required."
    );


    showLogin();
}


async function loginUser(event) {

    event.preventDefault();


    const email =
        document.getElementById("login-email").value.trim();

    const password =
        document.getElementById("login-password").value;


    const { data, error } =
        await supabaseClient.auth.signInWithPassword({

            email: email,

            password: password

        });


    if (error) {

        alert(error.message);

        return;
    }


    alert("Welcome to StyleHub! ❤️");


    window.location.href = "index.html";
}


async function logoutUser() {

    const { error } =
        await supabaseClient.auth.signOut();


    if (error) {

        alert(error.message);

        return;
    }


    window.location.href = "index.html";
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
