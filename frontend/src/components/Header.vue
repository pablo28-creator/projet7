<template>
    <div class="header" id="myHeader" role="navigation">  
        <img src="../assets/icon-left-font-monochrome-white.png" alt="logo groupomania">
        <router-link to="/profil" class="link">Profil</router-link> 
        <router-link to="/wall" class="link">Posts</router-link> 
        <router-view/>
        <a href="javascript:void(0);" class="icon" @click="reponsiveHeader()">
        <i class="fa fa-bars"></i>
  </a>
    </div>
</template>

<script>
export default {
    name: "Header",
    
    methods: {
        reponsiveHeader: function() {
            var x = document.getElementById("myHeader");
            if (x.className === "header") {
                x.className += " responsive";
            } else {
                x.className = "header";
            }
        }
    }
}
</script>

<style scoped>

.header{
    align-items: center;
    justify-content: center;
    margin: 2em;
}
.header .icon {
  display: none;
  color: #ffffff;
  margin-left: 1em;
}
img{
    width: 250px;
    
}
.link{
    width: 100px;
    float: right;
    display: block;
    color: #ffffff;
    font-size: 22px;
    padding-left: 2em;
    text-decoration: none;
}
.link:hover{
    color: lightcoral;
    text-decoration: underline;
}
@media screen and (max-width: 520px) {
  .header a:not(:first-child) {display: none;}
  .header a.icon {
    float: right;
    display: block;
  }
}

/* The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. This class makes the topnav look good on small screens (display the links vertically instead of horizontally) */
@media screen and (max-width: 520px) {
  .header.responsive {position: relative;}
  .header.responsive a.icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .header.responsive .link {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>