
const $ = (tag) => document.querySelector(tag);

const input_new_password = $('.input_new_password');
const input_confirm_password = $('.input_confirm_new_password');
const buttonSubmit = $('.button_form_reset_password')
const form = $('.form_reset_password')

const icon_eye = $('.icon_eye');
const icon_eye_off = $('.icon_eye_ocult_new_password');

const icon_eye_confirm_password = $('.icon_eye_confirm_password');
const icon_eye_off_confirm_password = $('.icon_eye_ocult_password');

const errorPassword = $('.password_compare')


//Evento para mostrar o ocultar el icono al escribir
input_new_password.addEventListener("input", (e) => {

    const passwordRequirements = $('.password_requirements')


    if (e.target.value.length > 0) {
        icon_eye.style.display = "block";
        passwordRequirements.style.display = "block"
        validatePassword()
    } else {
        icon_eye.style.display = "none";
        passwordRequirements.style.display = "none"
    }

})

function changeIconEye(input, icon_eye, icon_eye_off) {
    const typeInput = input.getAttribute('type')

    if (typeInput === "password") {
        input.setAttribute('type', "text")
        icon_eye.style.display = 'none'
        icon_eye_off.style.display = 'block'
    }
}

function changeIconEyeOff(input, icon_eye, icon_eye_off) {

    const typeInput = input.getAttribute('type')

    if (typeInput === "text") {
        input.setAttribute('type', "password")
        icon_eye_off.style.display = 'none'
        icon_eye.style.display = 'block'
    }
}


// Evento para mostrar la contraseña nueva
icon_eye.addEventListener("click", changeIconEye.bind(null, input_new_password, icon_eye, icon_eye_off))

// Evento para ocultar la nueva contraseña
icon_eye_off.addEventListener("click", changeIconEyeOff.bind(null, input_new_password, icon_eye, icon_eye_off))


//Evento para mostrar o ocultar el icono al escribir en la confirmacion de la contraseña
input_confirm_password.addEventListener("input", (e) => {
    const { value } = e.target
    icon_eye_confirm_password.style.display = value.length > 0 ? "block" : "none"
    if (value.length > 0) comparePassword()
}
)

icon_eye_confirm_password.addEventListener("click", changeIconEye.bind(null, input_confirm_password, icon_eye_confirm_password, icon_eye_off_confirm_password))

icon_eye_off_confirm_password.addEventListener("click", changeIconEyeOff.bind(null, input_confirm_password, icon_eye_confirm_password, icon_eye_off_confirm_password))


function validatePassword() {
    const password = $('.input_new_password').value;
    // items li que proporcionan info al usuario
    const uppercase = document.getElementById("uppercase");
    const number = $("#number");
    const special = $("#special");
    const length = $("#length")

    //validar que se cumpla con las reglas de negocio
    const uppercasePattern = /[A-Z]/; // Al menos una letra mayúscula
    const numberPattern = /[0-9]/; // Al menos un número
    const specialPattern = /[!@#$%^&*]/; // Al menos un carácter especial


    uppercase.classList.toggle('valid', uppercasePattern.test(password))
    uppercase.classList.toggle('invalid', !uppercasePattern.test(password))

    number.classList.toggle('valid', numberPattern.test(password))
    number.classList.toggle('invalid', !numberPattern.test(password))


    // Validar carácter especial
    special.classList.toggle('valid', specialPattern.test(password))
    special.classList.toggle('invalid', !specialPattern.test(password))

    length.classList.toggle('valid', password.length >= 8)
    length.classList.toggle('invalid', !password.length >= 8)


}

function comparePassword() {
    const newPassword = input_new_password.value;
    const confirmPassword = input_confirm_password.value;

    if (newPassword === confirmPassword && confirmPassword !== "") {
        errorPassword.style.display = "none"
    } else {
        errorPassword.style.display = "block"
        errorPassword.classList.add('invalid')
    }
}

const fetchIp = async () => {
    try {
        const response = await fetch("https://api-software-economico.up.railway.app/get-ip")
        const { ip } = await response.json()
        return ip

    } catch (error) {
        console.log(error, "error");

    }
}

const fetchSendNewPassword = async (body) => {
    try {
        const response = await fetch("https://api-software-economico.up.railway.app/api/v1/auth/reset-password", {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
        const data = await response.json()
        return [null, data]
    } catch (error) {
        return [error, null]
    }
}

const handleSubmit = (e) => {
    e.preventDefault()

    const newPassword = input_new_password.value;

    const confirmPassword = input_confirm_password.value;


    if (newPassword !== confirmPassword) return window.alert('Las contraseñas no coinciden')


    const values = window.location.search
    const urlParams = new URLSearchParams(values)
    const token = urlParams.get('token')
    const email = urlParams.get('email')
    const { userAgent } = window.navigator


    fetchIp().then(ip => {
        const body = {
            token,
            email,
            newPassword,
            ip,
            userAgent
        }

        fetchSendNewPassword(body).then(([error, response]) => {
            if (error) return alert('Ocurrió un error inesperado, no pudimos restablecer la contraseña, intentalo más tarde')

            alert("Contraseña actualizada correctamente")
            window.location.reload()


        }).catch(() => alert('Ocurrió un error inesperado'))

    }).catch(() => alert('Ocurrió un error inesperado'))







    // e.submit()


}


form.addEventListener('submit', handleSubmit)

