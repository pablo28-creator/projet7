const {Post, User, Comment} = require("../models");

exports.createComment = async (req, res) => {
    const {userUuid, body, postUuid } = req.body
    
   try{
      const user = await User.findOne({ where: {uuid: userUuid}})
      const post = await Post.findOne({ where: {uuid: postUuid}})
      const comment = await Comment.create({
         body, 
         userId: user.id,
         postId: post.id,
         postUuid: postUuid,
         likes: 0,
         dislikes: 0,
         usersLiked: [],
         usersDisliked: []
      })
      return res.json(comment)
   }catch(err){
      console.log(err)
   return res.status(500).json(err) 
}};
exports.getAllComment = async (req, res) => {
   try{
      const comments = await Comment.findAll({ 
         order: [['createdAt', 'DESC']],
         include: [{
         model: User, as: "user",
         attributes: { exclude: ['password',"email","createdAt","updatedAt"] }                           // On enlève les données sensibles de la réponse ( password, email)   
  }]    
      })
      return res.json(comments)
   }catch(err){
      console.log(err)
   return res.status(500).json(err) 
}}
exports.commentDelete =   async ( req, res ) =>{
   const uuid = req.params.uuid
   try{
      const comment = await Comment.findOne({where: { uuid }})
      await comment.destroy()
      return res.json({message: "Comment deleted !"})
      }catch(err) {
         console.log(err)
         return res.status(500).json({error: "Something went wrong"})
      }
};
 exports.modifyLike = async (req, res, next) => {
   const {userUuid, like} = req.body
   const uuid = req.params.uuid
   
   if(like == 1){  
      Comment.findOne({where: { uuid }})
       .then(comment => {
         const foundLike = comment.usersLiked.find(element => element == userUuid);                   // On cherche l'userUuid dans les tableaux userliked/disliked
         const foundDislike = comment.usersDisliked.find(element => element == userUuid);
           if(!foundLike && !foundDislike){
            comment.usersLiked = [comment.usersLiked, userUuid ]                                      //On ajoute l'userUuid au tableau userliked
            comment.likes = comment.likes + 1
            comment.save()
           }
           else if(foundLike){
            comment.usersLiked = comment.usersLiked.filter((user) => user !== userUuid)               //On enlève l'userUuid du tableau userliked
            comment.likes = comment.likes - 1
            comment.save()
          }
          })
         .then(comment => res.status(200).json(comment))
         .catch(error => res.status(400).json({ error })
         );
       }
   else if( req.body.like ===  -1 ) { 
      Comment.findOne({where: { uuid }})
       .then(comment => {
         const foundDislike = comment.usersDisliked.find(element => element == userUuid);
         const foundLike = comment.usersLiked.find(element => element == userUuid);
           if(!foundDislike && !foundLike){
             comment.usersDisliked = [comment.usersDisliked, userUuid]
             comment.dislikes = comment.dislikes + 1
             comment.save()
             }
             else if(foundDislike ){
               comment.usersDisliked =comment.usersDisliked.filter((user) => user !== userUuid)
               comment.dislikes = comment.dislikes - 1
               comment.save()
             }
       })
     .then(comment => res.status(200).json(comment))
     .catch(error => res.status(400).json({ error })
     );
   }
 };
   