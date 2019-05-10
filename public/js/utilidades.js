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

function HideAndShow(padre, mostrar){
  var arreglo = []
  padre.children().each(function () {
    arreglo.push($(this).text()) // "this" is the current element in the loop
  });
  
  arreglo.forEach(function (hola){

    if ($(`#${hola}`).is(':visible') && hola !== mostrar) {
      //console.log( mostrar);
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
    if($(this).hasClass(active)){ // Si el boton seleccionado ya tiene la misma clase...
      $('#main-add > div').slideUp(500);
      $(tablas).children().slideDown(500) // muestra todas las tablas
      $(this).removeClass(active)  //Quita la clase del boton seleccionado
      busquedaDinamica.prop('disabled', true); // Si no hay ningun activo, desactiva la barra de busqueda
      $('#hidden-section').val('')
      $('#main-delete').slideUp(500);
    }
    else{
      $('#main-add > div').slideUp(500);
      let a =$(this).text()
      a = a.toLowerCase()
      $('#hidden-section').val(a)
      $('#main-delete').slideDown(500);
      $(boton).removeClass(active) // Remueve la clase de todos los botones
      busquedaDinamica.prop('disabled', false); // Activa la barra de busqueda

      $(this).addClass(active) //Le añade la clase activa al boton seleccionado

      
      var text = $('.boton-seccion-activo').text();

      
      //$(tablas).children().not(`#${text}`).slideUp(500)
   
      HideAndShow(btn, text) //
  

    }
    let seccion =  getSelectBtn();
    seccion = seccion.toLowerCase()
    $('#hidden-section').val(seccion)
    console.log(seccion)
    
    busquedaDinamica.val('')
    busquedaDinamica.trigger( "change" );
    //$(this).css("background-color", "yellow");      //add the class to the clicked element
  });
});
$(function(){
  
  $('#main-list tbody').on('click', 'tr', function(){
    
    let dataSelected = []  
    $(this).children('td').each(() => {
      dataSelected.push($(this).text()) 
    })

    dataSelected.forEach((res) => console.log(res))
    
    
  })

  
})

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