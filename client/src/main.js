import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'

// import quasar extras
import '@quasar/extras/mdi-v6/mdi-v6.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'

// import quasar css style
import 'quasar/src/css/index.sass'

// app
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

app.use(Quasar, {
  plugins: {},
})

app.use(router)

app.mount('#app')

