

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import StyleClass from 'primevue/styleclass';
//import Tailwind from 'primevue/passthrough/tailwind';
//createApp(App).mount('#app')  .use(Toaster)
createApp(App).use(router).use(store)
.use(PrimeVue, )
.use(ConfirmationService)

.directive('styleclass', StyleClass)
.component('ConfirmDialog', ConfirmDialog)
.mount('#app')
