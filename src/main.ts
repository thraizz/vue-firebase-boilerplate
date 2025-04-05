import { createApp } from 'vue';
import { VueFire, VueFireAuth } from 'vuefire';

import App from './App.vue';
import { firebaseApp } from './firebase';
import router from './router';
import './style.css';

const app = createApp(App);
app.use(router);

app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
});

app.mount('#app');
