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
                <span style="color:#7D7D7D">Перевод</span>
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 add-jail-dialog"
            >
            Перевод осуждённого в другое учреждение
            </v-card-title>

            <div class="dialog-content">
                
                <p><b>{{ currentJail }}</b> → {{ jail }}</p>
                <v-select
                :items="jailsList"
                dense
                outlined
                placeholder="Выберите учреждение из списка"
                v-model="jail"
                ></v-select>

                <input class="input" type="text" placeholder="Опишите причину" v-model="reason">
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
                v-if="transferSuccess"
                >Осужденный переведён</v-alert>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="#0B465A"
                small
                @click="transferPrisoner"
                justify="center"
                width="200"
                :disabled="blockBtn"
                class="transfer-btn"
            >
                Перевести
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
import getJailsList from '@/services/getJailsList'
import transferPrisoner from '@/services/transferPrisoner'

export default {
    props:{
        prisoner: String,
        prisonerID: String
    },
    data() {
        return {
            dialog: false,
            errors: [],
            transferSuccess: false,
            jail: '',
            reason: '',
            prisonerJail: this.prisoner,
            jails:[],
            jailsList:[],
            currentJail: '',
            showProgress: false,
            blockBtn: false,
        }
    },
    methods: {
        transferPrisoner: async function (){
            if(!this.jail){
                return this.errors.push('Укажите учреждение, куда осуждённый подлежит переводу')
            }
            if(!this.reason){
                return this.errors.push('Укажите причину перевода')
            }
            this.showProgress = true
            this.blockBtn = true

            let toJail
            for(let i = 0; i !== this.jails.length; i++){
                if(this.jails[i].name==this.jail){
                    toJail = this.jails[i].id
                }
            }

            await transferPrisoner(this.prisonerID,toJail,this.reason)
            .then(()=>{
                this.transferSuccess = true
                this.errors = []
                this.showProgress = false

                setTimeout(()=>{
                    this.dialog = false
                    this.jail = ''
                    this.reason = ''
                    this.transferSuccess = false
                    this.blockBtn = false
                    setTimeout(()=>{
                        window.location.reload()
                    },400)
                },2000)
            })
        }
    },
    mounted() {
        getJailsList()
            .then((data)=>{
                this.jails = data
            })
            .then(()=>{
                for(let i = 0; i!=this.jails.length; i++){
                    if(this.jails[i].id==this.prisoner){
                        this.currentJail = this.jails[i].name
                    } else{
                        if(!this.jails[i].isDeleted){
                            this.jailsList.push(this.jails[i].name)
                        }
                    }
                }
            })
    },
    watch:{
        jail: function (){
            this.errors = []
        },
        reason: function (){
            this.errors = []
        }
    }
}
</script>

<style>
.dialog-content{
    padding: 30px;
}
.transfer-btn.theme--light.v-btn {
    color: rgb(255 255 255 / 87%);
}
</style>