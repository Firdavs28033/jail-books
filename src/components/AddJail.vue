<template>
    <v-dialog
        v-model="dialog"
        width="700"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            dark
            color="#0B465A"
            small
            v-bind="attrs"
            v-on="on"
            >
            + добавить учреждение
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 add-jail-dialog"
            >
            Добавить учреждение
            </v-card-title>

            <div class="dialog-content">
                <input class="input" type="text" placeholder="Наименование учреждения" v-model="jailName">
            </div>

            <v-divider></v-divider>

            <v-card-actions>
                
            <div class="jails-errors-box">
                <v-alert
                color="red"
                dense
                dismissible
                elevation="3"
                type="error"
                class="subtitle-2"
                v-for="error in errors"
                >{{ error }}</v-alert>

                <v-alert
                dense
                dismissible
                elevation="3"
                type="success"
                class="subtitle-2"
                v-if="addSuccess"
                >Новое учреждение добавлено</v-alert>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="#0B465A"
                small
                dark
                @click="addJail"
                justify="center"
                width="200"
            >
                Добавить
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import addJail from '@/services/addJail'

export default {
    data() {
        return {
            dialog: false,
            errors:[],
            addSuccess: false,
            jailName: ''
        }
    },
    methods: {
       addJail: async function(){
            if(!this.jailName){
                return this.errors.push('Заполните поля названия нового учреждения')
                
            }
            if(this.jailName.length<=12){
                return this.errors.push('Название учреждения должно быть больше 12 символов')
            }

            // Сохранение в бд
            let toSaveData = {
                name: this.jailName
            }
           await addJail(toSaveData)

            this.addSuccess = true
            this.errors = []

            return setTimeout(()=>{
                this.dialog = false
                this.jailName = ''
                this.addSuccess = false
                window.location.reload()
            },2000)
       }
    },
    watch:{
        jailName: function(){
            this.errors = []
        }
    }
}
</script>

<style>
</style>