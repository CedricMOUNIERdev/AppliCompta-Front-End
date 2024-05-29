<template>
  
<div>

    <h1>
        BIENVENUE SUR APPLI COMPTA !
    </h1><br>

    <p>
        Afin de pouvoir utiliser APPLI COMPTA, vous devez impérativement vous connecter à chaque utilisation, après vous être préalablement inscrit.
    </p><br>


</div>    
  
<div>

<el-button-group>
    <el-button class="bouton-espace" type="warning" @click=" loginForm">Déjà inscrit</el-button>
    <el-button class="bouton-espace" type="warning" @click=" registerForm">S'inscrire</el-button>
</el-button-group>

</div> 
  

  
  
</template>

<script setup lang="ts">

import router from '@/router';
import { ElButton, ElButtonGroup }from 'element-plus';

const loginForm = async () => {
  router.push({name :'LoginForm'})

}

const registerForm = async () => {
  router.push({name :'RegisterForm'})
}



</script>

<style scoped>

h1 {
  text-align: center;
}

.el-button-group {
  display: flex;
  justify-content: center;
  align-items: center;
  
}



</style>



