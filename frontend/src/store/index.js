import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:8000'
});

let user = localStorage.getItem('user');
let defaultUser = { userUuid: -1, token:""}
if (!user) {
 user = {defaultUser}; 
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;                         // authorization ajouté dans les requêtes
  } catch (ex) {
    user = {defaultUser};
  }
}

const store = createStore({
    state: {
        status: "",
        user: user,
        userInfos: {
        name:"",
        email: "",  
        },
        postInfos: {
          uuid: "",
          title: "",
          body: "",
          userUuid:"",
          image: "",
        },
        commentInfos: {
          body: "",
          userUuid:"",
        },
      },
    getters: {                                                                  // getter d'authentification pour les navigation guards
      isAuthenticated: (state) => {
        return state.user.token
      }
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function (state, user) {
            instance.defaults.headers.common['Authorization'] = user.token;
            localStorage.setItem('user', JSON.stringify(user));                  // on ajoute le token et l'user id au local storage 
            state.user = user;
         
        },
        userInfos: function ( state, userInfos) {
          state.userInfos = userInfos;
        },
        logout: function (state) {
          state.user = defaultUser
          localStorage.removeItem("user");
        },

        postInfos: function (state, postInfos) { 
          state.postInfos = postInfos;
        },
        commentInfos: function (state, commentInfos, ) {
          state.commentInfos = commentInfos;
        },
      },
    actions:{
        createAccount: ({commit}, userInfos) => {
            commit("setStatus", "loading");
            return new Promise((resolve, reject) => {
                commit;
            instance.post("/signup", userInfos)
            .then(function(response) {
                commit("setStatus", "created");
                resolve(response);
            })
            .catch(function (error) {
                commit("setStatus", "error_create");
                reject(error)
                });
            })
        },
        login: ({commit}, userInfos) => {
            commit("setStatus", "loading");
            return new Promise((resolve, reject) => {
            instance.post("/login", userInfos)
            .then(function(response) {
                commit("setStatus", "");
                commit("logUser", response.data)
                resolve(response);
            })
            .catch(function (error) {
                commit("setStatus", "error_login");
                reject(error)
                });
            })
        },
        deleteAccount: () => {
          let user = localStorage.getItem('user');
          user = JSON.parse(user);
          try{
            instance.delete("/user/"+user.userUuid)
            .then(function () {
              console.log("Compte supprimé !");
            })}
            catch (error) {
              console.log(error)
            }
        },
        modifyProfil: ({ commit }, userInfos) => {
          let user = localStorage.getItem('user');
          user = JSON.parse(user);
          try{
          instance.put("user/"+user.userUuid, userInfos)
          .then(function (response) {
            commit('userInfos', response.data.user);
          })}
          catch (error) {
            console.log(error)
          }
        },
        getUserInfos: ({commit}) => {
          let user = localStorage.getItem('user');
          user = JSON.parse(user);
          try{
            instance.get("user/"+user.userUuid)
            .then(function (response) {
              commit('userInfos', response.data);
            })}
            catch (error) {
              console.log(error)
            }
          },
        getPostInfos: ({commit})  => {
            instance.get("/posts")
            .then(function (response) {
              commit('postInfos', response.data);
            })
            .catch(function (error) {
            console.log(error);
            })
        },
        getCommentInfos: ({commit})  => {
          instance.get("/comments")
          .then(function (response) {
            commit('commentInfos', response.data);
          })
          .catch(function (error) {
          console.log(error);
          })
      },
  }        
})
export default store;