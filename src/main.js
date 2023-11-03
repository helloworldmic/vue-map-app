//npm run dev
// import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'

console.log('hello vue')

 const app = 
      createApp(App)  //create instance
    
    // Vue.createApp({
    // data() {
    //     const title = ref('harry porter')  
    //     const count = ref(0) 
    //     return {
    //         title:'harry porter',   
    //         count: 0
    //     }
    //   }, 
    //*********************************** */
    // setup(){
    //     const location = ref('my home ')    
    //     const count= ref(0)  
    //     return {
    //         location, 
    //         count
    //     }
    // },
    
    //can either use template or setup()
    // template:'<h2>I am here</h2>'
   
// })
app.mount('#app')

