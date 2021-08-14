<template>
    <div class="header">  
        <img src="../assets/icon-left-font-monochrome-white.png" alt="logo groupomania">
        <router-link to="/profil" class="link">Profil</router-link> 
        <router-link to="/wall" class="link">Posts</router-link> 
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "Header",
}
</script>

<style scoped>

.header{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2em;
}
img{
    width: 250px;
    
}
.link{
    color: #ffffff;
    font-size: 22px;
    padding-left: 2em;
    text-decoration: none;
}
.link:hover{
    color: lightcoral;
    text-decoration: underline;
}

</style>