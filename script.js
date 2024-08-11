const textArea = document.querySelector(".caja_texto");
const mensaje = document.querySelector(".mensaje");
const botonEncriptar = document.getElementById("boton_encriptador");
const botonDesencriptar = document.getElementById("boton_desencriptar");
const botonCopiar = document.getElementById("boton_copiar");
const placeholders = document.querySelectorAll(".mensaje-placeholder");

botonEncriptar.addEventListener("click", boton_encriptador);
botonDesencriptar.addEventListener("click", boton_desencriptador);
botonCopiar.addEventListener("click", copiarTexto);

textArea.addEventListener("input", actualizarVisibilidad);
mensaje.addEventListener("input", actualizarVisibilidad);

function validarTexto(texto) {
    const regex = /^[a-z\s]*$/; // Solo permite letras minúsculas sin acentos y espacios
    return regex.test(texto);
}

function boton_encriptador (){
    const texto = textArea.value;
    if (validarTexto(texto)) {
        const textoEncriptado = encriptar(texto);
        mensaje.value = textoEncriptado;
        actualizarVisibilidad();
    } else {
        alert("Solo se permiten letras minúsculas sin acentos ni caracteres especiales.");
    }
}

function encriptar(stringEncriptada){
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();
    
    for(let i = 0; i < matrizCodigo.length; i++){
        if(stringEncriptada.includes(matrizCodigo[i][0])){
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    } 

    return stringEncriptada;
}

function boton_desencriptador (){
    const texto = textArea.value;
    if (validarTexto(texto)) {
        const textoDesencriptado = desencriptar(texto);
        mensaje.value = textoDesencriptado;
        actualizarVisibilidad();
    } else {
        alert("Solo se permiten letras minúsculas sin acentos ni caracteres especiales.");
    }
}

function desencriptar(stringDesencriptada){
    let matrizCodigo = [["enter", "e"], ["imes", "i"], ["ai", "a"], ["ober", "o"], ["ufat", "u"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();
    
    for(let i = 0; i < matrizCodigo.length; i++){
        if(stringDesencriptada.includes(matrizCodigo[i][0])){
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    } 

    return stringDesencriptada;
}

function copiarTexto() {
    mensaje.select();
    document.execCommand("copy");
}

document.addEventListener("DOMContentLoaded", () => {
    mensaje.classList.remove("ocultar-muneco"); // Mostrar la imagen al cargar la página
});

function actualizarVisibilidad() {
    const mensajeTieneTexto = mensaje.value.trim().length > 0;

    if (mensajeTieneTexto) {
        botonCopiar.style.display = "block";
        mensaje.classList.add("ocultar-muneco"); // Ocultar la imagen solo cuando haya texto
        placeholders.forEach(placeholder => placeholder.style.display = "none");
    } else {
        botonCopiar.style.display = "none";
        mensaje.classList.remove("ocultar-muneco"); // Mostrar la imagen si el mensaje está vacío
        placeholders.forEach(placeholder => placeholder.style.display = "block");
    }
}
