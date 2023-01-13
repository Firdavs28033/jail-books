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
            + добавить осужденного
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 add-jail-dialog"
            >
            Добавить осужденного
            </v-card-title>

            <div class="dialog-content">
                <input class="input" type="text" placeholder="Ф.И.О." v-model="fullname">
                <label for="add-prisoner-date">Дата рождения</label>
                <input id='add-prisoner-date' class="input" type="date" v-model="born">
                
                <label for="add-prisoner-crime">Судимсоть по статье/ям</label>
                <input id='add-prisoner-crime' class="input" type="text" v-model="criminal">

                <p>Наказание в виде лишение свободы применено:</p>
                <div class="crime-info">
                    <div class="crime-info-flex">
                        <label for="add-prisoner-since" class="mr-2">с</label>
                        <input class="input" id="add-prisoner-since" type="date" v-model="termSince">
                    </div>

                    <div class="crime-info-flex">
                        <label for="add-prisoner-to" class="mr-2">до</label>
                        <input class="input" id="add-prisoner-to" type="date" v-model="termTo">
                    </div>
                </div>
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
                v-if="addSuccess"
                >Новый осужденный добавлен</v-alert>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="#0B465A"
                small
                @click="addPrisoner"
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
import addPrisoner from "@/services/addPrisoner"
import normalizeDate from '@/plugins/normalizeDate'

export default {
    props:{
        jail: String
    },
    data() {
        return {
            dialog: false,
            errors:[],
            addSuccess: false,
            fullname: '',
            born: '',
            criminal: '',
            termSince: '',
            termTo: '',
            showProgress: false,
            blockBtn: false

        }
    },
    methods: {
        addPrisoner: function (){
            if(!this.fullname){
                return this.errors.push('Введите полное имя осужденного')
            }
            if(this.fullname.length<=3){
                return this.errors.push('Введённое имя должно быть больше 3 символов')
            }

            if(!this.born){
                return this.errors.push('Укажите дату рождения осужденного')
            }

            if(!this.criminal){
                return this.errors.push('Введите статью УК РУз., которой лицо было осуждено по приговору суда')
            }
            
            if(!this.termSince){
                return this.errors.push('Укажите срок начала отбывания наказания')
            }
            if(!this.termTo){
                return this.errors.push('Укажите срок окончания отбывания наказания')
            }
            this.showProgress = true
            this.blockBtn = true

            // сохранение
            let toSaveData = {
                fullname: this.fullname,
                born: normalizeDate(this.born),
                criminals: [],
            }
            toSaveData.criminals.push({ article: this.criminal, term: { since: normalizeDate(this.termSince), to: normalizeDate(this.termTo) } })
            toSaveData.jail = this.jail

            addPrisoner(toSaveData)
            .then(()=>{
                this.addSuccess = true
                this.errors = []
                this.showProgress = false

                return setTimeout(()=>{
                    this.dialog = false
                    this.fullname = ''
                    this.born = ''
                    this.criminal = ''
                    this.termSince = ''
                    this.termTo = ''
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
        fullname: function (){
            this.errors = []
        },
        born: function (){
            this.errors = []
        },
        criminal: function (){
            this.errors = []
        },
        termSince: function (){
            this.errors = []
        },
        termTo: function (){
            this.errors = []
        }
    }
}
</script>

<style>
    .dialog-content{
        padding: 30px;
    }

    .crime-info{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .crime-info-flex{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .add-btn.theme--light.v-btn {
        color: rgb(255 255 255 / 87%);
    }
</style>