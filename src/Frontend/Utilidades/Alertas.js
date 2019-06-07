import Swal from 'sweetalert2'
import axios from 'axios'



const DeleteElement = function ( url , info) {
    return new Promise(function(resolve, reject){

        Swal.fire({
            title: 'Estas Seguro?',
            text: 'Si este elemento contiene elementos hijos, su unión será borrada',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios({
                        method: 'post',
                        url: url,
                        headers: {}, 
                        data: {
                            query: info, 
                        }
                    })
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error(response.statusText)
                    }
                    return true;
                })
                .catch(error => {
                    Swal.showValidationMessage(
                    `Ocurrió un problema. Verifique sus datos e inténtelo más tarde`
                    )
                    reject(new Error('ERROR'))
                    return false;
                })  
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
    
            if (result.value) {
                Swal.fire(
                '¡Éxito!',
                `Se elimino exitosamente.`,
                'success'
                )
                .then(() => {resolve(true)});
                
            }
        })


    })
    
}


const ToSend = function ( url , info ){
    return new Promise(function(resolve, reject){
        Swal.fire({
            title: '¿Está seguro?',
            text: "¿Desea ingresar los datos?",
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios({
                        method: 'post',
                        url: url,
                        headers: {}, 
                        data: {
                            query: info, 
                        }
                    })
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error(response.statusText)
                    }else{

                        resolve(response)
                    }
                    return true;
                })
                .catch(error => {
                    Swal.showValidationMessage(
                    `Ocurrió un problema. Verifique sus datos e inténtelo más tarde`
                    )
                    reject(new Error('ERROR'))
                    return false
                })  
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
    
            if (result.value) {
                Swal.fire(
                '¡Éxito!',
                `Acción ejecutada exitosamente.`,
                'success'
                )
                .then(() => {resolve(true)});
                
            }
        })
    })
};


const ToSendCustom = function ( url , info, mensajeError, MensajeSuccess ){
    return new Promise(function(resolve, reject){
        Swal.fire({
            title: '¿Está seguro?',
            text: "¿Desea ingresar los datos?",
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios({
                        method: 'post',
                        url: url,
                        headers: {}, 
                        data: {
                            query: info, 
                        }
                    })
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error(response.statusText)
                    }else{

                        resolve(response)
                    }
                    return true;
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        mensajeError
                    )
                    reject(new Error('ERROR'))
                    return false
                })  
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
    
            if (result.value) {
                Swal.fire(
                '¡Éxito!',
                MensajeSuccess,
                'success'
                )
                .then(() => {resolve(true)});
                
            }
        })
    })
};


const ErrorMsg = function () {
    Swal.fire({
        type: 'error',
        title: 'Error!',
        text: '¡Hay campos con valores no válidos!'
    })
}


export default {
    ToSend,
    ErrorMsg,
    DeleteElement,
    ToSendCustom
}