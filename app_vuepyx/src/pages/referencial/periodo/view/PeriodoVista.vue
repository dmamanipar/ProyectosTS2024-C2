<template>
      <div class="container">

        <div class="header level">
          <div class="level-item">
            <p class="title is-3">Formulario Periodo</p>
          </div>
        </div>

        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form @submit.prevent="addPeriodo" class="box has-background-white-ter">
              <table>
                <tr>
                  <td><label class="label">ID:</label></td>
                  <td><input class="input" v-model="newPeriodo.id" type="text" placeholder="CI"></td>
                </tr>
                <tr>
                  <td><label class="label">Nombre:</label></td>
                  <td><input class="input" v-model="newPeriodo.nombre" type="text" placeholder="Nombre"></td>
                </tr>
                <tr>
                  <td><label class="label">Estado:</label></td>
                  <td><input class="input" v-model="newPeriodo.estado" type="text" placeholder="Estado"></td>
                </tr>
              </table>
                            
              <div class="field">
                <div class="control">
                  <button type="submit" class="button is-success is-rounded">Guardar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ConfirmPopup id="confirm" aria-label="popup" />
  <div class="container">
   
<table class="table is-fullwidth is-bordered is-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Estado</th>
          <th>Acciones</th> 
        </tr>
      </thead>
      <tbody>
        <!--<tr>
         
          <td><input class="input" v-model="newPeriodo.id" type="text" placeholder="ID"></td>
          <td><input class="input" v-model="newPeriodo.nombre" type="text" placeholder="Nombre"></td>
          <td><input class="input" v-model="newPeriodo.estado" type="text" placeholder="Estado"></td>
          <td><button class="button is-success is-rounded" @click="addPeriodo">Guardar</button></td>
        
        </tr> -->
        <tr v-for="periodo in paginatedPeriodos" :key="periodo.id">
          <td>
            <input
              v-if="editingCI === periodo.id"
              class="input"
              v-model="editingPeriodo.id"
              type="text"
            >
            <template v-else>
              {{ periodo.id }}
            </template>
          </td>
          <td>
            <input
              v-if="editingCI === periodo.id"
              class="input"
              v-model="editingPeriodo.nombre"
              type="text"
            >
            <template v-else>
              {{ periodo.nombre }}
            </template>
          </td>
           <td>
            <input
              v-if="editingCI === periodo.id"
              class="input"
              v-model="editingPeriodo.estado"
              type="text"
            >
            <template v-else>
              {{ periodo.estado }}
            </template>
          </td>
          
          <td>
            <button
              v-if="editingCI !== periodo.id"
              class="button is-warning is-small is-rounded"
              @click="editPeriodo(periodo)"
              style="margin-right: 0.5em;"
            >
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </button>
            <button
              v-if="editingCI === periodo.id"
              class="button is-success is-small is-rounded"
              @click="updatePeriodo"
              style="margin-right: 0.5em;"
            >
              <span class="icon is-small">
                <i class="fas fa-check"></i>
              </span>
            </button>
            <button class="button is-danger is-small is-rounded" name="eliminar" @click="confirm(periodo.id)">
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
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import ConfirmPopup from 'primevue/confirmdialog';
import 'primevue/resources/themes/lara-dark-teal/theme.css';

export default {
  data() {
    return {
      periodos: [],
      currentPage: 1,
      perPage: 5,
      newPeriodo: {
        id: 0,
        nombre: '',
        estado: ''
      },
      editingCI: null,
      editingPeriodo: {
        id: 0,
        nombre: '',
        estado: ''
      },
    };
  },
  computed: {
    paginatedPeriodos() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.periodos.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.periodos.length / this.perPage);
    }
  },
  components: {
    ConfirmPopup 
  },
  methods: {
    async addPeriodo() {
      try {
        const response = await axios.post('asis/periodo/crear', this.newPeriodo,
        {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
        );
        if (response.data!=null) {
          toast.success("Periodo insertado correctamente", {
            autoClose: 1000,
          });
          this.newPeriodo.nombre="";
          this.newPeriodo.estado="";
          this.fetchPeriodos();
        } else {
          throw new Error('Error al insertar personal');
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPeriodos() {
      try {
        console.log("verrr:"+localStorage.getItem('token'))
        const response = await axios.get('asis/periodo/list', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });  
        if (response.data!=null) {
          console.log("Holas");
          console.log("Holas:"+response.data[0].nombre);
          this.periodos = response.data;
        } else {
          throw new Error('Error al obtener los datos');
        }
      } catch (error) {
        console.error(error);
      }
    },
    editPeriodo(periodo) {
      this.editingCI = periodo.id;
      Object.assign(this.editingPeriodo, periodo);
    },
    async updatePeriodo() {
      try {
        const response = await axios.put('asis/periodo/editar/'  + this.editingPeriodo.id, this.editingPeriodo, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
        if (response.data!=null) {
          toast.success("Periodo actualizado correctamente", {
            autoClose: 1000,
          });
          this.editingCI = null;
          this.fetchPeriodos();
        } else {
          toast.success("Error al actualizar Periodo", {
            autoClose: 1000,
          });
          throw new Error('Error al actualizar Periodo');
        }
      } catch (error) {
        console.error(error);
        toast.error("Error", {
            autoClose: 1000,
          });
      }
    },

    confirm(dato) {
      this.$confirm.require({
        message: '¿Estás seguro de eliminar el registro '+dato+'?',
        header: 'Confirmación!',
        acceptClass: 'p-button-danger',
        accept: () => { 
          // Acción si confirma
          this.deletePeriodo(dato);
        },
        reject: () => {
          // Acción si cancela
        }  
      })
    }, 
    async deletePeriodo(CI) {
    try {
      const response = await axios.delete('asis/periodo/eliminar/' + CI,  {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      if (response.data.deleted) {
        //alert('Periodo eliminado correctamente');
        toast.success("Periodo eliminado correctamente", {
            autoClose: 1000,
          });
        this.fetchPeriodos();
      } else {
        throw new Error('Error al eliminar Periodo');
      }
    } catch (error) {
      console.error(error);
    }
  },

    goToPage(page) {
      this.currentPage = page;
    }
  },
  mounted() {
    this.fetchPeriodos();
  }
};
</script>
