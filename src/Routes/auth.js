import VerificarLogin from '../AuthComponents/VerificarLogin/VericarLogin';

const router = require('express').Router();


router.get('/login',(req, res) => {
    
    res.render('inicio.hbs');
    
})

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
    console.log(JSON.stringify({permissions, user}))
    res.send(JSON.stringify({permissions, user}))
  }else{
    res.status(404).end()
  }
})


router.get('/logout' , (req,res) => {
    req.session.destroy()
    res.render('inicio.hbs');
})



router.post('/login',( req, res ) => {

  const { user, pass} = req.body;
  console.log(user,pass)
  VerificarLogin(user,pass)
    .then((response) => { return JSON.stringify(response[0])})
    .then((response) => { return JSON.parse(response)} )
    .then( (response) => { 
      console.log(response);

      const {user, name,productos, clasificacion, lotes, usuarios, admin, rol} = response;
      req.session.permissions = { productos, clasificacion, lotes, usuarios, rol , admin};
      req.session.user = {user, name};

      res.send(JSON.stringify({
        permissions: { 
          productos, 
          clasificacion, 
          lotes, 
          usuarios, 
          admin, 
          rol 
        }, 
        user: {
          user, 
          name
        }}
        
      ))

      
    })
    .catch( (response) => res.status(205).send('Informacion incorrecta!') );
    
    
})

module.exports = router;
