<template>

<a>
<RouterLink to="/">PAGE D'ACCUEIL</RouterLink>  
</a>
  
<p>
  <h1>
      FORMULAIRE D'INSCRIPTION
  </h1><br>

</p>

  <div>

  <el-form
  :inline="true"
  :model="registerForm"
  @submit.prevent="registerUser"
  >

  <el-form-item label="Nom d'utilisateur" prop="username">
       <el-input v-model="registerForm.username" placeholder="Nom d'Utilisateur"/>
    </el-form-item>

    <el-form-item label="Mot de passe" prop="password">
      <el-input v-model="registerForm.password" placeholder="Mot de Passe"/>
    </el-form-item><br>

    <el-button-group>
      <el-button type="warning" native-type="submit">S'inscrire</el-button>
    </el-button-group>
      
  </el-form>
  </div>

</template>

<script setup lang="ts">

import router from "@/router";
import type { RouterLink } from 'vue-router'
import { ref } from "vue";
import type { IRegisterForm }  from '@/type/Authentification';
import { ElForm, ElButton, ElMessage } from "element-plus";
import AuthDataService from '@/services/AuthDataService'

const registerForm = ref <IRegisterForm> ({
  username: '',
  password: ''
})

 const registerUser = async () => {
 try {
  
  const response = await AuthDataService.PostRegisterUser(registerForm.value);
 
  ElMessage({
    type: 'success',
    message: 'Vous êtes bien enregistré !',
 })
  
 router.push({name :'LoginForm'})


  } catch (error) {
  
  console.error('Une erreur s\est produite lors de l\enregistrement :', error);

  ElMessage({
    type: 'info',
    message:'L\enregistrement a échoué'
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
