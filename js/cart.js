var product1_subtotal = '';
var product2_subtotal = '';
x = new Boolean(false);
var conteoCantProd = 0;
//Muestro los datos que traigo del json
//FUNCANDO!!

function showCart(array){
  htmlContentToAppend = "";
  let costo = 0;
  for (let i = 0; i < array.articles.length; i++){ 
   
    if (array.articles[i].currency == 'USD'){
       costo = parseInt(array.articles[i].unitCost * 40)
      
    } else
          costo = parseInt(array.articles[i].unitCost)
          
    htmlContentToAppend += `
    <tr id="fila_`+i+`">
      <th scope="row">`+ [i+1] +`</th> 
    <td> 
      <img src="` + array.articles[i].src + `" height=60px width=60px>
    </td>
    <td>` + array.articles[i].name + ` </td>
       <td><strong>`+ array.articles[i].currency +`</strong> `+ `<data id="unitCost`+[i+1]+`" value = `+ array.articles[i].unitCost +`>`+ array.articles[i].unitCost + ` </data> </td>
    <td> <input type = "number" min="0" id="product`+[i+1]+`_count" 
              class="form-control col-md-4" value = `+ array.articles[i].count + `> </td> 
                 <td> <span id="product`+[i+1]+`_subtotal"><strong>UYU</strong> `+ costo * array.articles[i].count  +` </span> </td> 
                 <td><button onclick="EliminarFila(`+i+`)" type="button" class="btn btn-outline-danger btn-sm">Eliminar</button> </td>
    </tr>
  `
    document.getElementById("articlesWrapper").innerHTML = htmlContentToAppend;
    
    product1Subtotal = (array.articles[0].unitCost * array.articles[0].count);
    product2Subtotal = (array.articles[1].unitCost * 40) * array.articles[1].count;
    

    conteoCantProd += array.articles[i].count;

    document.getElementById("cartProducts").innerHTML = conteoCantProd;   

           
   }

}


//FUNCIONANDO!!!!!

function updateCost(){

  if(document.getElementById('premiumRadio').checked){

    document.getElementById("productSubtotalCost").innerHTML = `<strong>UYU</strong> ` + parseInt(product1Subtotal + product2Subtotal);
    document.getElementById("shipCost").innerHTML = `<strong>UYU</strong> ` + parseInt((product1Subtotal + product2Subtotal) * 0.15);
    document.getElementById("totalCost").innerHTML =`<strong>UYU</strong> ` + parseInt((product1Subtotal + product2Subtotal) + (product1Subtotal + product2Subtotal) * 0.15);


   } else if (document.getElementById('expressRadio').checked){

      document.getElementById("productSubtotalCost").innerHTML =`<strong>UYU</strong> ` + parseInt(product1Subtotal + product2Subtotal);
      document.getElementById("shipCost").innerHTML = `<strong>UYU</strong> ` + parseInt((product1Subtotal + product2Subtotal) * 0.07);
      document.getElementById("totalCost").innerHTML = `<strong>UYU</strong> ` + parseInt((product1Subtotal + product2Subtotal) + (product1Subtotal + product2Subtotal) * 0.07);
   }  else if (document.getElementById('standarRadio').checked){

    document.getElementById("productSubtotalCost").innerHTML = `<strong>UYU</strong> ` + parseInt(product1Subtotal + product2Subtotal);
    document.getElementById("shipCost").innerHTML = `<strong>UYU</strong> ` + parseInt((product1Subtotal + product2Subtotal) * 0.05);
    document.getElementById("totalCost").innerHTML = `<strong>UYU</strong> ` + parseInt((product1Subtotal + product2Subtotal) + (product1Subtotal + product2Subtotal) * 0.05);
  }
  


}

function EliminarFila(id){  
  let miFila = document.getElementById("fila_"+id);
  miFila.remove();
  
// Para esta versión del proyecto al tener 2 productos estaticos (de momento), consulto con un if para verificar cual es la fila 
//fue eliminada y actualizo el subtotal
  if (parseInt(id+1) == 1 ){
    product1Subtotal = 0;
  }else if (parseInt(id+1)  == 2){
    product2Subtotal = 0;

  }
  //Llamo a la función para actualizar en pantalla los valores de los productos.
  updateCost();
}


//Implemento funcion para poder obtener el metodo seleccionado e insertarlo debajo o al lado de "Forma de Pago"

function ObtenerFormaPago(valor){
  
  if(valor == "Banco" ){
document.getElementById("metodoSeleccionado").innerHTML =`<hr class="mb-4">` + "<strong>Usted selecciono</strong>: " + `<i class="fas fa-university"></i> `+ "Transferencia Bancaria" +`<hr class="mb-4">`;
//De esta manera lo que hacemos es "presionar" el boton con id "paymentModal", este botón es el que cierra el modal de selección de pago
$('#paymentModal').click();
  } else if (valor == "Tarjeta"){
    document.getElementById("metodoSeleccionado").innerHTML = `<hr class="mb-4">` + "<strong>Usted selecciono</strong>: " + `<i class="fas fa-credit-card mr-2"></i> `+ "Tarjeta de credito" +`<hr class="mb-4">`;
    $('#paymentModal').click();
  }else {
    if (document.getElementById("radioAbitab").checked){
      document.getElementById("metodoSeleccionado").innerHTML = `<hr class="mb-4">` + "<strong>Usted selecciono</strong>: " + `<i class="fas fa-receipt mr-2"></i> `+ "Abitab " + `<img src="img/Abitab.jpg" height=60px width=60px class="rounded">`  +`<hr class="mb-4">`;
    }else
    document.getElementById("metodoSeleccionado").innerHTML = `<hr class="mb-4">` + "<strong>Usted selecciono</strong>: " + `<i class="fas fa-receipt mr-2"></i> `+ "Red Pagos " + `<img src="img/Redpagos.jpg" height=60px width=60px class="rounded">`  +`<hr class="mb-4">`;
    $('#paymentModal').click();
   
  }

  document.getElementById("mPago").innerHTML = "Cambiar metodo de pago";


}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

      getJSONData(CART_INFO2_URL).then(function (resultObj){

        if (resultObj.status === "ok") {
        
                cart_info = resultObj.data;


         showCart(cart_info);
         updateCost();  
          
        }
        
        
///FUNCIONANDO VOLVER A ACTIVAR SI NO FUNCIONA LO DEL YOEL

        document.getElementById("product1_count").addEventListener("change", function(){

          let cantidad = document.getElementById("product1_count").value ;
          let cantidad2 = document.getElementById("product2_count").value ;
          let conteoCantProd =  parseInt(cantidad) + parseInt(cantidad2);
        
          let costoUnidad = document.getElementById("unitCost1").value;                 
          product1Subtotal = parseInt((costoUnidad * cantidad));
         
          document.getElementById("product1_subtotal").innerHTML = `<strong>UYU</strong> `+ product1Subtotal ;  
          document.getElementById("cartProducts").innerHTML = conteoCantProd;


        updateCost();     
        
        });


        document.getElementById("product2_count").addEventListener("change", function(){


          let cantidad = document.getElementById("product2_count").value ;
          let cantidad2 = document.getElementById("product1_count").value ;
          let conteoCantProd =  parseInt(cantidad) + parseInt(cantidad2);

          let costoUnidad = document.getElementById("unitCost2").value;
          product2Subtotal = parseInt((costoUnidad * 40) * cantidad);

        

         document.getElementById("product2_subtotal").innerHTML =`<strong>UYU</strong> ` + product2Subtotal ;  
         document.getElementById("cartProducts").innerHTML = conteoCantProd;

         updateCost();    
        
        
        });


    });

      // Aqui se insertan con el innerHTML los valores en la sección COSTOS con el 15% por el envio Premium

    document.getElementById("premiumRadio").addEventListener("change",function(){
      updateCost();     
    });
    // Aqui se insertan con el innerHTML los valores en la sección COSTOS con el 7% por el envio Premium  
    document.getElementById("expressRadio").addEventListener("change",function(){
      updateCost();            
    });
   // Aqui se insertan con el innerHTML los valores en la sección COSTOS con el 5% por el envio Premium
    document.getElementById("standarRadio").addEventListener("change",function(){
      updateCost();          
    });

  //Escondo cuando se presiona en las "x" de las alertas ya que son divs que no se muestran, solo se utilizan para 
  //mostrar alertas      
    document.getElementById("closex").addEventListener("click",function(){
      $("#dangerAlert").hide();      
      });

    document.getElementById("closexOk").addEventListener("click",function(){
     $('#okAlert').hide();        
        });



   // Agrego el evento al presionar el botón "proceder con el pago" de bancos
    document.getElementById("bankgo").addEventListener("click",function(){
      //obtengo el valor del option seleccionado, primero le agrego la key "value" en el HTML.
      let x = document.getElementById("ccmonth").value;
      //abro el banco seleccionado
      window.open(x,"_blank");
      
      ObtenerFormaPago("Banco");
     });  


     document.getElementById("mesTarjeta").addEventListener("click",function(){

      valor = document.getElementById("mesTarjeta").value;
      // Aca agrego el 0 delante del mes para que quede en el formato correcto
      if (valor < 10 && valor > 1){
        valor = "0" + valor;        
        document.getElementById("mesTarjeta").value = valor;
        //Para el valor 1 se tuvo que controlar de esta forma si no la web mostraba "000001" cuando presionaba la flecha hacia abajo
      } else if (valor == 1){
          document.getElementById("mesTarjeta").value = "01";
      }
     });

      //          PARA PROXUMA ENTREGA ARREGLAR PARA QUE NO SE PUEDA INGRESAR LETRAS EN ESTE CAMPO (no se pone "type= number" porque no funciona el maxlength ni el minlength)
    // Aqui se obtiene el valor al soltar la tecla del Id de "numeroTarjeta" el valor lo guardo en la variable val,
    //la variable la comparo a 16 ya que si hago esto antes el requerido falla.  
    $('#numeroTarjeta').on('keyup', function(e){
          
      var val = $(this).val();
      if(val.length == 16 ){
       var newval = '';
       // Lo que hacemos aca es eliminar los espacios en el caso de que hayan
         val = val.replace(/\s/g, '');
        
         for(var i=0; i < val.length; i++) {
         if(i%4 == 0 && i > 0) newval = newval.concat(' ');
           newval = newval.concat(val[i]);
         }
        $(this).val(newval);
      }
     });          
      //Aqui controlo que los campos esten seleccionados para luego llamar a la funcion ObtenerFormaPago e insertarlo en el HTML
     document.getElementById("okTarjetaCredito").addEventListener("click",function(){
      let mes = document.getElementById("mesTarjeta").value;
      let año = document.getElementById("añoTarjeta").value;
      let nombre = document.getElementById("titularTarjeta").value;
      let numero = document.getElementById("numeroTarjeta").value;
      let cvv = document.getElementById("cvvTarjeta").value;

      if (mes !== " " && año !== " " && nombre !== " " && cvv !== " " && (numero !=="" && numero.length == 16)){
        ObtenerFormaPago("Tarjeta");
      }else  {
      //Muestro la alerta 2 que tiene un tama{o diferente a la alerta 1
      $('#dangerAlert2').slideDown()
      setTimeout(() => {  $('#dangerAlert2').slideUp() }, 3000);
        }
       
       });   

       // llamo a la función obtener fomra de pago para cargar la red de cobranza elegida
     document.getElementById("okRedCobranzas").addEventListener("click",function(){
      ObtenerFormaPago("RedCobranza");
      });



  document.getElementById("btnFinalizar").addEventListener("click",function(){
 
  let street = document.getElementById("street").value;
  let streetNumber = document.getElementById("streetNumber").value;
  let streetcorner = document.getElementById("streetcorner").value;
  let formaDePago = document.getElementById("mPago").textContent;
  
      // Primero chequeo que los dos campos tengan algun valor y la forma de pago haya sido seleccionada, igualandola a "cambiar metodo de pago" ya que este valor queda asi cuando
      // se selecciona un metodo
    if ( street === "" || streetNumber === "" || streetcorner === "" || formaDePago !== "Cambiar metodo de pago"){
        //Muestro el error y luego de 6 segundos quito el cartel si es que el cliente no presiono aun la "x" en pantalla 
       $('#dangerAlert').slideDown()
       setTimeout(() => {  $('#dangerAlert').slideUp() }, 6000);
              
       
    } else {
      //Obtenemos el valor msg que tiene el JSON del desafiate para cargarlo en el mensaje final.!
      getJSONData(CART_BUY_URL).then(function(resultObj){

        if (resultObj.status === "ok"){
          var msj = resultObj.data;
          console.log("CARTBUY: "+ msj.msg);
        }     
        // Agrego el texto al parrafo para luego llamar a la alerta con este texto pre cargado
        document.getElementById("ventaOk").innerHTML = msj.msg + " Te redireccionaremos a la pagina principal.";

      });
      //llamo a la alerta success con slidedown
     $('#okAlert').slideDown();
     //luego de "x" segundos levantamos el cartel de alerta y  esperamos el replace por el index.
     setTimeout(() => { $('#okAlert').slideUp(); }, 6000);
     setTimeout(() => { location.replace('index.html'); }, 8000);
     
  }

  
});
    

});