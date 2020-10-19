import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import { db } from "./firebase" 

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        user:{
            nombre:'',
            apellido:'',
            email:''
        },
        errorAlert:false
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
                    commit('setNombre',user.nombre)
                    commit('setApellido',user.apellido)
                    router.push('/usuarios')
                }else{
                    commit('setErrorAlert',true)
                }
            })
        },
        logout({commit}){
            commit('setEmail','')
            commit('setNombre','')
            commit('setApellido','')
            return true;
        }
    },
    mutations: {
        setEmail(state,email){
            state.user.email=email;
        },
        setNombre(state,nombre){
            state.user.nombre=nombre;
        },
        setApellido(state,apellido){
            state.user.apellido=apellido;
        },
        setErrorAlert(state,errorAlert){
            state.errorAlert=errorAlert;
        }
    }
})