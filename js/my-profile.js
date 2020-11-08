PerfilesStorage = [];


function Mostrar_Datos(){


 PerfilesStorage = JSON.parse(localStorage.getItem("Mi-Perfil"));
 
 //Misma logica utilizada y explicada mas abajo
  var bandera = false;
  var indice;
    if (PerfilesStorage != null){
    for (let i=0; i<PerfilesStorage.length;i++){ 
      if(PerfilesStorage[i].ePerfil == sessionStorage.getItem('usuario')){
        bandera = true;
        indice = i;
        break;
  
     }           
    } 
  }

  if (bandera == true){
    document.getElementById("primerNombre").value = PerfilesStorage[indice].pNombre; 
    document.getElementById("segundoNombre").value = PerfilesStorage[indice].sNombre;
    document.getElementById("primerApellido").value = PerfilesStorage[indice].pApellido;
    document.getElementById("segundoApellido").value = PerfilesStorage[indice].sApellido;
    //document.getElementById("emailPerfil").value = PerfilesStorage[indice].ePerfil;
    document.getElementById("telefonoContacto").value = PerfilesStorage[indice].tContacto;
    document.getElementById("imagenSubir").innerHTML =  PerfilesStorage[indice].imagen ;
    



   }
 
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  // Aca lo que hago es cargar en el campo email, el usuario logueado actualmente. Este valor lo tomo y lo cargo en el perfil mas abajo
  document.getElementById("emailPerfil").value = sessionStorage.getItem('usuario');
  
  // La idea de esta función es que al cargar la pagina se carguen los valores que esten guardados en el local storage.
  Mostrar_Datos();
   
}); 

//Agrego un event listener en el boton "Guardar datos"
document.getElementById("guardarPerfil").addEventListener("click", function(){
 
  if (document.getElementById("primerNombre").value == '' || document.getElementById("primerApellido").value  == '' || (document.getElementById("telefonoContacto").value == '' || document.getElementById("telefonoContacto").value.length < 8 || document.getElementById("telefonoContacto").value.length > 9)){
    $('#alertCamposObli').slideDown()
      setTimeout(() => {  $('#alertCamposObli').slideUp() }, 4000);
  }else {

  console.log ("VALOR : "+document.getElementById("primerApellido").value);
//Obtengo valores de los campos en la pantalla Mi perfil
  let primerNombre = document.getElementById("primerNombre").value;
  let segundoNombre = document.getElementById("segundoNombre").value;
  let primerApellido = document.getElementById("primerApellido").value;
  let segundoApellido = document.getElementById("segundoApellido").value;
  let emailPerfil = document.getElementById("emailPerfil").value;
  let telefonoContacto = document.getElementById("telefonoContacto").value;
  let imagenPerfil = document.getElementById("imagenPerfil").value;  

  //Objeto Perfil para guardar los datos de la persona y luego poder guardarlos en el localstorage
  var Perfil = {
    
    pNombre: primerNombre,
    sNombre: segundoNombre,
    pApellido: primerApellido,
    sApellido: segundoApellido,
    ePerfil: emailPerfil,
    tContacto: telefonoContacto,
    imagen: imagenPerfil

  };
  
//Obtengo los valores que tiene el localstorage
  PerfilesStorage = JSON.parse(localStorage.getItem("Mi-Perfil"));
  

    // Al presionar el botón guardar datos cargo los valores ingresados en los campos correspondientes
   //MOSTRANDO EN WEB Obtengo el valor del objeto Perfil para mostrarlo en la web. 
  document.getElementById("primerNombre").value = Perfil.pNombre;
  document.getElementById("segundoNombre").value = Perfil.sNombre;
  document.getElementById("primerApellido").value = Perfil.pApellido;
  document.getElementById("segundoApellido").value = Perfil.sApellido;
  document.getElementById("emailPerfil").value = Perfil.ePerfil;
  document.getElementById("telefonoContacto").value = Perfil.tContacto;
  //document.getElementById("imagenSubir").innerHTML =  Perfil.imagen;
  
// Inicializo bandera, este me ayuda a verificar si el correo del local storage y el del perfil ingresado es el mismo
var bandera = false;
//Indice guarda la posición del arreglo donde se encuentra el correo del perfil logueado en el caso de que este
//luego se utiliza para poder almacenar los datos correspondientes en ese lugar
var indice ;
  if (PerfilesStorage != null){
  for (let i=0; i<PerfilesStorage.length;i++){ 
    if(PerfilesStorage[i].ePerfil == Perfil.ePerfil){
      bandera = true;
      indice = i;
      break;

   }           
  } 
}

//Para el caso del que LocalStorage este vacio, inicializamos el array para que cuando hagamos el push no falle  
if (PerfilesStorage == null)
    PerfilesStorage = [];
//Aqui decimos si bandera es true guardemos en la posicion del array indicada por el indice guardado al coincidir los correos
//la bandera cambia de valor de false a true cuando el email del local storage coincide con el que esta logueado
if (bandera == true){
   PerfilesStorage[indice].pNombre = Perfil.pNombre;
   PerfilesStorage[indice].sNombre = Perfil.sNombre;
   PerfilesStorage[indice].pApellido = Perfil.pApellido;
   PerfilesStorage[indice].sApellido = Perfil.sApellido;
   PerfilesStorage[indice].ePerfil = Perfil.ePerfil;
   PerfilesStorage[indice].tContacto = Perfil.tContacto;
   PerfilesStorage[indice].imagen = Perfil.imagen;
   $('#okAlertAct').slideDown()
      setTimeout(() => {  $('#okAlertAct').slideUp() }, 3000);
  }

console.log("PERFIL: "+ JSON.stringify(Perfil));
//Si bandera es false, significa que no esta el correo ingresado en el local storage y por ende hacemos un push del perfil ingresado actualmente
// con sus valores en cada campo al array que luego guardamos en el localstorage
if (bandera == false){
PerfilesStorage.push(Perfil);
$('#okAlertGuardado').slideDown()
      setTimeout(() => {  $('#okAlertGuardado').slideUp() }, 3000);
}

 // guardo valores del perfil luego de pasarlo a JSON  PARA EL FINAL
 localStorage.setItem("Mi-Perfil", JSON.stringify(PerfilesStorage)); 
}


//llamo a la función que muestra los datos para actualizar la pagina con la imagen
Mostrar_Datos();

//limpio el campo asi no se ve la URL que no queda estetico
document.getElementById("imagenPerfil").value = '';

});


// Defino aqui en mas los cierres ocultamientos de las alertas
  
  document.getElementById("close").addEventListener("click",function(){
    $("#okAlertAct").hide();   
    $("#okAlertGuardado").hide();
    $("#alertCamposObli").hide();        
    });