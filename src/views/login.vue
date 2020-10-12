<template>
    <v-form v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="4">

                </v-col>
                <v-col cols="4">
                    <div class="mt-15">
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="Email"
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            label="Password"
                            type="password"
                        ></v-text-field>
                        <v-btn @click="submit">
                            Submit
                        </v-btn>
                    </div>
                </v-col>
                <v-col cols="4">

                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
var md5 = require('md5');
export default {
    name:'login',
    data: () => ({
        valid:false,
        email:"",
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        password:""
    }),
    methods: {
        submit(){
            let data = {
                email:this.email,
                password:md5(this.password)
            }
            this.$store.dispatch('login',data);
        }
    }
}
</script>

<style scoped>

</style>