const textArea = document.querySelector(".caja_texto");
const mensaje = document.querySelector(".mensaje");
const botonEncriptar = document.getElementById("boton_encriptador");
const botonDesencriptar = document.getElementById("boton_desencriptar");
const botonCopiar = document.getElementById("boton_copiar");
const placeholders = document.querySelectorAll(".mensaje-placeholder");

botonEncriptar.addEventListener("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    boton_encriptador();
});

botonDesencriptar.addEventListener("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    boton_desencriptador();
});

botonCopiar.addEventListener("click", copiarTexto);

textArea.addEventListener("input", actualizarVisibilidad);
mensaje.addEventListener("input", actualizarVisibilidad);

function validarTexto(texto) {
    const textoLimpio = texto.trim(); // Elimina espacios al inicio y al final
    // Nueva expresión regular que debería funcionar mejor en móviles
    const regex = /^[a-z]+(?:\s+[a-z]+)*$/;
    return regex.test(textoLimpio);
}

function boton_encriptador() {
    const texto = textArea.value;
    if (validarTexto(texto)) {
        const textoEncriptado = encriptar(texto);
        mensaje.value = textoEncriptado;
        actualizarVisibilidad();
    } else {
        alert("Por favor, ingresa solo letras minúsculas y sin caracteres especiales.");
    }
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();
    
    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    } 

    return stringEncriptada;
}

function boton_desencriptador() {
    const texto = textArea.value;
    if (validarTexto(texto)) {
        const textoDesencriptado = desencriptar(texto);
        mensaje.value = textoDesencriptado;
        actualizarVisibilidad();
    } else {
        alert("Por favor, ingrese solo letras minúsculas y sin caracteres especiales.");
    }
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["enter", "e"], ["imes", "i"], ["ai", "a"], ["ober", "o"], ["ufat", "u"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();
    
    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][0])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    } 

    return stringDesencriptada;
}

function copiarTexto() {
    mensaje.select();
    document.execCommand("copy");
}

function actualizarVisibilidad() {
    const mensajeTieneTexto = mensaje.value.trim().length > 0;

    if (mensajeTieneTexto) {
        botonCopiar.style.display = "block";
        mensaje.classList.add("ocultar-muneco");
        placeholders.forEach(placeholder => placeholder.style.display = "none");
    } else {
        botonCopiar.style.display = "none";
        mensaje.classList.remove("ocultar-muneco"); 
        placeholders.forEach(placeholder => placeholder.style.display = "block");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    mensaje.classList.remove("ocultar-muneco"); 
});
