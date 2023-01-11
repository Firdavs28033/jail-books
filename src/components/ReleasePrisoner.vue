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
            <span style="color:#8C9EFF">Освобождён</span>
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 add-jail-dialog"
            >
            Подтверждение особождения осужденного
            </v-card-title>

            <div class="dialog-content">
                <input class="input" type="text" placeholder="Ф.И.О. осужденного" v-model="fullname">
                <input class="input" type="text" placeholder="Причина освобождения" v-model="reason">
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
                v-if="releaseSuccess"
                >Осужденный освобождён</v-alert>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="#0B465A"
                small
                dark
                @click="releasePrisoner"
                justify="center"
                width="200"
            >
                Освободить
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
            errors: [],
            releaseSuccess: false,
            dialog: false,
            prisonerFullname: this.prisoner,
            fullname: '',
            reason: ''
        }
    },
    methods: {
        releasePrisoner: function (){
            if(!this.fullname){
                return this.errors.push('Введите полное имя удаляемого осужденного')
            }
            if(this.fullname != this.prisonerFullname){
                return this.errors.push('Введённое значение не совпадает с полным именем освобождаемого осужденного')
            }

            if(!this.reason){
                return this.errors.push('Укажите причину освобождения осуждённого')
            }

            this.releaseSuccess = true
            this.errors = []

            return setTimeout(()=>{
                this.fullname = ''
                this.reason = ''
                this.dialog = false
                this.releaseSuccess = false
            }, 2000)
        }
    },
    watch:{
        fullname: function (){
            this.errors= []
        },
        reason: function (){
            this.errors= []
        }
    }
}
</script>

<style>
    
</style>