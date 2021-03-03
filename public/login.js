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

        signup.setAttribute("hidden","");
        login.setAttribute("hidden","");
        logout.removeAttribute("hidden");
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
                signup.removeAttribute("hidden");
                login.removeAttribute("hidden");
                logout.setAttribute("hidden","");
            })
            .catch((err)=>{
                console.warn(err);
            })
            .finally(()=>{
                loading(0);
            })
        }
    })
})