import { createApp } from 'vue'
import App from './App.vue'
// import { store, key } from './store'
import { rootStore } from './stores'
import router from './router'

const app = createApp(App)

app.use(rootStore)

// app.use(store, key)

app.use(router)

app.mount('#app')
