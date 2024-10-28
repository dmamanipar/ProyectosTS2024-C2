<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-1 has-text-centered">Sistema</h1>
      <div class="box has-text-centered">
        <p class="title is-2">{{ currentDate }}</p>
        <p class="subtitle is-4">{{ currentTime }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // importa el locale español

export default {
name: 'InicioMenu',
data() {
  dayjs.locale('es'); // establece el locale español
  return {
    currentDate: dayjs().format('dddd D [de] MMMM [del] YYYY'), // Formato: 'Lunes 4 de octubre del 2023'
    currentTime: dayjs().format('HH:mm:ss')
  };
},
methods: {

  
  updateTime() {
    this.currentTime = dayjs().format('HH:mm:ss');
  }
},


mounted() {
  this.timer = setInterval(this.updateTime, 1000);
},
beforeUnmount() {
  clearInterval(this.timer);
}
};
</script>

<style scoped>
/* estilos específicos de esta página */
.box {
margin-top: 20px;
margin-bottom: 20px;
background-color: #f5f5f5;
border-radius: 12px;
box-shadow: 0 2px 3px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.1);
}
</style>
