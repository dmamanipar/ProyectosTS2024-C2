<template>
  <section class="hero is-fullheight is-primary">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form @submit.prevent="handleSubmit" class="box has-background-white-ter">
              <div class="field">
                <label class="label">Nombre de Usuario</label>
                <div class="control has-icons-left">
                  <input class="input" type="text" v-model="username" required placeholder="Usuario">
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Contraseña</label>
                <div class="control has-icons-left">
                  <input class="input" type="password" v-model="password" required placeholder="Contraseña">
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button type="submit" class="button is-link is-fullwidth has-text-weight-medium">Iniciar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  <script>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useStore } from "vuex";
  import axios from '../axios';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  export default {
    setup() {
      const router = useRouter();
      const username = ref("");
      const password = ref("");
      const store = useStore();
      var data;
      const handleSubmit = async () => {
  try {
    const response = await axios.post('/asis/login', {
      correo: username.value,
      password: password.value,
    });
    
    data = response.data;
    
    if (data.correo==username.value) {
      //localStorage.setItem('token', data.token);
      window.localStorage.setItem('token', data.token);
      
      //window.setCookie('token', data.token)
      localStorage.setItem('correo', data.correo);
      const userDetailsResponse = await axios.post('/asis/detail', {
        correo: data.correo
      }
      ,{
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token')
        }
      });
      
      const userDetails = userDetailsResponse.data;
      const nombre=userDetails.nombres;
      const apellido=userDetails.apellidos;
      //const { nombre, apellido } = userDetails;
      store.commit('setUser', { nombre, apellido });
      router.push({ name: "Home" });
    } else {
      //alert(data.message);
      alert("Error de credenciales intente de nuevo...");
    }
  } catch (error) {
    console.error('An error occurred:', error);
    toast.error("Verifique las credenciales!", {
            autoClose: 1000,
          });
    
  }
};
      return {
        username,
        password,
        handleSubmit,
      };
    },
  };
  </script>
  
  
  <style>
  @import "~bulma/css/bulma.min.css";
  </style>
  @/axios.js