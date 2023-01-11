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
                
                <p><b>{{ prisonerJail }}</b> → {{ jail }}</p>
                <v-select
                :items="jails"
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
                dark
                @click="transferPrisoner"
                justify="center"
                width="200"
            >
                Перевести
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
            errors: [],
            transferSuccess: false,
            jail: '',
            reason: '',
            prisonerJail: this.prisoner,
            // подгрузить с бд
            jails:[
                'Foo', 'Bar', 'Fizz', 'Buzz'
            ]
        }
    },
    methods: {
        transferPrisoner: function (){
            if(!this.jail){
                return this.errors.push('Укажите учреждение, куда осуждённый подлежит переводу')
            }

            if(!this.reason){
                return this.errors.push('Укажите причину перевода')
            }

            this.transferSuccess = true
            this.errors = []

            setTimeout(()=>{
                this.dialog = false
                this.jail = ''
                this.reason = ''
                this.transferSuccess = false
            },2000)
        }
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
</style>