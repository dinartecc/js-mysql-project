
// -- Togglea la visibilidad de los elementos que tengan los ids que se le pasa como argumentos --
function SliderToggleId(){ // Los parametros son de tipo String
    if(arguments.length == 0 ) return "Se necesita al menos un id";
    for (let i = 0; i < arguments.length; i++) {
		$(`#${arguments[i]}`).slideToggle(500);
	}
}
// -- Togglea la visibilidad de los elementos que tengan las clases que se le pasa como argumentos --
function SliderToggleClass(){ // Los parametros son de tipo String
    if(arguments.length == 0 ) return "Se necesita al menos una clase";
    for (let i = 0; i < arguments.length; i++) {
    $(`.${arguments[i]}`).slideToggle(500);
	}
}




// -- HideAndShow --
// Esta funcion es la mas rara.
// Le pasas el contenedor de todos los botones, luego en la funcion hace un ciclo por cada hijo
// Le saca el valor del atributo data-table a cada hijo 
// Lo concatena con -table
// Ya concatenado esconde el elemento que matchee, a no ser que sea
// el mismo elemento que le mandaste como segundo argumento.
// Ejemplo:
// Hay 3 botones con un data-table de: categoria, subcategoria y marca
// Se quiere esconder todas las tablas menos la tabla categoria
// Entonces la funcion va a esconder los elementos 'subcategoria-tabla' y 'marca-table' menos 'tabla-categoria'
// Se puede hacer aun mas modular modificando el '-tabla' al recibir otro parametro con ese valor a sustituir
function HideAndShow(padre, mostrar){      
  padre.children().each(function () {
    let temp = $(this).attr('data-boton')
    if ($(`#${temp}-table`).is(':visible') && temp != mostrar) { // Si el elemento es visible y es diferente del que se
      ($(`#${temp}-table`).slideUp(500))                         // quiere mostrar, entonces lo esconde...
    } 
  });
  $(`#${mostrar}-table`).slideDown(500); // Muestra el elemento que se quiere mostrar :v
}


function getSelectBtn(){ // Retorna el valor del atributo data-boton del boton actualmente activo
  return $(".boton-seccion-activo").attr('data-boton')
}

$(function() {    
  let boton = $(".boton-seccion") // Los botones de las secciones
  let btnPadre = $('#seccion-btn'); // Padre de los botones
  let busquedaDinamica = $("#busqueda-dinamica");
  let active = 'boton-seccion-activo'; // Asi se llama la clase del boton activo
  var tablas = $("#main-list") // Padre de todas las tablas

  //busquedaDinamica.prop('disabled', true); // Desactiva por defecto la barra de busqueda

  boton.click(function() {  //Cuando se da click en algun "boton"...
    
    $('#main-add > div').slideUp(500); // Esconde todas las secciones de añadir 
    if($(this).hasClass(active)){ // Si el boton seleccionado ya tenia la clase...

      cambiar()
      console.log("Ha sido ejecutada la funcion")
      $(tablas).children().slideDown(500) // Muestra todas las tablas ( Esto hace que se muestre la vista principal )
      $(this).removeClass(active)  //Luego, quita la clase del boton seleccionado. ( Apagar el boton ps )
      //busquedaDinamica.prop('disabled', true); // Ya que está en "la vista general". Se bloquea la barra de busqueda
      $('#main-delete').slideUp(500); // Se esconde lo de borrar

    }
    else{ // Si el boton no tiene la clase (Osea que es otro boton)
      cambiar()
      app.showEmptyMsg = false;
      $('#main-delete').slideDown(500);
      boton.removeClass(active) // Remueve la clase de todos los botones
      //busquedaDinamica.prop('disabled', false); // Activa la barra de busqueda
      
      $(this).addClass(active) //Le añade la clase activa al boton seleccionado
      var btnActivado = $('.boton-seccion-activo').attr('data-boton'); 

      HideAndShow(btnPadre, btnActivado)  
    }
    busquedaDinamica.val('') // Reset de la barra de busqueda
    //busquedaDinamica.trigger( "change" );
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
 Element.find('input[type="text"]').each(function(){
   if(!$(this).hasClass('hidden-input')){
    $(this).val('')
   }
 });
}


function Alertas(Type, Titulo, Tiempo , Text){ // Tipo 'success' o 'error'\

var alerta = {
  position: 'center',
  type: Type,
  title: Titulo,
  showConfirmButton: false
}

  Type !== 'error' ? alerta.timer = Tiempo : alerta.showConfirmButton = true;

  var long = arguments.length;
  long >= 4 && Text !== undefined ? alerta.text = Text : null;
  Swal.fire(alerta)
}


//Funcion que recibe dos parametros.
//EndPoint es la direccion a mandar el request '/clasificacion/nuevo'
//
async function sendToBackend(EndPoint, Query){
  let config = {                  
    method: 'POST',
    body: JSON.stringify({query: Query}),
    headers:{
      'Content-Type': 'application/json'
    }
  }
  try {
    let response = await fetch(EndPoint,config)
    return response
  } catch (error) {
    console.log(error)
  }
}

$(function() { // AGREGAR NUEVOS REGISTROS
  $(".form-add").submit(async function(e){
    e.preventDefault();
    let query = {}
    $(this).find('input[type="text"]').each(function(){
      let nombre = $(this).attr("name");
      let valor = $(this).val()
      query[nombre] =  valor;
    })
      let response = await sendToBackend('/clasificacion/nuevo', query)
      if (response.status !== 200) {
        Alertas('error', "Ha ocurrido un error",0,"Si este problema sigue ocurriendo, contactate con un técnico")
      }else{
        response = await response.json()
        await app.actualizar()
        Alertas('success', response, 1500)

        clearInputs('.form-add') // Limpia todos los inputs de las clases form-add menos los que tienen clase Hidden
      }
     
      
      

    
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



  
  $('#main-list table tbody').click(function( ) {
    let title = []
    //console.log($(this).prev('thead').text())

    title = $(this).prev('thead').children("th").map(() => {
      return  $(this).text()
    })

    console.log(title.text())
    //console.log(title)


  })
})

function createInput(inputName,arrayData, clicked){


}


$(function(){
  $("#add").click(function() {
    
    SliderToggleId(`main-delete`);
    let seccion =  getSelectBtn();
    SliderToggleId(`${seccion}`);
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
      //alertas(resp, 'success',5000)\
      
      clearInputs('.form-delete') // Limpia todos los inputs de las clases form-add
      console.log(resp);
    })
  })
  
})
