<template>
    <div>
      <Header/>
      <div>
        <h1 role="banner">Mur de Groupomania</h1>
      </div>
      <div class="card hideForm" v-if="mode == 'hidePostForm'">
         <h2 class="card__showForm" @click="addPost()">Ajouter un post !</h2>
      </div>
      <div class="card" v-if="mode =='addPost'" role="form">
        <div class="form-row" id="titre">
          <input v-model="title" id="title" aria-labelledby="titre" class="form-row__input" type="text" placeholder="Titre" maxlength="255">
        </div>
        <div class="form-row" id="texte">
          <input v-model="body" id="body" aria-labelledby="texte" class="form-row__input" type="text" placeholder="Message" maxlength="255">
        </div>
        <div class="form-row" id="photo">
          <input id="image" class="form-row__input" aria-labelledby="photo" type="file" placeholder="Image" name="image">
        </div>
        <div class="form-row"> 
          <button @click="createPost()" class="button" :class="{'button--disabled' : !validatedFields}">Ajouter un post</button>
        </div>
      </div>
        <div class=" card post"  v-for="post in posts" v-bind:key="post.uuid" role="main">
          <div class="deleteDiv">
          <div class="pseudo" v-if="post.user"><span class="pseudoUser"> {{post.user.name }} </span> a posté le {{ post.updatedAt }} : </div>
          <i class="fas fa-times fa-2x deleteIcon" @click="deletePost(post.uuid, post.user.uuid, post.user.isAdmin)"></i>
          </div>
          <div class="bordure">
            <div class="imageContent">
            <div class="image">
                <img :src="post.image" alt="Image du post"/>
                </div>
                </div> 
                <div class="desciption">
                  <div class="likeDiv ">
                  <h3 class="title"> {{ post.title }}</h3>
                  <div class="like">
                    <i @click="modifyLike(post.uuid)" class="far fa-thumbs-up fa-2x iconLike"></i>
                    <p class="likeNumber likePadding">{{post.likes}}</p>
                    </div>
                  <div class="dislike">
                    <i class="far fa-thumbs-down fa-2x iconDislike" @click="modifyDislike(post.uuid)"></i>
                    <p class="dislikeNumber likePadding">{{post.dislikes}}</p>
                    </div>
                  </div>
                <p class="infoPost"> {{ post.body }}</p>  
            </div>
          </div>
            <div class="comments">
              <h4> Commentaire :</h4>
              <Comment :msg="post.uuid"/>
                <div class=" comment" v-for="comment in comments"  v-bind:key="comment.uuid">
                  <div class="desciption" v-if="comment.postUuid == post.uuid"> 
                  <p class="infoComment" v-if="comment.user">
                    <i class="fas fa-times deleteIcon deleteComment" @click="deleteComment(comment.uuid, comment.user.uuid, comment.user.isAdmin)" ></i>||
                    <span class="pseudoUser"> {{ comment.user.name}}</span> : {{ comment.body }} || <span class="date"> {{ comment.updatedAt}}</span>
                  </p>
                  <div class="likeDiv">
                    <div class="title"></div>
                  <div class="like">
                    <i @click="modifyLikeComment(comment.uuid)" class="far fa-thumbs-up fa-inverse iconLike"  ></i>
                    <p class="likeNumber">{{comment.likes}}</p>
                    </div>
                  <div class="dislike">
                    <i class="far fa-thumbs-down fa-inverse iconDislike" @click="modifyDislikeComment(comment.uuid)"></i>
                    <p class="dislikeNumber">{{comment.dislikes}}</p>
                    </div>
                  </div>  
                </div>
              </div> 
            </div>
      </div>    
    </div>
</template>

<script>
import { mapState } from "vuex"
import Header from "../components/Header.vue"
import Comment from "../components/Comment.vue"
import axios from "axios"
import jwt from "jsonwebtoken"
const instance = axios.create({
  baseURL: 'http://localhost:8000'
});

    
export default {
    name: "Wall",
    components: {Header, Comment},
    data: function() {
    return {
      mode:"hidePostForm",
      post:'',
      title: '',
      body:"",
    }
  },
    mounted: function() {
      this.$store.dispatch("getPostInfos");
      this.$store.dispatch("getCommentInfos");
    },
    computed: {
      validatedFields: function() {
        if (this.title!= "" && this.body != "") {
          return true;
        } else {
          return false;
        }},
      ...mapState({
        posts: "postInfos",
        comments: "commentInfos",
      }), 
    },
        
  methods: {
    addPost: function() {
      this.mode = 'addPost'
    },
    hidePostForm: function() {
      this.mode = 'hidePostForm'
  },
    createPost: function() {
      let user = localStorage.getItem('user');
        user = JSON.parse(user);
        let userUuid = user.userUuid 
        const formData = new FormData();
        const title = document.getElementById("title").value
        const body = document.getElementById("body").value
        const imagefile = document.querySelector('#image');
        formData.append("title", title);
        formData.append("body", body);
        formData.append("userUuid", userUuid);
        formData.append("image", imagefile.files[0]);
        try{
        instance.post("/posts", formData,{headers:{'Authorization': user.token}})
        .then( () => {
         this.$store.dispatch("getPostInfos");
         const file = document.getElementById("image");
         this.title = " ";
         this.body = " ";
         file.value = null;
         this.hidePostForm();
        })
        }catch(error)  {
          console.log(error);
        }
    },
    
    deletePost: function(uuid, userUuid) {
      let user = localStorage.getItem('user');
        user = JSON.parse(user);  
        let token = user.token
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const tokenUuid = decodedToken.userUuid;
        const isAdmin = decodedToken.isAdmin
      if(userUuid == tokenUuid || isAdmin == 1){
      try{
        instance.delete("posts/"+uuid, {headers:{'Authorization': user.token}})
        .then(() => {
          console.log("Post supprimé !");
          this.$store.dispatch("getPostInfos");
        })}
        catch (error) {
          console.log(error)
        }}else{
          alert("Seul l'auteur du post peut le supprimer !")
        }
    },
    modifyLike:function(uuid) {
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        let userUuid = user.userUuid
        try{ 
        instance.post("posts/"+uuid ,{userUuid, like:1}, {headers:{'Authorization': user.token}})
        .then((response)  => {
        console.log(response);
         this.$store.dispatch("getPostInfos");
        })}
        catch(error)  {
        console.log(error);
      } 
    },
    modifyDislike: function(uuid) {
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        let userUuid = user.userUuid 
        instance.post("posts/"+uuid ,{userUuid, like:-1}, {headers:{'Authorization': user.token}})
        .then((response)  => {
          console.log(response);
          this.$store.dispatch("getPostInfos");
        })
        .catch (error =>
          console.log(error)
        )
    },
    deleteComment: function(uuid, userUuid) {
      let user = localStorage.getItem('user');
        user = JSON.parse(user);  
        let token = user.token
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const tokenUuid = decodedToken.userUuid;
        const isAdmin = decodedToken.isAdmin
        console.log(isAdmin)   
      if(userUuid == tokenUuid || isAdmin == 1){
      try{
        instance.delete("comments/"+uuid, {headers:{'Authorization': user.token}})
        .then(() => {
          console.log("Commentaire supprimé !");
          this.$store.dispatch("getCommentInfos");
        })}
        catch (error) {
          console.log(error)
        }}else{
          alert("Seul l'auteur du commentaire peut le supprimer !")
        }
    },
    modifyLikeComment:function(uuid) {
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        let userUuid = user.userUuid
        try{ 
        instance.post("comments/"+uuid ,{userUuid, like:1 }, {headers:{'Authorization': user.token}})
        .then((response)  => {
        console.log(response);
         this.$store.dispatch("getCommentInfos");
        })}
        catch(error)  {
        console.log(error);
      } 
    },
    modifyDislikeComment: function(uuid) {
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        let userUuid = user.userUuid 
        instance.post("comments/"+uuid ,{userUuid, like:-1}, {headers:{'Authorization': user.token}})
        .then((response)  => {
          console.log(response);
          this.$store.dispatch("getCommentInfos");
        })
        .catch (error =>
          console.log(error)
        )
    },      
  }
}
</script>

<style scoped>

h1{
  color: white;
  text-align: center;
}
.card{
  margin: 1em;
  width: 1000px;
}
.hideForm{
  border: black solid 3px;
  display: flex;
  justify-content: center;
  background-image: url('../assets/clavierPost.jpg');
}
.deleteDiv{
  width: 100%;
  display: flex;
}
.pseudo{
  flex-grow: 50;
}
.deleteIcon{
  flex-grow: 1;
}
.deleteIcon:hover{
  color: red;
}
.bordure{
  margin: 1em;
  padding: 1em;
  border: solid black 2px;
  border-radius: 15px;
}
.imageContent{
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid black 3px;
  box-shadow: 0px 15px 10px -10px rgba(0,0,0,0.51);
}
.likeDiv{
  width: 100%;
  display: inline-flex;
  padding: 0.5em;
}
.title{
  margin: 0.5em;
  flex-grow: 50 ;
}
.like{
  flex-grow: 1;
}
.iconLike:hover{
  color: green;
}
.dislike{
  flex-grow: 1;
}
.likePadding{
  padding-left: 12px;
}
.likeNumber{
  color: green;
  font-weight: bold;
}
.dislikeNumber{
  color: red;
  font-weight: bold;
}
.iconDislike:hover{
  color: red;
}
.comments{
  margin: 1em;
  padding-top: 1em;
  padding-left: 1em;
  border: solid black;
  border-radius: 15px;
  background-image: linear-gradient(62deg, #445b9b 0%, #100347 100%);
}
.infoComment{
  margin-right: 1em;
  padding: 1em;
  border: solid black;
  border-radius: 15px;
  background-color: white;
}
.date{
  font-style: italic;
  color: #777;
}
.pseudoUser{
  font-weight: bold;
}
h4 {
  color: white;
  font-size: 26px;
}
</style>