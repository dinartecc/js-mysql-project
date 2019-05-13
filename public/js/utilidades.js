function SliderToggleId(){ //Recibe string del id del elemento para invertir su visibilidad
    if(arguments.length == 0 ) return "Se necesita al menos un id";
    for (let i = 0; i < arguments.length; i++) {
		$(`#${arguments[i]}`).slideToggle(500);
	}
}
function SliderToggleClass(){ // Recibe un string de la clase del elemento para invertir su visibilidad
    if(arguments.length == 0 ) return "Se necesita al menos una clase";
    for (let i = 0; i < arguments.length; i++) {
    $(`.${arguments[i]}`).slideToggle(500);
    var hola = document.querySelector('#hola');
    hola = $('#hola');
	}
}

function HideAndShow(padre, mostrar){ // 
  var arreglo = []                  
  padre.children().each(function () {
    arreglo.push($(this).text()) // Agarra el texto de los hijos del padre y los mete a un arreglo
  });
  arreglo.forEach(function (hola){

    if ($(`#${hola}`).is(':visible') && hola !== mostrar) {
      console.log( mostrar);
      ($(`#${hola}`).slideUp(500))
    } 
  })
  $(`#${mostrar}`).slideDown(500);
  //console.log(arreglo)

  //mostrar.slideDown(500)
}
function getSelectBtn(){
  return $(".boton-seccion-activo").text()
}








$(function() {    
  let boton = $(".boton-seccion")
  let btn = $('#seccion-btn');
  let busquedaDinamica = $("#busqueda-dinamica");
  busquedaDinamica.prop('disabled', true); // Desactiva por defecto la barra de busqueda
  let active = 'boton-seccion-activo'; // Asi se llama 
  var tablas = $("#main-list") // Padre de todas las tablas
  boton.click(function() {  //Cuando se da click en algun div con la clase boton...
    $('#main-add > div').slideUp(500); // Esconde todas las secciones de añadir 
    if($(this).hasClass(active)){ // Si el boton seleccionado ya tenia la clase...
      $(tablas).children().slideDown(500) // Muestra todas las tablas 
      $(this).removeClass(active)  //Luego, quita la clase del boton seleccionado. Para así estar en la vista general
      busquedaDinamica.prop('disabled', true); // Ya que está en "la vista general". Se bloquea la barra de busqueda

      $('#main-delete').slideUp(500);
    }
    else{ // Si el boton no tiene la clase (Osea que es otro boton)
      $('#main-delete').slideDown(500);
      $(boton).removeClass(active) // Remueve la clase de todos los botones
      busquedaDinamica.prop('disabled', false); // Activa la barra de busqueda
      
      $(this).addClass(active) //Le añade la clase activa al boton seleccionado
      var texto = $('.boton-seccion-activo').text(); 
      console.log(texto)
      //$(tablas).children().not(`#${text}`).slideUp(500)
      
      HideAndShow(btn, texto) //
      
     

    }
    
    busquedaDinamica.val('')
    busquedaDinamica.trigger( "change" );
    //$(this).css("background-color", "yellow");      //add the class to the clicked element
  });
});

function alertas(error, alertType, time){ // String error  -  String tipo = 'error' 'success' - Tiempo para ocultar el alert  
  let element = $(`.alerta-${alertType}`)
  element.find('p').text(error);
  element.slideDown(500)
  setTimeout(function() {
    element.slideUp(500)
  },time)
}


function clearInputs(element){ // Pasas el id del elemento
 let Element = $(`${element}`);
 Element.find('input[type="text"]').val('');
}


$(function() { // AGREGAR NUEVOS REGISTROS
  $(".form-add").submit(function(e){
    e.preventDefault();
    let query = {}
    $(this).find('input[type="text"]').each(function(){
      let nombre = $(this).attr("name");
      let valor = $(this).val()
      query[nombre] =  valor;
    })
    fetch(`/clasificacion/nuevo/`, {
      method: 'POST',
      body: JSON.stringify({query}), 
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((response) => { return response.json() })
    .then((resp) => {
      alertas(resp, 'success',5000)
      clearInputs('.form-add') // Limpia todos los inputs de las clases form-add
      console.log(resp);
    })
  });

    $(".form-add input").prop('required',true);
    $('.cancelar-btn').click(function(event){
        event.preventDefault();
    })
})

$(function(){

  /*fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({query: "{ hello }"})
    })
      .then(r => r.json())
      .then(data => console.log(data.data.hello));

    */


  var busquedaDinamica = $('#busqueda-dinamica') // Barra de busqueda
  busquedaDinamica.keypress(function(event) {
      console.log("PRESS")
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
          let tablaModificar = $(`#${getSelectBtn()} tbody`)
          let busqueda = busquedaDinamica.val()
          
          var tipo = 'id';
          var selected = getSelectBtn();
          fetch(`/clasificacion/buscar/`, {
              method: 'POST', // or 'PUT'
              body: JSON.stringify({tabla: selected, busqueda: busqueda, tipo: tipo }), // data can be `string` or {object}!
              headers:{
                'Content-Type': 'application/json'
              }
            })
            .then( (response) => { return response.json()})
            .then ((response) => {
              var appendTable = [];
              for (let arreglo of response) {
                  appendTable.push('<tr>')
                  for( let prop of arreglo){
                      appendTable.push('<td>')
                      appendTable.push(prop)
                      appendTable.push('</td>') 
                  }
                  appendTable.push('</tr>')
              }
              var append = appendTable.join("")
              return append;
            })
            .then((response) => {
                console.log(response)
                tablaModificar.empty()
                tablaModificar.append(response)
            })
            .catch(error => console.error('Error:'+ error))
            event.stopPropagation();
      }
  })
})

$(function(){
  
  $('#main-list table tbody').click(function( ) {
    let title = []
    //console.log($(this).prev('thead').text())

    title = $(this).prev('thead').children("th").map(() => {
      return  $(this).text()
    })

    console.log(title.text())
    //console.log(title)


  })

/*
  $('#main-list table').on('click', 'tbody tr', function(){
    let dataSelected = []  

    //console.log($(this).parent().parent().text())
    

    //Obtiene el contenido de la fila y lo ingresa a un arreglo
    var tableData = $(this).children("td").map(function() {
      return $(this).text();
    }).get();
    $("#prueba").val(tableData[0])
  })*/
})

function createInput(inputName,arrayData, clicked){


}


$(function(){

  
  $("#add").click(function() {
    SliderToggleId(`main-delete`);
    let seccion =  getSelectBtn();
    SliderToggleId(`${seccion}`);
    seccion = seccion.toLowerCase()
    SliderToggleId(`${seccion}-add`);
  })

  function edit_btn(){
    var active = 'boton-seccion-activo';
    let mainList = $('#main-list')
    var boton = $(".boton-seccion")
    let seccion =  getSelectBtn();
    
    console.log(seccion)
    var e = $.Event("keypress");
    e.keyCode = 13; // # Some key code value
    let searchBar = $('#busqueda-dinamica')
    searchBar.val('')
    searchBar.trigger(e);
    SliderToggleId(seccion);
    seccion = seccion.toLowerCase();
    SliderToggleId(`${seccion}-add`);
  }

  $('.cancelar-btn').click(function(){
      edit_btn()
  })
  $('.enviar-btn').click(function(){
    
  })

})

$(function(){

  $(".form-delete").submit(function(e){
    let seccion = getSelectBtn().toLowerCase()
    $("#delete-seccion").val(seccion)
    e.preventDefault();
    let query = {}
    $(this).find('input[type="text"]').each(function(){

      let nombre = $(this).attr("name");
      let valor = $(this).val();
      query[nombre] = valor;
     
    })

    console.log(query)
    fetch(`/clasificacion/eliminar/`, {
      method: 'POST',
      body: JSON.stringify({query}), 
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((response) => { return response.json() })
    .then((resp) => {
      alertas(resp, 'success',5000)
      clearInputs('.form-delete') // Limpia todos los inputs de las clases form-add
      console.log(resp);
    })
  })
  
})
