var firebaseConfig = {
  apiKey: "AIzaSyBdTMg8rkL4hTm_tr0ex_Erm3NcF7CRVdQ",
  authDomain: "sisemp-81b27.firebaseapp.com",
  projectId: "sisemp-81b27",
  storageBucket: "sisemp-81b27.appspot.com",
  messagingSenderId: "793747735295",
  appId: "1:793747735295:web:b7488aaadde6867661c2ca",
  measurementId: "G-LJDSCM2LH6",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();

const register = () => {
  let registerForm = document.querySelector("#register-form");

  if (!validUser(registerForm)) showWarning("Las contraseñas no coinciden");
  else {
    let user = buildUser(registerForm);
    createUserAuth(user)
      .then(() =>
        addUserDB(user)
          .then(() => showSuccess("Usuario registrado correctamente"))
          .catch((error) => showError(error.message))
      )
      .catch((error) => showError(error.message));
  }
  return false;
};

const login = () => {
  let loginForm = document.querySelector("#login-form");
  loginUser(loginForm.email.value, loginForm.password.value)
    .then(() => {
      setToken();
      showSuccess("Usuario loggeado correctamente");
    })
    .catch((error) => showError(error.message));
  return false;
};

/* DB METHODS */

const addUserDB = (user) => {
  return db.collection("users").add(user);
};

/* AUTH METHODS */

const createUserAuth = (user) => {
  return auth.createUserWithEmailAndPassword(user.email, user.password);
};

const loginUser = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

const getToken = () => {
  return sessionStorage.getItem("token");
};

const setToken = () => {
  return sessionStorage.setItem("token", auth.currentUser.refreshToken);
};

/* AUXILIAR METHODS */

const validUser = (registerForm) => {
  return registerForm.registerPassword.value === registerForm.retypePassword.value;
};

const buildUser = (registerForm) => {
  return {
    firstName: registerForm.firstName.value,
    lastName: registerForm.lastName.value,
    email: registerForm.registerEmail.value,
    mobile: registerForm.mobile.value,
    password: registerForm.registerPassword.value,
  };
};

/* ALERT MESSAGES */

const showError = (message) => {
  Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
    confirmButtonText: "Ok",
  });
};

const showSuccess = (message) => {
  Swal.fire({
    title: "Éxito",
    text: message,
    icon: "success",
    confirmButtonText: "Ok",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "index.html";
    }
  });
};

const showWarning = (message) => {
  Swal.fire({
    title: "Advertencia",
    text: message,
    icon: "warning",
    confirmButtonText: "Ok",
  });
};
