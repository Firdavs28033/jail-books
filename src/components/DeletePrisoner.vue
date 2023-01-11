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
                dark
                @click="deletePrisoner"
                justify="center"
                width="200"
            >
                Удалить
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props:{
        prisoner: String
    },
    data() {
        return {
            dialog: false,
            prisonerFullname: this.prisoner,
            fullname: '',
            deleteSuccess: false,
            errors: []
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

            this.deleteSuccess = true
            this.errors = []

            setTimeout(() => {
                this.dialog = false
                this.fullname = ''
                this.deleteSuccess = false
            }, 2000)
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
    
</style>