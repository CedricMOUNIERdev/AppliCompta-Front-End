<template>

<a>
<RouterLink to="/">PAGE D'ACCUEIL</RouterLink>  
</a>
  
<p>
  <h1>
      FORMULAIRE DE CONNEXION
  </h1><br>

</p>

  <div>

  <el-form
  :inline="true"
  :model="loginForm"
  @submit.prevent="loginUser"
  >

  <el-form-item label="Nom d'Utilisateur" prop="username">
       <el-input v-model="loginForm.username" placeholder="Nom d'Utilisateur"/>
    </el-form-item>

    <el-form-item label="Mot de passe" prop="password">
      <el-input v-model="loginForm.password" placeholder="Mot de Passe"/>
    </el-form-item><br>

    <el-button-group>
      <el-button type="warning" native-type="submit">Se connecter</el-button>
    </el-button-group>

  </el-form>
  </div>
</template>

<script setup lang="ts">

import router from "@/router";
import type { RouterLink } from 'vue-router'
import { ElMessage } from "element-plus";
import { ref } from "vue";
import type { ILoginForm}  from '@/type/Authentification';
import AuthDataService from '@/services/AuthDataService'

const loginForm = ref<ILoginForm> ({
  username: '',
  password: ''
})



const loginUser = async () => {
  try {
    const token = await AuthDataService.PostLoginUser(loginForm.value);
  
   localStorage.setItem('token', token);
   ElMessage({
    type: 'success',
    message: 'Vous êtes bien connecté !',
 })
   router.push({name :'Menu'})
  
  } catch (error) {
    console.error('Une erreur s\est produite lors de la connexion :', error);
    ElMessage({
    type: 'info',
    message:'La connexion a échoué'
  })
    
  }
  
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
