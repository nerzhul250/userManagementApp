<template>
    <div>
        <div class="d-flex justify-center align-center mt-16">
            <v-card>
                <v-card-title>
                    Registro
                </v-card-title>
                <v-form v-model="valid" class="mt-n15 px-10 pb-10">
                    <div class="mt-15">
                        <v-text-field
                            v-model="nombre"
                            label="Nombre"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="apellido"
                            label="Apellido"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="Email"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            label="Password"
                            type="password"
                            required
                        ></v-text-field>
                        <v-select
                            v-model="dependencia"
                            :items="dependencias"
                            item-text="nombre"
                            return-object
                            required
                        ></v-select>
                        <v-btn @click="submit">
                            Registrarse!
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
                Ha habido un error con el formulario, ingrese de nuevo los datos
            </v-alert>
        </div>
    </div>
</template>

<script>
import {db} from '../firebase'

var md5 = require('md5');

export default {
    data(){
        return {
            errorAlert:false,
            valid:false,
            nombre:'',
            email:'',
            apellido:'',
            dependencia:'',
            valido_hasta:'2020/12/31',
            activo:true,
            password:'',
            dependencias: [],
            emailRules: [
                v => !!v || 'E-mail es obligatorio',
                v => /.+@.+/.test(v) || 'E-mail es invalido',
            ],
             passwordRules: [
                p => !!p || 'Password es obligatorio'
            ],
        }
    },
    methods:{
        submit(){
            if(this.valid){
                let nuevoUsuario={
                    nombre:this.nombre,
                    apellido:this.apellido,
                    email:this.email,
                    dependencia:db.collection('dependencias').doc(this.dependencia.id),
                    valido_hasta:this.valido_hasta,
                    activo:this.activo,
                    password:md5(this.password)
                }
                db.collection('usuarios').add(nuevoUsuario)
                this.$router.push('/')
            }else{
                this.errorAlert=true;
            }
        }
    },
    firestore: {
        dependencias: db.collection('dependencias')
    }
}
</script>


<style scoped>

</style>