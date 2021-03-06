const loading = (show = true) => $.LoadingOverlay(show ? "show":"hide")
const swal = (opt) => Swal.fire(opt);

let email = document.getElementById("email");
let pwd   = document.getElementById("pwd");
let login = document.getElementById("login");
let signup = document.getElementById("signup");
let logout = document.getElementById("logout");

// sign in with email password
login.addEventListener("click", () => {
    loading();

    auth.signInWithEmailAndPassword(email.value, pwd.value)
    .then((userCredential)=>{
        console.warn(userCredential);
        document.getElementsByTagName("form")[0].reset();
        swal({
            title : "Sukses", 
            text : userCredential.user.email +" berhasil login!", 
            icon : "success"
        })

    })
    .catch((err)=>{
        console.warn(err);
        swal({
            title : "error", 
            text : err.message, 
            icon : "error"
        })
    })
    .finally(()=>{
        loading(0);
    })
})

// proses pendaftaran
signup.addEventListener("click", function(){
    loading()
    auth.createUserWithEmailAndPassword(email.value, pwd.value)
    .then(({ user }) =>{
        console.warn(user);
        console.warn("UID register "+user.uid);

        document.getElementsByTagName("form")[0].reset();
        Swal.fire("Success", "Registrasi "+user.email+" success ", "success")
    })
    .catch(({ message })=>{
        Swal.fire("error", message, "error")
    })
    .finally(()=>{
        loading(0)
    })
})

// proses logout
logout.addEventListener("click", ()=>{
    swal({
        title : "Warning",
        text : "Are you sure want to logout from this app ?",
        icon : "warning",
        showCancelButton : true,
    }).then(({isConfirmed})=>{
        if(isConfirmed){
            loading();
            auth.signOut()
            .then(()=>{
                Swal.fire("success", "Logout berhasil", "success");
            })
            .catch((err)=>{
                console.warn(err);
                Swal.fire("error", "Logout gagal", "error");
            })
            .finally(()=>{
                loading(0);
            })
        }
    })
})


// event listener
auth.onAuthStateChanged((user)=>{

    if(user){
        console.warn("login", user.uid);
        user.providerData.forEach(function (profile) {
            console.log("  Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
          });

        signup.setAttribute("hidden","");
        login.setAttribute("hidden","");
        logout.removeAttribute("hidden");
    }else{
        console.warn("logout");

        signup.removeAttribute("hidden");
        login.removeAttribute("hidden");
        logout.setAttribute("hidden","");
    }
})
