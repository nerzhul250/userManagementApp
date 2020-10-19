<template>
    <div>
        <div class="d-flex justify-center align-center mt-16">
            <v-card>
                <v-card-title>
                    Login
                </v-card-title>
                <v-form v-model="valid" class="mt-n15 px-10 pb-10">
                    <div class="mt-15">
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="Email"
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            label="Password"
                            type="password"
                        ></v-text-field>
                        <v-btn @click="submit">
                            Entrar
                        </v-btn>
                        <v-btn to='/registration'>
                            Registro
                        </v-btn>
                    </div>
                </v-form>
            </v-card>
        </div>
        <div
            class="d-flex justify-center align-end"
        >
            <v-alert
                v-model="errorAlert"
                border="right"
                colored-border
                type="error"
                elevation="2"
                dismissible
                max-width="500"
            >
                Sus credenciales no se encuentran en el sistema,
                intente con unas distintas
            </v-alert>
            <v-alert
                v-model="errorAlert2"
                border="right"
                colored-border
                type="error"
                elevation="2"
                dismissible
                max-width="500"
            >
                Ha habido un error con el formulario, ingrese de nuevo los datos
            </v-alert>
        </div>
        
    </div>
</template>

<script>
var md5 = require('md5');
export default {
    name:'login',
    data: () => ({
        valid:false,
        errorAlert2:false,
        email:"",
        emailRules: [
            v => !!v || 'E-mail es obligatorio',
            v => /.+@.+/.test(v) || 'E-mail es invalido',
        ],
        passwordRules: [
            p => !!p || 'Password es obligatorio'
        ],
        password:""
    }),
    methods: {
        submit(){
            if(this.valid){
                let data = {
                    email:this.email,
                    password:md5(this.password)
                }
                this.$store.dispatch('login',data)
            }else{
                this.errorAlert2=true;
            }
        }
    },
    computed:{
        errorAlert:{
            get(){
                return this.$store.state.errorAlert;
            },
            set(v){
                this.$store.commit('setErrorAlert',v)
            }
        }
    }
}
</script>

<style scoped>

</style>