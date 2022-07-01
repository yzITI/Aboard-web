import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')

// prevent close
window.onbeforeunload = () => 'You are leaving Aboard!'
