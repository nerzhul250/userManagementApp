import Vue from 'vue'
import Vuex from 'vuex'
import { db } from "./firebase" 

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        user:{
            email:''
        },
    },
    actions:{
        login({commit},data){
            db.collection('usuarios')
            .get()
            .then(querySnapshot => {
                const usuarios = querySnapshot.docs.map(doc => doc.data())
                let user = usuarios.find(x => (x.email===data.email & x.password===data.password))
                if(user){
                    commit('setEmail',user.email)
                    return true;
                }else{
                    return false;
                }
            })
        }
    },
    mutations: {
        setEmail(state,email){
            state.user.email=email;
        }
    }
})