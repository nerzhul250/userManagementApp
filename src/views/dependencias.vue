<template>
    <v-data-table
        :headers="headers"
        :items="dependencias"
    >
        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title>Las dependendencias del sistema</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                    v-model="dialog"
                    max-width="1000px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                            >
                            Nueva dependencia
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="4">
                                        <v-text-field
                                            v-model="editedItem.nombre"
                                            label="Nombre"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            v-model="editedItem.coordinador"
                                            label="Coordinador"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            v-model="editedItem.ubicacion"
                                            label="Ubicacion"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                    <v-col cols="4">
                                        <v-text-field
                                            v-model="editedItem.maximo_numero_usuarios"
                                            label="Maximo Numero de usuarios"
                                            type="number"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-checkbox
                                            v-model="editedItem.activa"
                                            label="Activa"
                                        ></v-checkbox>
                                    </v-col>
                                    <v-col cols="4">
                                    </v-col>
                                <v-row>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="close"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="save"
                            >
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog 
                    v-model="dialogDelete" 
                    max-width="500px"
                >
                    <v-card>
                        <v-card-title class="headline">Estas seguro de eliminar esta dependencia?</v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog 
                    v-model="dialogUsers" 
                    max-width="500px"
                >
                    <v-list>
                        <v-list-item
                            v-for="(user,i) in usuarios"
                            :key="i"
                        >
                            <v-list-item-title>
                                {{user.nombre}}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{user.apellido}}
                            </v-list-item-subtitle>
                        </v-list-item>
                    </v-list>
                    <v-btn color="blue darken-1" text @click="closeShow">Cerrar</v-btn>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                class="mr-2"
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
            <v-icon
                small
                @click="showDependencyUsers(item)"
            >
                mdi-feature-search
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn
                color="primary"
                @click="initialize"
            >
                Reset
            </v-btn>
        </template>
    </v-data-table>
</template>

<script>

import {db} from '../firebase'

export default {
    data(){
        return {
            dependencias:[],
            usuarios:[],
            dialog: false,
            dialogDelete: false,
            dialogUsers:false,
             headers:[
                {text: 'Nombre', value: 'nombre'},
                {text: 'Coordinador', value: 'coordinador'},
                {text: 'Ubicacion', value: 'ubicacion'},
                {text: 'Maxino numero de usuarios', value:'maximo_numero_usuarios'},
                {text: 'Activa', value:'activa'},
                { text: 'Acciones', value: 'actions', sortable: false }
            ],
            editedItem: {
                nombre: '',
                coordinador:'',
                ubicacion:'',
                maximo_numero_usuarios:'',
                activa:''
            },
            defaultItem: {
                nombre: '',
                coordinador:'',
                ubicacion:'',
                maximo_numero_usuarios:'',
                activa:''
            },
            editedIndex: -1,
            showingDependency:''
        }
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Nueva dependencia' : 'Editar dependencia'
        }
    },
    methods:{
        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        closeShow(){
            this.dialogUsers = false;
            this.$nextTick(() => {
                this.usuarios=[];
                this.showingDependency='';
            })
        },
        save () {
            if (this.editedIndex != -1) {
                db.collection('dependencias')
                .doc(this.editedIndex)
                .set(this.editedItem)
            } else {
                db.collection('dependencias').add(this.editedItem)
            }
            this.close()
        },
        editItem (item) {
            this.editedIndex = item.id
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem (item) {
            db.collection('usuarios')
            .where('dependencia',"==",db.collection('dependencias').doc(item.id))
            .get()
            .then(querySnapshot =>{
                const usdep=querySnapshot.docs.map(doc => doc.data())
                if(usdep && usdep.length){
                    this.$alert("Oye manito, esta dependencia aun tiene usuarios");
                }else{    
                    this.editedIndex = item.id
                    this.editedItem = Object.assign({}, item)
                    this.dialogDelete = true
                }
            })
        },
        deleteItemConfirm () {
            db.collection('dependencias').doc(this.editedIndex).delete()
            this.closeDelete()
        },
        showDependencyUsers(item){
            this.dialogUsers=true;
            this.showingDependency=item;
            db.collection('usuarios')
            .where('dependencia',"==",db.collection('dependencias').doc(item.id))
            .get()
            .then(querySnapshot=>{
                const usdep=querySnapshot.docs.map(doc=>doc.data())
                this.usuarios=usdep;
            })
        }
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
        dialogUsers(val){
            val || this.closeShow()
        }
    },
    firestore: {
        dependencias: db.collection('dependencias')
    }
}
</script>

<style scoped>

</style>