<template>
    <v-dialog
        v-model="dialog"
        width="700"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            small
            v-bind="attrs"
            v-on="on"
            class="header__btn"
            >
            <span style="color:#0B465A">Изменить</span>
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 add-jail-dialog"
            >
            Изменить профиль осужденного
            </v-card-title>

            <div class="dialog-content">
                <label for="edit-prisoner-fullname"><b>{{ prisonerFullname }}</b> → {{ fullname }}</label>
                <input id="edit-prisoner-fullname" class="input" type="text" placeholder="Ф.И.О." v-model="fullname">
                <label for="edit-prisoner-date">Дата рождения: <b>{{ prisonerBorn }}</b> → {{ born }}</label>
                <input id='edit-prisoner-date' class="input" type="date" v-model="born">
                
                <label for="add-prisoner-crime">Последняя cудимсоть: <b>{{ prisonerCriminal }}</b> → {{ criminal }}</label>
                <input id='add-prisoner-crime' class="input" type="text" v-model="criminal">

                <div class="crime-info">
                    <div class="crime-info-flex2">
                        <label for="add-prisoner-since" class="mr-2">с <b>{{ prisonerTerm.since }}</b> → {{ termSince }}</label>
                        <input class="input" id="add-prisoner-since" type="date" v-model="termSince">
                    </div>

                    <div class="crime-info-flex2">
                        <label for="add-prisoner-to" class="mr-2">до <b>{{ prisonerTerm.to }}</b> → {{ termTo }}</label>
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
                v-if="editSuccess"
                >Изменения сохранены</v-alert>

                
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="#0B465A"
                small
                dark
                @click="editPrisoner"
                justify="center"
                width="200"
            >
                Изменить
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props:{
        prisoner: Object
    },
    data() {
        return {
            errors: [],
            editSuccess: false,
            dialog: false,
            prisonerFullname: this.prisoner.fullname,
            prisonerBorn: this.prisoner.born,
            prisonerCriminal: this.prisoner.criminal,
            prisonerTerm: this.prisoner.term,

            fullname: '',
            born: '',
            criminal: '',
            termSince: '',
            termTo: ''
        }
    },
    methods:{
        editPrisoner: function (){
            if(!this.fullname && !this.born && !this.criminal && !this.termSince && !this.termTo){
                return this.errors.push('Не были внесены изменения')
            }

            if(this.prisonerFullname == this.fullname){
                return this.errors.push('Новое полное имя совпадает со старым')
            }

            if(this.prisonerBorn == this.born){
                return this.errors.push('Новая дата рождения совпадает со старой')
            }

            if(this.prisonerCriminal == this.criminal){
                return this.errors.push('Новая судимость совпадает со старой')
            }

            if(this.prisonerTermSince == this.termSince){
                return this.errors.push('Новый срок начала исполнения наказания совпадает со старым')
            }

            if(this.prisonerTermTo == this.termTo){
                return this.errors.push('Новый срок окончания исполнения наказания совпадает со старым')
            }
            
            this.editSuccess = true
            this.errors = []
            return setTimeout(()=>{
                this.dialog = false
                this.fullname = ''
                this.born = ''
                this.criminal = ''
                this.termSince = ''
                this.termTo = ''
                this.editSuccess = false
            },2000)
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
.crime-info-flex2{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
</style>