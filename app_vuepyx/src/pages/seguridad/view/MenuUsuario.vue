<template>
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-half">
                <div class="card" style="width: 450px;">
                    <div class="card-content">
                        <section>
                            <p class="subtitle is-4 has-text-centered">Datos del Personal</p>
                            <div class="columns">
                                <div class="column is-half">
                                    <div class="field">
                                        <input placeholder="Cedula" :value="usuario?.CI" class="input is-primary" type="text" disabled/>
                                    </div>
                                </div>
                                <div class="column is-half">
                                    <div class="field">
                                        <input placeholder="Nombre y Apellido" :value="usuario?.Nombre_Usuario" class="input is-primary" type="text" disabled/>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        <section>
                            <div class="columns">
                                <div class="column is-half">
                                    <div class="field">
                                        <input placeholder="Telefono" class="input is-primary" type="text" disabled/>
                                    </div>
                                </div>
                                <div class="column is-half">
                                    <div class="field">
                                        <input placeholder="Email" class="input is-primary" type="text" disabled/>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        <section>
                            <div class="columns">
                                <div class="column is-half">
                                    <div class="field">
                                        <input placeholder="Nombre de usuario" class="input is-primary" type="text" disabled/>
                                    </div>
                                </div>
                                <div class="column is-half">
                                    <div class="field">
                                        <input v-model="nuevaContrasena" placeholder="Nueva Contraseña" class="input is-primary" type="text"/>
                                        <button @click="actualizarContrasena" class="button is-primary" style="margin: 15px">Modificar</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/axios.js';

export default {
  data() {
    return {
      usuario: null,
      nuevaContrasena: ''
    };
  },
  async mounted() {
    console.log('User ID:', this.$store.state.user.id);
    try {
      const response = await axios.get('/auth/user-personal-detalles', {
        params: { usuarioID: this.$store.state.user.id },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      this.usuario = response.data[0];
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
},
  methods: {
    async actualizarContrasena() {
      try {
        await axios.put('/user/actualizar-usuario', {
          ID: this.usuario.ID,
          Nombre_Usuario: this.usuario.Nombre_Usuario,
          Password: this.nuevaContrasena
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        alert('Contraseña actualizada correctamente');
      } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
      }
    }
  }
};
</script>


<style>
@import "~bulma/css/bulma.min.css";
</style>
