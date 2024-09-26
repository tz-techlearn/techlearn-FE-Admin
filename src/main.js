// main.js or main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { ToastContainer } from 'vue3-toastify';
import { Toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import Multiselect from 'vue-multiselect';
import CKEditor from '@ckeditor/ckeditor5-vue';
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';

const app = createApp(App);
library.add(fas);
app.component('fa', FontAwesomeIcon);
app.use(store);
app.use(router);
app.use(Toast);
app.use(BootstrapVue3);
app.use(CKEditor);
app.use(CkeditorPlugin)
app.component('ToastContainer', ToastContainer);
app.component('Multiselect', Multiselect);
app.mount('#app');