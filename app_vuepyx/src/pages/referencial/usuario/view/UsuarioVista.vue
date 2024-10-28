<template>
       <div class="container">
      <div class="header level">
        <div class="level-item">
          <p class="title is-3">Formulario Personal</p>
        </div>
      </div>
      <div class="field is-grouped" style="margin-bottom: 1em;">
        <div class="control">
          <div class="select">
            <select v-model="selectedPersonal">
              
              <option v-for="personal in personales" :key="personal.CI" :value="personal.CI">{{ personal.Nombre + ' ' + personal.Apellido }}</option>
            </select>
          </div>
                  </div>
        <div class="control">
          <button class="button is-primary" @click="addUsuario">Crear Usuario</button>
        </div>
      </div>
      <table class="table is-fullwidth is-bordered is-striped">
        <thead>
          <tr>
            <th>ID</th>
                       <th>Nombre de Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in paginatedUsuarios" :key="usuario.ID">
          <td>{{ usuario.ID }}</td>
         
          <td>{{ usuario.Nombre_Usuario }}</td>
            <td>
              <button class="button is-info is-small is-rounded" @click="resetPassword(usuario)" style="margin-right: 5px;">

                <span class="icon is-small">
                  <i class="fas fa-pencil-alt"></i>
                </span>
              </button>
              <button class="button is-danger is-small is-rounded" @click="deleteUsuario(usuario.ID)">
                <span class="icon is-small">
                  <i class="fas fa-trash-alt"></i>
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav class="pagination" role="navigation" aria-label="pagination">
     <ul class="pagination-list">
        <li v-for="page in totalPages" :key="page">
          <a class="pagination-link" :class="{ 'is-current': page === currentPage }" @click="goToPage(page)">{{ page }}</a>
        </li>
      </ul>
    </nav>
    </div>
  </template>
  
  <script>
  import axios from '@/axios.js';
  export default {
    data() {
      return {
        usuarios: [],
        personales: [],
        currentPage: 1,
      perPage: 5,
       
      };
    },

    computed: {
    paginatedUsuarios() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.usuarios.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.usuarios.length / this.perPage);
    }
  },
    methods: {
    async fetchUsuarios() {
      try {
        const response = await axios.get('/user/usuarios');  
        if (response.data.success) {
          this.usuarios = response.data.usuarios;
        } else {
          throw new Error('Error al obtener los datos');
        }
      } catch (error) {
        console.error(error);
      }
    },

    async fetchPersonales() {
    try {
        const response = await axios.get('/data/personales');
        console.log(response);
        if (response.data.success) {
            this.personales = response.data.personales[0];
        } else {
            throw new Error('Error al obtener los datos');
        }
    } catch (error) {
        console.error(error);
    }
},
// Método para agregar usuario
async addUsuario() {
    try {
        const response = await axios.post('/user/insertar-usuario', { CI: this.selectedPersonal, Password: 'micodigo' });
        if (response.data.success) {
            alert('Usuario insertado correctamente');
            this.fetchUsuarios();
        } else {
            throw new Error('Error al insertar usuario');
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);  // En caso de error, mostrar el mensaje del servidor
        } else {
            console.error(error);
        }
    }
},

async deleteUsuario(ID) {
    try {
      const response = await axios.delete('user/eliminar-usuario', { data: { ID } });
      if (response.data.success) {
        alert('Usuario eliminado correctamente');
        this.fetchUsuarios();
      } else {
        throw new Error('Error al eliminar personal');
      }
    } catch (error) {
      console.error(error);
    }
  },

  async resetPassword(usuario) {
    try {
      const response = await axios.put('/user/actualizar-usuario', {
        ID: usuario.ID,
        Nombre_Usuario: usuario.Nombre_Usuario,  // Mantener el mismo nombre de usuario
        Password: 'micodigo'  // Restablecer la contraseña a 'micodigo'
      });
      if (response.data.success) {
        alert('Contraseña reseteada');
        this.fetchUsuarios();  // Refrescar la lista de usuarios
      } else {
        throw new Error('Error al resetear la contraseña');
      }
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al resetear la contraseña');
    }
  },

    goToPage(page) {
      this.currentPage = page;
    }
  },
  mounted() {
    this.fetchUsuarios();
    this.fetchPersonales();
    }
  }
  </script>
  