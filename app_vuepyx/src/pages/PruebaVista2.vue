

<template>
  <button @click="miFuncion('David')" id="dax">Hacer Algo</button>
  
  <ConfirmPopup id="confirm" aria-label="popup" />

  <button @click="confirm('David')" icon="pi pi-check">Confirmar</button>

  
</template>


<script >
import ConfirmPopup from 'primevue/confirmdialog';

import 'primevue/resources/themes/lara-dark-teal/theme.css';


export default {
  components: {
    ConfirmPopup 
  },
  methods: {
    async miFuncion(dato){
      console.log("Holas:"+dato);
    },
    
    confirm(dato) {
      this.$confirm.require({
        message: '¿Estás seguro  '+dato+'?',
        header: 'Confirmacion...',
        acceptClass: 'p-button-danger',
        accept: () => { 
          // Acción si confirma
          this.submitData(dato);
        },
        reject: () => {
          // Acción si cancela
        }  
      })
    }, 
    
    submitData(dato) {
      console.log("Holasssss: "+dato)
    }
  }
}  
</script>