<template>

<a>
<RouterLink to="/menu">MENU</RouterLink>  
</a>
  
<p>
  <h1>
      PAGE DE DECONNEXION
  </h1><br>

</p>

  <div>
    
      <el-form-item>
        <el-button type="warning" align-items="center" @click=" logoutUser">Se déconnecter</el-button>
      </el-form-item>
       
  </div>

</template>

<script setup lang="ts">

import router from "@/router";
import type { RouterLink } from 'vue-router'

import { ElButton, ElMessage, ElMessageBox } from "element-plus";


const logoutUser = async () => {

  try {
    await ElMessageBox.confirm(
      `Attention !
      Etes-vous sûr de vouloir vous déconnecter ?`,
      { confirmButtonText: 'OK',
        cancelButtonText: 'Annuler',
        type: 'warning',
      }
    );
    localStorage.removeItem('token');
    ElMessage({
      type:'success',
      message: 'Vous êtes bien déconnecté',
    })

    router.push({name :'HomePage'})
  }

  catch(error) {
    ElMessage({
      type: 'info',
      message: 'Déconnexion annulée',
    })
  }
}



 


  

</script>

<style scoped>

h1 {
  text-align: center;
}

el-form {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
