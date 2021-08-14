<template>
 <div>
   <Header/>
  <div class="card">
    <h1 class="card__title" v-if="mode == 'profil'">Profil</h1>
    <h1 class="card__title" v-if="mode == 'modifyProfil'">Changer le profil</h1>
    <p class="card__subtitle" v-if="mode == 'profil'"> Pseudo : {{user.name}}</p>
    <div class="form-row" v-if="mode == 'modifyProfil'">
      <input v-model="name" class="form-row__input" v-if="mode == 'modifyProfil'" type="text" placeholder="Pseudo"/>
    </div> 
    <p class="card__subtitle" v-if="mode == 'profil'"> Email : {{user.email}}</p>
    <div class="form-row" v-if="mode == 'modifyProfil'">
      <input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail"/>
    </div>
    <div class="form-row" v-if="mode == 'modifyProfil'">
      <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe"/>
    </div>
    <div class="form-row">
      <button @click="logout()" class="button" v-if="mode == 'profil'">
        Déconnexion
      </button>
      <button @click="switchToModifyProfil()" class="button buttonModify" v-if="mode == 'profil'">
        Modifier le profil
      </button>
      <button @click="deleteAccount()" class="button buttonDelete" v-if="mode == 'profil'">
        Supprimer mon compte
      </button>  
  </div>
  <div class="form-row" v-if="mode == 'modifyProfil'">
      <button @click="modifyProfil()" class="button" :class="{'button--disabled' : !validatedFields}">
        Modifier
      </button>
    </div>
 </div> 
 </div>
</template>

<script>

import { mapState } from "vuex";
import Header from "../components/Header.vue"

export default {
  name: 'Profil',
  components: {Header},
  data: function() {
    return {
      mode: 'profil',
      name: '',
      email: '',
      password: '',
    }
  },
  mounted: function () {
    this.$store.dispatch('getUserInfos');
  },
  computed: {
    validatedFields: function() {
        if (this.name != "" && this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      },
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {
    switchToModifyProfil: function() {
      this.mode = "modifyProfil"; 
    },
    switchToProfil: function() {
      this.mode = "profil";
    },
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    },
    modifyProfil: function() {
      const self = this
      this.$store.dispatch('modifyProfil', {
        name: this.name,
        email: this.email,
        password: this.password,
      })
      .then(function() {
      self.switchToProfil();
      }, function (error) {
        console.log(error)
      })
    },
    deleteAccount: function() {
      this.$store.dispatch('deleteAccount');
      localStorage.removeItem("user");
      this.$router.push('/');
    },
  }
}
</script>

<style scoped>
.card__subtitle{
    margin: 1em;
}
.buttonDelete{
  background-color: brown;
}
.buttonModify{
  background-color: darkgreen;
}
</style>>
