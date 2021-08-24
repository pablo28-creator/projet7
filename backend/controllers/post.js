const {Post, User} = require("../models");
const fs = require('fs');


exports.createPost = async (req, res) => {
    const {userUuid, body, title} = req.body
   try{
      const user = await User.findOne({ where: {uuid: userUuid}})

         const post = await Post.create({
            title, 
            body,
            userId: user.id,
            image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: [],
         })
         return res.json(post)  
   }catch(err){
      console.log(err)
   return res.status(500).json(err) 
}};
exports.getAllPost = async (req, res) => {
   try{
      const posts = await Post.findAll({
         order: [['createdAt', 'DESC']],
         include: [{
         model: User, as: "user",
         attributes: { exclude: ['password',"email","createdAt","updatedAt"] }                        // On enlève les données sensibles de la réponse ( password, email) 
  }]    
       });
      return res.json(posts)
   }catch(err){
      console.log(err)
   return res.status(500).json(err) 
}}
exports.postDelete =   async ( req, res ) =>{
   const uuid = req.params.uuid
   try{
      const post = await Post.findOne({where: { uuid }})
      const filename = post.image.split('/images/')[1];
      fs.unlinkSync(`images/${filename}`)
      await post.destroy()
      return res.json({message: "Post deleted !"})
      }catch(err) {
         console.log(err)
         return res.status(500).json({error: "Something went wrong"})
      }
};
 exports.modifyLike = async (req, res, next) => {
   const {userUuid, like} = req.body
   const uuid = req.params.uuid
   
   if(like == 1){  
      Post.findOne({where: { uuid }})
       .then(post => {
         const foundLike = post.usersLiked.find(element => element == userUuid);                                  // On cherche l'userUuid dans les tableaux userliked/disliked
         const foundDislike = post.usersDisliked.find(element => element == userUuid);
           if(!foundLike && !foundDislike){
            post.usersLiked = [post.usersLiked, userUuid ]                                                        //On ajoute l'userUuid au tableau userliked
            post.likes = post.likes + 1
            console.log(post.usersLiked)
            post.save()
           }
           else if(foundLike){
            post.usersLiked = post.usersLiked.filter((user) => user !== userUuid)                                 //On enlève l'userUuid du tableau userliked
            post.likes = post.likes - 1
            post.save()
          }
          })
         .then(post => res.status(200).json(post))
         .catch(error => res.status(400).json({ error })
         );
       }
   else if( req.body.like ===  -1 ) { 
      Post.findOne({where: { uuid }})
       .then(post => {
         const foundDislike = post.usersDisliked.find(element => element == userUuid);
         const foundLike = post.usersLiked.find(element => element == userUuid);
           if(!foundDislike && !foundLike){
             post.usersDisliked = [post.usersDisliked, userUuid]
             post.dislikes = post.dislikes + 1
             post.save()
             }
             else if(foundDislike ){
               post.usersDisliked = post.usersDisliked.filter((user) => user !== userUuid)
               post.dislikes = post.dislikes - 1
               post.save()
             }
       })
     .then(post => res.status(200).json(post))
     .catch(error => res.status(400).json({ error })
     );
   }
 };
   