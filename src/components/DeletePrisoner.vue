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
                <input class="input" type="text" placeholder="Ф.И.О. осужденного" v-model="fullname">
                <p>Напишите полное имя осужденного: <b>{{ prisonerFullname }}</b></p>
            </div>

            <v-divider></v-divider>

            <v-card-actions>

            <div class="prisoners-errors-box">
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
                >Осужденный удалён</v-alert>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="red"
                small
                @click="deletePrisoner"
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
import deletePrisoner from "@/services/deletePrisoner";

export default {
    props:{
        prisoner: String,
        prisonerID: String
    },
    data() {
        return {
            dialog: false,
            prisonerFullname: this.prisoner,
            fullname: '',
            deleteSuccess: false,
            errors: [],
            blockBtn: false,
            showProgress: false
        }
    },
    methods: {
        deletePrisoner: function (){
            if(!this.fullname){
                return this.errors.push('Введите полное имя удаляемого осужденного')
            }
            if(this.fullname != this.prisonerFullname){
                return this.errors.push('Введённое значение не совпадает с полным именем удаляемого осужденного')
            }
            this.blockBtn = true
            this.showProgress = true

            deletePrisoner(this.prisonerID)
            .then(()=>{
                this.deleteSuccess = true
                this.errors = []
                this.showProgress = false

                setTimeout(() => {
                    this.dialog = false
                    this.fullname = ''
                    this.deleteSuccess = false
                    this.blockBtn = false
                    setTimeout(()=>{
                        window.location.reload()
                    },400)
                }, 2000)
            })
        }
    },
    watch:{
        fullname: function (){
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