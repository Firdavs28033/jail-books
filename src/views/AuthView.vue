<template>
    <div class="wrapper">
        <div class="add-wrapper">
            <v-card
            class="card"
            >
                <h1 class="auth__title">Авторизация</h1>
                <div class="card-content">
                    <form>
                        <input class = "input" type="text" placeholder="Логин" required>
                        <input class = "input" type="password" placeholder="Пароль" required>
                        <v-btn
                        depressed
                        color="#0B465A"
                        class="btn"
                        dark
                        @click="goToJails"
                        >
                        Войти
                        </v-btn>
                    </form>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        goToJails: function (){
            this.$router.push('/jails')
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
    .input{
        width: 	100%;
        height: 35px;
        text-indent: 10px;
        border: 1px solid rgb(214, 214, 214);
        border-radius: 5px;
    }
    .input:not(:last-child){
        margin-bottom: 25px;
    }
    .input:focus{
        border: none;
    }
    .btn{
        margin-top: 20px;
        width: 200px;
    }
</style>