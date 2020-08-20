

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});
function checkForm(){
   
    //Obtengo los valores de los campos tanto de Email como del Password
    let usuario = document.getElementById("usuario").value;
    let clave = document.getElementById("clave").value

    //Declaro la variable con la regular expresion que controla 
    //si se ingreso bien o no un correo valido en el campo email    
    var RegEx= new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    console.log( "Valor: "+ usuario);
    console.log("Regex: " + RegEx.test(usuario));
    console.log("Regex2: " + !RegEx.test(usuario));
    

        // Primero chequeo que los dos campos tienen valor y de no tener envio una alerta
        if ( usuario === "" && clave === "" ){
            alert("Para ingresar debe completar ambos campos");
            //Aqui se controla que el campo mail tenga un valor, que sea valido y que no haya datos en el campo password 
        }else if ( clave === "" &&  !RegEx.test(usuario) ){
                  alert("Por favor, ingrese un email válido y complete el campo contraseña");

                } else if ( usuario !== "" && clave === "" && RegEx.test(usuario) ){
                           alert("Por favor, ingrese un valor el campo contraseña");

                        } else if ( usuario === "" && clave !== "" ){
                                   alert("Por favor, Ingrese su email");
                                    
                                }else if ( clave !== "" &&  !RegEx.test(usuario) ){
                                          alert("Por favor, ingrese un email válido");
                                   
                                }       else if (usuario !== "" && clave !== "" &&  RegEx.test(usuario) ){
                                              alert("Bienvenido: "+ usuario);                                                                                 
                                              sessionStorage.setItem('usuario', usuario);

                                              window.open('index.html');        
                                }
}
 

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
 // alert("Bienvenido: "+ profile.getName());                                                                                 
  //window.open('index.html');
  var UsuarioGoogle = profile.getName();

  sessionStorage.setItem("usuario", JSON.stringify(UsuarioGoogle));
}

