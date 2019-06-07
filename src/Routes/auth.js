import VerificarLogin from '../AuthComponents/VerificarLogin/VericarLogin';
import crypto from 'crypto-js'

const router = require('express').Router();


router.get('/islogged', (req, res) =>{
 
  if(typeof req.session.user !== 'undefined'){
    res.send(true)
  }else{
    res.send(false)
  }
})

router.get('/userinfo', (req, res) =>{
  if(typeof req.session !== 'undefined'){
    const permissions = req.session.permissions;
    const user = req.session.user;
  
    res.send(JSON.stringify({permissions, user}))
  }else{
    res.status(404).end()
  }
})


router.get('/logout' , (req,res, next) => {
    req.session.destroy()
    next()
})

router.post('/login',( req, res ) => {

  const { user, pass} = req.body;
  let hash = crypto.SHA256(pass)
  hash = hash.toString()
  console.log(hash)
  VerificarLogin(user,hash)
    .then((response) => { return JSON.stringify(response[0])})
    .then((response) => { return JSON.parse(response)} )
    .then( (response) => { 
      console.log(response);
      const {user, name,productos, clasificacion, lotes, administrador, rol, ID_rol, pass} = response;
      req.session.permissions = { productos, clasificacion, lotes , administrador}; // Asignando todos los valores al objeto permissions de la sesion
      req.session.ID_rol = ID_rol; // Asignando ID_rol a la session
      req.session.user = {user, name,pass};  // Asignando los valores al objeto user de la sesion
      // Mandando informacion
      res.send(JSON.stringify({ // Se manda la informacion al frontend para que lo almacene y así según eso realice ciertas acciones
        permissions: { // Se manda los permisos del usuario
          productos, 
          clasificacion, 
          lotes,  
          administrador, 
          rol 
        }, 
        user: { // Se manda la información básica del usuario.
          user, 
          name
        }}
        
      ))
    })
    .catch( () => res.status(400).end());
    
})


router.post('/changepasword', (req, res) => {
    console.log(req.session.user.pass)
})


module.exports = router;
