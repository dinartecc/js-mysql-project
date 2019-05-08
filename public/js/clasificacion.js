$(function(){
    var test = true;
    var busquedaDinamica = $('#busqueda-dinamica')
    busquedaDinamica.keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            console.log('TRIGER')
            let tablaModificar = $(`#${getSelectBtn()} tbody`)
            let busqueda = busquedaDinamica.val()
            if((busquedaDinamica.val() !== '')){
            }else{
                //return undefined;
            }  
            var tipo = 'nombre';
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
                  tablaModificar.empty()
                  tablaModificar.append(response)
              })
              .catch(error => console.error('Error:'+ error))
              event.stopPropagation();
        }
    })
})



$(function(){
    $("input").prop('required',true);
    $('.cancelar-btn').click(function(event){
        event.preventDefault();
    })
})