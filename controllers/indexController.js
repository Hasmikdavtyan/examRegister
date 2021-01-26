const model = require("../models/user")
const mongoose = require('mongoose')
  
const User = mongoose.model('user', model)


class AdminController{
 registerPage(req, res){
     let message =''
    res.render('components/register.ejs',{message:message})
    console.log(User)

 }

 registerUser(req, res){
    
    if(!req.body.email || !req.body.password){
        res.send('info is invalid')
    }else{
        async  function CreateUser(email, password){
            return new User ({
                email:email,
                password:password
            }).save()
        }
            ( async()=>{
                let user = await User.findOne({email:req.body.email}).catch(err =>{throw err} )
                console.log(user)
                if(!user){
                await CreateUser(req.body.email, req.body.password).then(result=>{
                   console.log(result)
                    return  res.redirect('/')
                  }).catch(err =>{throw err} )
              }else{
                let message = 'this email was used by another user'
                res.render('components/register.ejs',  {message:message })
              }
            })()
      
    }
    
    
 }
 

}

module.exports= new AdminController()