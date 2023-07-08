var firebaseConfig = {
    apiKey: "AIzaSyCKJwXWqwUu-BHmq_KjyG_ldri5vxi0o1g",
    authDomain: "cabeludo-e0abf.firebaseapp.com",
    projectId: "cabeludo-e0abf",
    storageBucket: "cabeludo-e0abf.appspot.com",
    messagingSenderId: "122903428334",
    appId: "1:122903428334:web:dcc016eb3eb16519c6c7ff"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()

function register() {
    email = document.getElementById('emailid').value
    password = document.getElementById('passwordid').value
    full_name = document.getElementById('firstid').value
    favourite_song = document.getElementById('nickid').value
    milk_before_cereal = document.getElementById('numberid').value

    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email ou Senha inválida')
        return
    }
    if (validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(milk_before_cereal) == false) {
        alert('Um ou mais campos vazios!')
        return
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            var user = auth.currentUser

            var database_ref = database.ref()

            var user_data = {
                email: email,
                full_name: full_name,
                favourite_song: favourite_song,
                milk_before_cereal: milk_before_cereal,
                last_login: Date.now()
            }

            database_ref.child('users/' + user.uid).set(user_data)

            alert('Conta criada com sucesso!')
        })
        .catch(function (error) {
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}

function login() {
    email = document.getElementById('emailid').value
    password = document.getElementById('passwordid').value

    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email ou senha incorreto')
        return
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            var user = auth.currentUser
            var database_ref = database.ref()
            var user_data = {
                last_login: Date.now()
            }

            database_ref.child('users/' + user.uid).update(user_data)
            alert('Usuario logado')
        })
        .catch(function (error) {
            var error_code = error.code
            var error_message = error.message
            alert(error_message)
        })
}

function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        return true
    } else {
        return false
    }
}

function validate_password(password) {
    if (password < 6) {
        alert("Senha precisa ter mais de 6 caracteres")
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
} 