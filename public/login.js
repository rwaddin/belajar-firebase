const loading = (show = true) => $.LoadingOverlay(show ? "show":"hide")

let email = document.getElementById("email");
let pwd   = document.getElementById("pwd");
let login = document.getElementById("login")
let signup = document.getElementById("signup")


login.addEventListener("click", function(){
    alert("Aa")
})

// proses pendaftaran
signup.addEventListener("click", function(){
    loading()
    auth.createUserWithEmailAndPassword(email.value, pwd.value)
    .then(({ user }) =>{
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