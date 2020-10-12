<template>
    <v-data-table
        :headers="headers"
        :items="usuarios"
    >
        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title>My CRUD</v-toolbar-title>
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
                            Nuevo usuario
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
                                            v-model="editedItem.apellido"
                                            label="Apellido"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            v-model="editedItem.email"
                                            label="Email"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4">
                                        <v-checkbox
                                            v-model="editedItem.activo"
                                            label="Activo"
                                        ></v-checkbox>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-select
                                            v-model="editedItem.dependencia"
                                            :items="dependencias"
                                            item-text="nombre"
                                            item-value="id"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="4">
                                        
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-date-picker v-model="editedItem.valido_hasta"></v-date-picker>
                                    </v-col>
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
                        <v-card-title class="headline">Estas seguro de eliminar este usuario?</v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
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
                @click="deleteItem(item)"
            >
                mdi-delete
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

var md5 = require('md5');

export default {
    data() {
        return {
            usuarios: [],
            dependencias: [],
            dialog: false,
            dialogDelete: false,
            headers:[
                {text: 'Nombre', value: 'nombre'},
                {text: 'Apellido', value: 'apellido'},
                {text: 'Email', value: 'email'},
                {text: 'Valido hasta', value:'valido_hasta'},
                {text: 'Activo', value:'activo'},
                {text: 'Dependencia', value:'dependencia.nombre'},
                { text: 'Acciones', value: 'actions', sortable: false }
            ],
            editedItem: {
                nombre: '',
                apellido:'',
                email:'',
                valido_hasta:'',
                activo:'',
                dependencia:'',
            },
            defaultItem: {
                nombre: '',
                apellido:'',
                email:'',
                valido_hasta:'',
                activo:'',
                dependencia:''
            },
            editedIndex: -1
        }
    },
    computed:{
        formTitle () {
            return this.editedIndex === -1 ? 'Nuevo usuario' : 'Editar usuario'
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
        save () {
            if (this.editedIndex != -1) {
                if(this.editedItem.dependencia.nombre===undefined){   
                    this.editedItem.dependencia=db.collection('dependencias').doc(this.editedItem.dependencia);
                }
                db.collection('usuarios')
                .doc(this.editedIndex)
                .set(this.editedItem)
            } else {
                let nuevoUsuario=this.editedItem;

                nuevoUsuario.dependencia=db.collection('dependencias').doc(nuevoUsuario.dependencia);
                nuevoUsuario.password=md5('123456');

                db.collection('usuarios').add(nuevoUsuario)
            }
            this.close()
        },
        editItem (item) {
            this.editedIndex = item.id
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = item.id
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            db.collection('usuarios').doc(this.editedIndex).delete()
            this.closeDelete()
        }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    firestore: {
        usuarios: db.collection('usuarios'),
        dependencias: db.collection('dependencias')
    }
}
</script>

<style scoped>

</style>