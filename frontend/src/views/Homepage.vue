<template>
    <div>
        <div class="divLogo">
            <img class="logo" src="../assets/icon-left-font-monochrome-white.png" alt="logo Groupomania">
        </div>
        <div>
            <img id="banniere" src="../assets/banniere.jpg" alt="bannière de la page d'accueil">
        </div>
        <div class="title">
            <h1>Réseau social de l'entreprise Groupamania</h1>
            <p>La direction avait promis des mesures d'amélioration de la communication entre collègues.
                Voici le tout premier réseau social interne de Groupomania. 
                Moderne et ludique il permet aux employés de se connaître dans un cadre plus informel.
                Vous aussi venez l'essayer et retrouvez du plaisir à travailler tous ensemble. </p>
        </div>
        <div class="divButton">
            <router-link to="/login">
            <button class="button">Se connecter</button>
            </router-link>
            <router-view/>
        </div>
        <div class="faq">
            <h2> Règles à respecter dans le cadre de l'entreprise</h2>
            <ul>
                <li>Le réseau n'est pas exempt du règlement intérieur de l'entreprise. </li>
                <li>Les posts même emprunt d'humour doivent garder un caractère semi-professionnel. &#128521;</li>
                <li>Tout contenu haineux, raciste, discriminant ou pornographique sera supprimé et condamné.</li>
                <li>Les employés devront signaler la création d'un compte et transmettre leur identifiant à la direction.</li>
            </ul>
        </div>
    </div>
</template>

<script>

</script>

<style  scoped>
.divLogo{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2em;
}
h1{
    text-decoration: underline;
    margin-bottom: 1em;
}
.title{
    text-align: center;
    margin: 3em;
    color: #ffffff;
}
.button{
    width: 250px;
}
.divButton{
    padding-top: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
}
.faq {
    padding: 2em;
    text-align: center;
    color: #ffffff;
}
h2{
    text-decoration: underline;
    margin-bottom: 1em;
}
</style>
