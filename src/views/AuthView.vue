<template>
    <div class="wrapper">
        <div class="add-wrapper">
            <v-card
            class="card"
            >
                <h1 class="auth__title">Авторизация</h1>
                <div class="card-content">
                    <form>
                        <input class="input" type="text" placeholder="Логин" v-model="login">
                        <input class="input" type="password" placeholder="Пароль" v-model="password">
                        <v-btn
                        depressed
                        color="#0B465A"
                        class="btn"
                        dark
                        @click="authUser"
                        >
                        Войти
                        </v-btn>
                    </form>
                </div>
            </v-card>
        </div>

        <div class="auth-errors-box">
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
                v-if="authSuccess"
                >Вход успешно выполнен</v-alert>
        </div>
    </div>
</template>

<script>
import checkUser from '../services/auth'

export default {
    data() {
        return {
            login: '',
            password: '',
            errors:[],
            authSuccess: false
        }
    },
    methods:{
        goToJails: function (){
            this.$router.push('/jails')
        },
        authUser: function (){
            this.errors = []
            
            if(!this.login){
                return this.errors.push('Введите логин')
            }
            if(!this.password){
                return this.errors.push('Введите пароль')
            }

            checkUser(this.login, this.password)
            console.log(this.login);
            // this.authSuccess = true
            // this.errors = []

            // setTimeout(()=>{
            //     this.login= ''
            //     this.password = ''
            //     this.authSuccess = false
            //     this.$router.push('/jails')
            // },2000)
        }
    },
    watch:{
        login: function (){
            this.errors = []
        },
        password: function () {
            this.errors = []
        }
    },
    components:{

    }
}
</script>

<style>
    .add-wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .auth__title{
        border-bottom: 1px solid rgb(214, 214, 214);
        padding-bottom: 5px;
    }
    .card{
        width: 350px;
        height: 400px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    ::-webkit-scrollbar {
    width: 0;
    }
    .card-content{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
    }
    .btn{
        margin-top: 20px;
        width: 200px;
    }

    .wrpapper{
        position: relative;
    }
    
    .auth-errors-box{
    position: absolute;
    top: 0;
    width: 100%;
    }
</style>