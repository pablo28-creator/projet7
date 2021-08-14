<template>
        <div>
        <div class="form-row commentForm">  
          <input v-model="bodyComment" class="form-row__input" type="text" placeholder="Commentaire" maxlength="255" v-if="mode == 'addComment'">
          <p class="card__showForm" v-if="mode == 'hideCommentInput'" @click="addComment()">Ajouter un commentaire !</p>
        </div>
        <div class="form-row" v-if="mode == 'addComment'"> 
          <button @click="createComment()" class="button" :class="{'button--disabled' : !validatedField}">Ajouter un commentaire</button>
        </div> 
     </div>   
</template>

<script>

import axios from "axios"
const instance = axios.create({
  baseURL: 'http://localhost:8000'
});

export default {
    name: "Comment",
    props: {
      msg: String
    },
    data: function() {
    return {
      mode: "hideCommentInput",
      bodyComment:"",
    }
},
computed: {
     validatedField: function() {
        if (this.bodyComment != "") {
          return true;
        } else {
          return false;
        }},
        
},
methods: {
  addComment: function(){
      this.mode = 'addComment'
  },
  hideCommentInput: function() {
      this.mode = 'hideCommentInput'
  },
     createComment: function()  {    
      let user = localStorage.getItem('user');
      user = JSON.parse(user);
      let userUuid = user.userUuid 
      try{
      instance.post("/comments", { 
        body: this.bodyComment,
        userUuid: userUuid,
        postUuid: this.msg
      })
      .then( (response) => {
        console.log(response.data);
        this.$store.dispatch("getCommentInfos");
        this.bodyComment = " ";
        this.hideCommentInput();
      })}
      catch(error)  {
        console.log(error);
      }  
    },
  }    
}
</script>


<style scoped>
.commentForm{
  justify-content: center;
}
</style>