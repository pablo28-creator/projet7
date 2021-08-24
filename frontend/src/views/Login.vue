<template>
  <div class="card" role="main">
    <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
    <h1 class="card__title" v-else>Inscription</h1>
    <p class="card__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p>
    <p class="card__subtitle" v-else>Tu as déjà un compte ? <span class="card__action" @click="switchToLogin()">Se connecter</span></p>
      <div class="form-row" id="name" v-if="mode == 'create'">
      <input v-model="name" aria-labelledby="name" class="form-row__input" type="text" placeholder="Pseudo" maxlength="30"/>
    </div>
    <div class="form-row" id="email">
      <input v-model="email" aria-labelledby="email" class="form-row__input" type="text" placeholder="Adresse mail" maxlength="70"/>
    </div>
    <div class="form-row" id="password">
      <input v-model="password" aria-labelledby="password" class="form-row__input" type="password" placeholder="Mot de passe" maxlength="40"/>
    </div>
    <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
      Adresse mail et/ou mot de passe invalide.
    </div>
    <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
      Rentez des données correctes.
    </div>
    <div class="form-row">
      <button @click="login()" class="button" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login'">
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <button @click="createAccount()" class="button" :class="{'button--disabled' : !validatedFields}" v-else>
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
    </div>
  </div>
</template>

<script>

import { mapState } from  'vuex'

export default {
  name: "Login",
  data: function() {
    return {
      mode: 'login',                                                             // mode pour afficher le formulaire de login
      name: '',
      email: '',
      password: '',
    }
  },
  mounted: function() { 
  },
  computed: {
    validatedFields: function() {                                               
      if (this.mode == 'create') {                                                // foncction qui affiche le bouton login/create désactiver si les inputs ne sont pas remplit
        if (this.name != "" && this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(["status"])
  },

  methods: {
    switchToCreateAccount: function() {
      this.mode = 'create';
    },
    switchToLogin: function() {
      this.mode = 'login';
    },
    login: function() {
      const self = this;
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      }).then(function() {
      self.$router.push("/profil")
      }, function (error) {
        console.log(error)
      })
    },
    createAccount: function() {
      const self = this
      this.$store.dispatch('createAccount', {
        name: this.name,
        email: this.email,
        password: this.password,
      }).then(function() {
      self.login();
      }, function (error) {
        console.log(error)
      })
    },
  }
}
</script>

<style scoped>
  

</style>>
