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
            + добавить книгу
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 add-jail-dialog"
            >
            Добавить книгу
            </v-card-title>

            <div class="dialog-content">
                <input class="input" type="text" placeholder="Название книги с указание автора" v-model="book">
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
                v-if="addSuccess"
                >Новая книга добавлена</v-alert>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="#0B465A"
                small
                dark
                @click="addBook"
                justify="center"
                width="200"
            >
                Добавить
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            errors: [],
            addSuccess: false,
            book: ''
        }
    },
    methods: {
        addBook: function (){
            if(!this.book){
                return this.errors.push('Укажите название и автора добавляемой книги')
            }
            if(this.book.length<=12){
                return this.errors.push('Вводимое значение должно быть больше 12 символов')
            }

            this.errors = []
            this.addSuccess = true

            setTimeout(()=>{
                this.dialog = false
                this.addSuccess = false
                this.book = ''
            }, 2000)
        }
    },
    watch:{
        book: function (){
            this.errors = []
        }
    }
}
</script>

<style>
    
</style>