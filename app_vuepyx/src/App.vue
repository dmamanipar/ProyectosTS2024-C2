<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('fetchUserDetails');
    }
  }
}
</script>
