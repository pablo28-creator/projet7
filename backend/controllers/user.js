const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {User} = require("../models");


exports.signup = (req, res) => {
    const verify = req.body.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    if(verify){
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            name: req.body.name,
            email: req.body.email ,
            password: hash,
          });
        user.save()
            .then(() => res.status(201).json({user, message: "Utilisateur créé !" }))
            .catch(error => res.status(400).json({ error }));
        })
        
        .catch(error => res.status(500).json({ error }));
    }else{
      return res.status(400).json({message: "Password not valid", success: false})
    }
  };
exports.login = (req, res, next) => {
    User.findOne({ where : { email: req.body.email }})
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: "Mot de passe incorrect !" });
            }
            res.status(200).json({
              userUuid: user.uuid,
              token: jwt.sign(
                { userUuid: user.uuid },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            }); 
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
exports.getUserInfos = async ( req, res ) =>{
  const uuid = req.params.uuid
  try{
      const user = await User.findOne({
        where: { uuid }
      })
      return res.json(user)
      }catch(err) {
        console.log(err)
        return res.status(500).json({error: "Something went wrong"})
      }
 };
exports.userDelete =   async ( req, res ) =>{
    const uuid = req.params.uuid
    try{
       const user = await User.findOne({where: { uuid }})
       await user.destroy()
       return res.json({message: "User deleted !"})
       }catch(err) {
          console.log(err)
          return res.status(500).json({error: "Something went wrong"})
       }
 };
exports.userUpdate = async ( req, res ) =>{
  const { name, email, password } = req.body
  const uuid = req.params.uuid
  try {
    const user = await User.findOne({where: { uuid }})
    bcrypt.hash(password, 10)
    .then(hash => {
    user.email = email
    user.name = name
    user.password =hash
    user.save()
    .then(() => res.status(201).json({user, message: "Utilisateur modifié !" }))
    .catch(error => res.status(400).json({ error }));
    })
    }catch(err) {
       console.log(err)
       return res.status(500).json({error: "Something went wrong"})
    }
}
