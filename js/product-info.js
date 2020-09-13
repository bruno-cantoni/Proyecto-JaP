var product = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productInfoGallery").innerHTML = htmlContentToAppend;
    }
}

function showComentaries(array) {
   
   let htmlContentToAppend = "";
//recorro el largo del objeto y por cada posición guardo lo obtenido del JSON de comentarios para luego poder acceder al valor deseado
    for (let i = 0; i < array.length; i++) {
        let comentariesSrc = array[i];
        let score = '';
         for( let i = 0; i< comentariesSrc.score; i++){
            score += '<span class= "fa fa-star checked"></span>'
            }
             for (let j = comentariesSrc.score; j < 5; j++){
                score += '<span class= "fa fa-star"></span>'
             }
        htmlContentToAppend += `
        <div>
            <div>
            <hr>
            <p class="mb-1"><strong>` + comentariesSrc.user + `</strong>  &nbsp;` + score +
                     
            `<br> <span>` + comentariesSrc.dateTime + `</span></p>               
              </div>         
        </div>
        <br>
        <p>` + comentariesSrc.description + `</p>  
        <br>
        
        `
        console.log("Score: " + comentariesSrc.score )
        document.getElementById("productInfoComentaries").innerHTML = htmlContentToAppend;
        
    }

}


function AgregoNuevoCom(){ 
    var htmlContentToAppend = "";
    var cadenaComent = sessionStorage.getItem("comentarioGuardado");

        var asterisco = [];
    for (let i = 0; i < cadenaComent.length; i++ ){
        if (cadenaComent[i].toLowerCase() === '*') 
        asterisco.push(i);
    }
    
        if (asterisco.length === 0){
            NombreComArr = cadenaComent.split('|')[0];
            scoreArr = cadenaComent.split('|')[1];
            ComentarioArr = cadenaComent.split('|')[2];
            dateTimeArr = cadenaComent.split('|')[3];
        
            console.log("Nombre1:"+ NombreComArr);
        
            // Inserto los comentarios agregados en el form
            htmlContentToAppend += `
            <div>
                <div>
                <hr>
                <p class="mb-1"><strong>` + NombreComArr + `</strong>  &nbsp;` + scoreArr +
                        
                `<br> <span>` + dateTimeArr + `</span></p>               
                </div>         
            </div>
            
            <p>` + ComentarioArr + `</p>  
            <br>
            `
        
            document.getElementById("nuevosComentarios").innerHTML = htmlContentToAppend;
        } else
        {
            var prueba = '';
                    
            for (let i = 0; i <= asterisco.length; i++){
               prueba = cadenaComent.split('*')[i];
                NombreComArr = prueba.split('|')[0];
                scoreArr = prueba.split('|')[1];
                ComentarioArr = prueba.split('|')[2];
                dateTimeArr = prueba.split('|')[3];
            
                
            
                // Inserto los comentarios agregados en el form
                htmlContentToAppend += `
                <div>
                    <div>
                    <hr>
                    <p class="mb-1"><strong>` + NombreComArr + `</strong>  &nbsp;` + scoreArr +
                            
                    `<br> <span>` + dateTimeArr + `</span></p>               
                    </div>         
                </div>
                
                <p>` + ComentarioArr + `</p>  
                <br>
                `
            
                document.getElementById("nuevosComentarios").innerHTML = htmlContentToAppend;
            }

        }

}





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e){
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj){
        if (resultObj.status === "ok") {


            product_info = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productCategoryHTML = document.getElementById("productCategory");
            

            //Guardamos la info con las referencias del JSON PRODUCT_INFO_URL en un arreglo para
            productNameHTML.innerHTML = product_info.name;
            productDescriptionHTML.innerHTML = product_info.description;
            productSoldCountHTML.innerHTML = product_info.soldCount;
            productCostHTML.innerHTML = product_info.cost;
            productCurrencyHTML.innerHTML = product_info.currency;
            productCategoryHTML.innerHTML = product_info.category;
           
            //LLamo a la función que muestra las imagenes y le paso las imagenes 
            showImagesGallery(product_info.images);
            
    }    
     //Declaro un arreglo que guarda los productos relacionados para luego poder recorrerlos
     // y mostrar las imagenes que estan en el JSON PRODUCTS_URL
        var ArrProdRel = product_info.relatedProducts;
       // Obtengo las referencias del JSON PRODUCTS_URL.
                getJSONData(PRODUCTS_URL).then(function (resultObj){
                    if (resultObj.status === "ok") {
                        
                        product = resultObj.data;
                        let htmlContentToAppend = "";
                       
                        //Por cada elemento en el array previamente guardado con los product_info.relatedProducts ejecuto la función de mostrar las imagenes                       
                        ArrProdRel.forEach(function (arrayItem){ 
                               //Tomo como ejemplo la función que muestra imagenes "showImagesGallery"
                                htmlContentToAppend += `
                                <div class="col-lg-3 col-md-4 col-6">
                                    <div class="d-block mb-4 h-100">
                                        <img class="img-fluid img-thumbnail" src="` + product[arrayItem].imgSrc + `" alt="">
                                    </div>
                                </div>
                                `
                        
                                document.getElementById("productRelatedImages").innerHTML = htmlContentToAppend;
                            });
                           
                    }
                    
                });
                           
             // Utilizamos otro getJSONData para poder obtener e insertar los comentarios debajo de los productos

            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    //obtenemos los comentarios y guaramos la información en productComments -> arreglo que se le pasa a la funcion showComentaries.
                    productComments = resultObj.data;

                    showComentaries(productComments);
                }



            });


            //Control de comentario guardado en sessionStorage para meterlo en el product-info
            if (sessionStorage.getItem("comentarioGuardado") !== null){
            AgregoNuevoCom()
            }



               

 });

 document.getElementById("texto").addEventListener("keydown", function(e){

         // Test for the key codes you want to filter out.
         if (e.keyCode === 106 || e.keyCode === 171 || e.keyCode === 172 ){
            alert('No se permite ingresar ni caracter * ni el | en este campo');
             
            e.preventDefault();
         }
        });
     
 
// Hacer if para meter los valores en la pagina de product- info html.

 document.getElementById("enviarComentarios").addEventListener("click", function(){

    
 
    
    
    let NombreCom = sessionStorage.getItem("usuario");
    let ScoreCom = document.getElementById("valoracion").value;
    let Comentario = document.getElementById("texto").value;
    let score = '';
    // misma lógica aplicada a los comentarios traidos del JSON PRODUCT_INFO_URL
    for (var i=0; i< ScoreCom;i++){
        score += '<span class= "fa fa-star checked"></span>'
    }
        for (let j = ScoreCom; j < 5; j++){
            score += '<span class= "fa fa-star"></span>'
        }

    
    // Función para obtener correctamente la fecha la cual se envia el comentario
    //Resta investigar bien como funciona, si se sabe que el getMonth trabaja del 0 al 11
    var Hoy = new Date();
    var dateTime =  Hoy.getFullYear()+'-'+
                        ((Hoy.getMonth()+1)<10?("0"+(Hoy.getMonth()+1)):(Hoy.getMonth()+1))+'-'+
                        (Hoy.getDate()<10?("0"+Hoy.getDate()):Hoy.getDate())+' '+
                        (Hoy.getHours()<10?("0"+Hoy.getHours()):Hoy.getHours())+ ":" +
                        (Hoy.getMinutes()<10?("0"+Hoy.getMinutes()):Hoy.getMinutes())+ ":" +
                        (Hoy.getSeconds()<10?("0"+Hoy.getSeconds()):Hoy.getSeconds());        
    
/// posible otra solucion. si comentario el valor de comentarioGuardado sea igual al mismo entonces no hacer nada, si no dentro de un while meter un nuevo nombre con el 
//valor del comentario
var globalComent = '';
var comentario = NombreCom + "|" + score + "|" + Comentario + "|" + dateTime;    
  //con esto agregamos mas comentarios sin que se sobreescriban
  
  if (sessionStorage.getItem("comentarioGuardado") !== null){
  globalComent = sessionStorage.getItem("comentarioGuardado");

  
}

if (globalComent !== ''){
globalComent += "*" + comentario;   
} else {
    globalComent += comentario;

}
  sessionStorage.setItem("comentarioGuardado", globalComent);
  AgregoNuevoCom();  
   
   // Limpiando los imput y dejando la valoración en 1 
    document.getElementById("texto").value = "";                
   // document.getElementById("nombre").value = "";
    document.getElementById("valoracion").value = 1;
    
 
    
});


}); 






