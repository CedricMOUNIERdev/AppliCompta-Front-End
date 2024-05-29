<template>
  
<p>

    <h1>
        MENU 
    </h1><br>

</p>    
  
<a>
<div class="container">
       
  
  <RouterLink to="/customer/form">CREER UN NOUVEAU CLIENT</RouterLink><br>

  <RouterLink to="/customer/table">ACCEDER AU TABLEAU CLIENTS</RouterLink><br>

  <RouterLink to="/accountingDocument/form">CREER UN NOUVEAU DOCUMENT COMPTABLE</RouterLink><br>

  <RouterLink to="/accountingDocument/table">ACCEDER AU TABLEAU DOCUMENTS COMPTABLES</RouterLink><br>

  <RouterLink to="/logout">SE DECONNECTER</RouterLink><br>


</div>
</a>    
  
</template>

<style scoped >

h1 {
  text-align: center;
}

.container {
 
  align-items: center;
}



</style>



