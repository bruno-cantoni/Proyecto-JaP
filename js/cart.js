var product1_subtotal = '';
var product2_subtotal = '';
x = new Boolean(false);

//Muestro los datos que traigo del json

function showCart(array){
  htmlContentToAppend = "";
  let costo = 0;
  for (let i = 0; i < array.articles.length; i++){ 
    //A futuro idea para meter mas de 2 articulos!!
    //productos = [];
    //productos.push("sub_"+(i+1));

    if (array.articles[i].currency == 'USD'){
       costo = parseInt(array.articles[i].unitCost * 40)
      
    } else
          costo = parseInt(array.articles[i].unitCost)
          
    htmlContentToAppend += `
    <tr>
      <th scope="row">`+ [i+1] +`</th> 
    <td> 
      <img src="` + array.articles[i].src + `" height=60px width=60px>
    </td>
    <td>` + array.articles[i].name + ` </td>
       <td><strong>`+ array.articles[i].currency +`</strong> `+ `<data id="unitCost`+[i+1]+`" value = `+ array.articles[i].unitCost +`>`+ array.articles[i].unitCost + ` </data> </td>
    <td> <input type = "number" id="product`+[i+1]+`_count" 
              class="form-control col-md-4" value = `+ array.articles[i].count + `> </td> 
                 <td> <span id="product`+[i+1]+`_subtotal"><strong>UYU</strong> `+ costo * array.articles[i].count  +` </span> </td> 
    </tr>
  `
    document.getElementById("articlesWrapper").innerHTML = htmlContentToAppend;
    
    // Idea para hacer mas adelante para mas de 1 producto
    //productos.push(costo);
    //console.log("ARTICULOS "+ productos)

               product1Subtotal = (array.articles[0].unitCost * array.articles[0].count);
               product2Subtotal = (array.articles[1].unitCost * 40) * array.articles[1].count;

           
   }

}



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

//

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
        // INTENTARRR a futuro!! Habria que cargar un array con la cantidad de productos y pasar un product"x"_count a una variable pero entre comillas! y luego pasar esa variable al document.getelement by id con un for hermoso
         
        document.getElementById("product1_count").addEventListener("change", function(){


          let cantidad = document.getElementById("product1_count").value ;
          let costoUnidad = document.getElementById("unitCost1").value;                 
          product1Subtotal = parseInt((costoUnidad * cantidad));
         
         document.getElementById("product1_subtotal").innerHTML = `<strong>UYU</strong> `+ product1Subtotal ;  
         
        updateCost();     
        
        });


        document.getElementById("product2_count").addEventListener("change", function(){


          let cantidad = document.getElementById("product2_count").value ;
          let costoUnidad = document.getElementById("unitCost2").value;
          product2Subtotal = parseInt((costoUnidad * 40) * cantidad);
         
         document.getElementById("product2_subtotal").innerHTML =`<strong>UYU</strong> ` + product2Subtotal ;  

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



document.getElementById("btnFinalizar").addEventListener("click",function(){
 
  let street = document.getElementById("street").value;
  let streetNumber = document.getElementById("streetNumber").value
  let streetcorner = document.getElementById("streetcorner").value

      // Primero chequeo que los dos campos tienen valor y de no tener envio una alerta
      if ( street === "" || streetNumber === "" || streetcorner === ""){
          alert("Para continuar debes completar todos los campos. Calle, Numero de puerta y Esquina");
      }else {
   
    alert("Gracias por tu compra!");
    location.replace('index.html');
  }

  
   
  

});
    

});

