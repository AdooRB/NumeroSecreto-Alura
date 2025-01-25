let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteado = [];
let numeroMaximo = 0;


condicionesIniciales();

//Agregar texto a un elemento HTML
function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

//Verifica el valor del usuario con el número de screto ---o--- Asigna el modo fácil (1 - 10)
function verificarIntento_dif10(){
    
    if(numeroMaximo == 0){
        numeroMaximo = 10;
        condicionesIniciales();
    }else{
    
        let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
        
        if(numeroDeUsuario === numeroSecreto){
            asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}.`);
            habilitarElementoHTML('#reiniciar',true);
            //Cuando el Usuario no acertó
        } else {
            
            if(numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p', 'El número es menor');
            } else {
                asignarTextoElemento('p', 'El número es mayor')
            }
            intentos++;
            limpiarCaja();
        }
        return;
    }
}


//Genera el número secreto dentro del rango de cada modo de juego
//Incluye los números ya proporcionados(adivinados) en una lista.
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo) + 1;

    //Si ya sorteamos todos los números
    if(listaNumerosSorteado.length == numeroMaximo ){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    }else{
        // Si el numero generado está en una lista
        if(listaNumerosSorteado.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }else{
            listaNumerosSorteado.push(numeroGenerado);
            return numeroGenerado;
        }
    }

    
}

//Quita cualquier valor detro del elemento entrada de usuario
function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}


function condicionesIniciales(){
    asignarTextoElemento('h1','Juego del número secreto');

    if(numeroMaximo == 0){
        plantillaModoDeJuego();

    }else{    
        esconderElememtoHTML('input', false);
        quitarBackground('#intentoss');
        quitarBackground('#reiniciar');
        habilitarElementoHTML('#reiniciar', false)
        asignarTextoElemento('#intentoss', 'Intentar');
        asignarTextoElemento('#reiniciar','Nuevo juego');
        asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
        numeroSecreto = generarNumeroSecreto();
        intentos = 1;

    }
}

//Reinicia el juego, generando un nuevo número --o-- Asigna el modo dificil (1 - 100)
function reiniciarJuego_dif100(){
    if(numeroMaximo == 0){
        numeroMaximo = 100;
        condicionesIniciales();
        
    }else{
        //limpiar caja
        limpiarCaja();
        //Indicar mensja de intervalos de números
        //Generar nuevo número y mostrarlos al jugador
        //Inicializar el número de intentos
        condicionesIniciales();
        //Deshabitar el botón de nuevo juego
        document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    }
}

//Limpia y reoderna la visualización para seleccionar el Modo de Juego
function plantillaModoDeJuego(){
    
    esconderElememtoHTML('input', true);
    colorEnBackground('#intentoss', '#17a589');
    habilitarElementoHTML('#reiniciar', true);
    colorEnBackground('#reiniciar', '#cb4335');
    asignarTextoElemento('p','Seleccione la Dificultad que desea emplear.');
    asignarTextoElemento('#intentoss','Modo Facil');
    asignarTextoElemento('#reiniciar','Modo Dificil');

}

function esconderElememtoHTML(elemento, estado){
    document.querySelector(elemento).hidden = estado;
}

function habilitarElementoHTML(elemento, estado){
    if(estado == true) {
        document.querySelector(elemento).removeAttribute('disabled');
    }else{
        document.querySelector(elemento).setAttribute('disabled', 'true');
        
    }
}

function colorEnBackground(elemento, color){
    document.querySelector(elemento).style.background = color;
}

function quitarBackground(elemento){
    document.querySelector(elemento).style.removeProperty('background');
}