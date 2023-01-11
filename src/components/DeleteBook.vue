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
                <input class="input" type="text" placeholder="Название книги с автором" v-model="name">
                <p>Напишите название книги с автором: <b>{{ bookName }}</b></p>
            </div>

            <v-divider></v-divider>

            <v-card-actions>

            <div class="profile-errors-box">
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
                >Книга удалена</v-alert>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="red"
                small
                dark
                @click="deleteBook"
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
        book: String
    },
    data() {
        return {
            dialog: false,
            errors: [],
            deleteSuccess: false,
            bookName: this.book,
            name: ''
        }
    },
    methods: {
        deleteBook: function(){
            if(!this.name){
                return this.errors.push('Введите название и автора удаляемой книги')
            }

            if(this.name!=this.bookName){
                return this.errors.push('Введённое значение не совпадает с названием и автором удаляемой книги')
            }

            this.deleteSuccess =true
            this.errors = []

            return setTimeout(()=>{
                this.deleteSuccess = false
                this.dialog = false
                this.name = ''
            },2000)
        }
    },
    watch:{
        name: function (){
            this.errors = []
        }
    }
}
</script>

<style>
    
</style>