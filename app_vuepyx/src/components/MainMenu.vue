<template>
  <div>
    <nav class="navbar is-dark is-bold">
      <div class="navbar-brand">
        <a class="navbar-item" href="/app/home">
          <strong>SysEventos</strong>
        </a>
        <!--<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>-->
        <button  role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMenu" @click="toggleNav" >
          
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button >
      </div>

      <div id="navbarMenu" class="navbar-menu nav-links" :class="{ 'active': isNavOpen }">
        <div class="navbar-start">
          <a class="navbar-item" href="/app/home">Inicio</a>
          
          <div class="navbar-item has-dropdown is-hoverable" >
            <a class="navbar-link">Registro</a>
            <div class="navbar-dropdown is-boxed">
              <a class="navbar-item" href="/app/periodo">Periodo</a>
              <a class="navbar-item" href="/app/usuario">Usuario</a>
            </div>
          </div>
          <!-- <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Sin Definir</a>
            <div class="navbar-dropdown">
              <a class="navbar-item" href="#">sin definir</a>
              <a class="navbar-item" href="#">sin definir</a>
            </div>
          </div> -->
        </div>
        
        <div class="navbar-end">
          <div class="navbar-item">
            <p class="has-text-white-bis">
          {{
            $store.state.user
              ? $store.state.user.nombre === 'Admin'
                ? $store.state.user.nombre
                : $store.state.user.nombre + ' ' + $store.state.user.apellido
              : ''
          }}
        </p>
            <button style="margin-left: 10px;" class="button is-danger" @click="logout">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      isNavOpen: false
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$store.commit('setUser', null); // Limpiar el usuario en el store
      this.$router.push({ name: 'Login' });
    },
    toggleNav() {
      console.log("Gggg");
      this.isNavOpen = !this.isNavOpen;

    }
  }
};
</script>

<style scoped>
.nav-links {
  display: none;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }
}

.nav-links.active {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background: #fff;
  padding: 1rem;
}
@import "~bulma/css/bulma.min.css";
</style>