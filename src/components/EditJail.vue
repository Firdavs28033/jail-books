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
            <span style="color:#0B465A">Изменить</span>
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 add-jail-dialog"
            >
            Изменить наименование учреждения
            </v-card-title>

            <div class="dialog-content">
                <h4 class="mb-2">{{ oldName }} → {{ jailName }}</h4>
                <input class="input" type="text" placeholder="Новое наименование" v-model="jailName">
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
                v-if="editSuccess"
                >Изменения сохранены</v-alert>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="#0B465A"
                small
                @click="editJail"
                justify="center"
                width="200"
                :disabled="blockBtn"
                class="edit-btn"
            >
                Изменить
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
import editJail from "@/services/editJail";

export default {
    props:{
        jail: String,
        jailID: String
    },
    data() {
        return {
            dialog: false,
            errors: [],
            editSuccess: false,
            jailName: '',
            oldName: this.jail,
            id: this.jailID,
            blockBtn: false,
            showProgress: false
        }
    },
    methods: {
       editJail: function(){
            if(!this.jailName){
                return this.errors.push('Заполните поля нового названия учреждения')
                
            }
            if(this.jailName.length<=12){
                return this.errors.push('Название учреждения должно быть больше 12 символов')
            }
            if(this.jailName==this.oldName){
                return this.errors.push('Новое наименование учреждения совпадает со старым')
            }
            this.blockBtn = true
            this.showProgress = true

            // Сохранение в бд
            editJail(this.id,this.oldName,this.jailName)
            .then(()=>{
                this.editSuccess = true
                this.showProgress = false
                this.errors = []

                return setTimeout(()=>{
                    this.editSuccess = false
                    this.dialog = false
                    this.jailName = ''
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
.edit-btn.theme--light.v-btn {
    color: rgb(255 255 255 / 87%);
}
</style>