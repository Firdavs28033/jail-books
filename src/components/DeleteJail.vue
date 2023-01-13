<template>
    <v-dialog
        v-model="dialog"
        width="700"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            class="header__btn"
            small
            v-bind="attrs"
            v-on="on"
            >
            <span style="color:red">Удалить</span>
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 add-jail-dialog"
            >
            Подтверждение удаления
            </v-card-title>

            <div class="dialog-content">
                <input class="input" type="text" placeholder="Наименование учреждения" v-model="fixName">
                <p class="body-2">Напишите полное наименование учреждения: <b>{{ jailName }}</b></p>
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
                v-if="deleteSuccess"
                >Учреждение удалено</v-alert>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="red"
                small
                @click="deleteJail"
                justify="center"
                width="200"
                :disabled="blockBtn"
                class="delete-btn"
            >
                Удалить
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
import deleteJail from '@/services/deleteJail'

export default {
    props:{
        jail: String,
        jailID: String
    },
    data() {
        return {
            dialog: false,
            jailName: this.jail,
            fixName: '',
            errors: [],
            deleteSuccess: false,
            id: this.jailID,
            blockBtn: false,
            showProgress: false
        }
    },
    methods: {
        deleteJail: async function (){
            if(!this.fixName){
                return this.errors.push('Введите название удаляемого учреждения')
            }

            if(this.fixName!=this.jailName){
                return this.errors.push('Введённое значение не совпадает с названием удаляемого учреждения')
            }
            this.blockBtn = true
            this.showProgress = true

            // Удаление из БД
            await deleteJail(this.jailID)
            .then(()=>{
                this.deleteSuccess = true
                this.errors = []
                this.showProgress = false

                return setTimeout(()=>{
                    this.dialog = false
                    this.fixName = ''
                    this.deleteSuccess = false
                    this.blockBtn = false
                    setTimeout(()=>{
                        window.location.reload()
                    },400)
                },2000)
            })
        }    
    },
    watch:{
        fixName: function (){
            this.errors = []
        }
    }
}
</script>

<style>
    .delete-btn.theme--light.v-btn {
        color: rgb(255 255 255 / 87%);
    }
</style>