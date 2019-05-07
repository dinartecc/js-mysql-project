$(function(){
    var test = true;
    var busquedaDinamica = $('#busqueda-dinamica')
    busquedaDinamica.on("change paste keyup",() => {
        
        let tablaModificar = getSelectBtn();
        tablaModificar = $(`#${getSelectBtn()}`)
        let busqueda = busquedaDinamica.val() 
        console.log(busquedaDinamica.val() )
        if((busqueda !== undefined) || (busqueda !== '')){
            tablaModificar.empty()
        }else{
            console.log("HEU")
        }

        var selected = getSelectBtn();
        
        fetch('/clasificacion/buscar/', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify({tabla: selected, busqueda: busqueda}), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          })
          .then( (response) => {return response.json()})
          .then ((response) => console.log())
          .catch(error => console.error('Error:', error))
    })




    $('#cliente').on("change paste keyup",() => {
    
    var busqueda = $('#cliente').val()
    var tabla = $('#clientes-tabla');
    var add = $('#respuesta-ajax');
    var check;

    })
})


