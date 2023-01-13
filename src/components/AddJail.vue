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
                @click="addJail"
                justify="center"
                width="200"
                :disabled="blockBtn"
                class="add-btn"
            >
                Добавить
            </v-btn>
            </v-card-actions>

            <v-progress-linear
            indeterminate
            color="#0B465A"
            background-color="#CFD4D4"
            height="5"
            v-if="showProgress"
            ></v-progress-linear>
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
            jailName: '',
            addSuccess: false,
            addStatus: this.add,
            blockBtn: false,
            showProgress: false
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
            this.blockBtn = true
            this.showProgress = true

            // Сохранение в бд
            let toSaveData = {
                name: this.jailName
            }
           await addJail(toSaveData)
           .then(()=>{
                this.addSuccess = true
                this.errors = []
                this.showProgress = false

                return setTimeout(()=>{
                    this.dialog = false
                    this.jailName = ''
                    this.addSuccess = false
                    this.blockBtn = false
                    setTimeout(()=>{
                        window.location.reload()
                    },400)
                },2000)
           })
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
.add-btn.theme--light.v-btn {
    color: rgb(255 255 255 / 87%);
}
</style>