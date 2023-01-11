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
                <span style="color:#0B465A">Изменить</span>
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 add-jail-dialog"
            >
            Изменить книгу
            </v-card-title>

            <div class="dialog-content">
                <p><b>{{ oldName }} → {{ name }}</b></p>
                <input class="input" type="text" placeholder="Новое название книги с указание автора" value='Л.Н. Толстой "Война и мир"' v-model="name">

                <div class="book-check-box">
                    <label for="check-book">Установить статус книги как прочтённую?</label>
                    <input type="checkbox" id="check-book" class="ml-2" v-model="isComplate">
                </div>
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
                v-if="editSuccess"
                >Изменения сохранены</v-alert>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="#0B465A"
                small
                dark
                @click="editBook"
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
        isRead: Boolean,
        book: String
    },
    data() {
        return {
            dialog: false,
            errors: [],
            editSuccess: false,
            oldName: this.book,
            name: '',
            isComplate: this.isRead
        }
    },
    methods: {
        editBook: function (){
            if(!this.name){
                return this.errors.push('Заполните поля нового названия книги, укажите автора')
            }
            if(this.name.length<=12){
                return this.errors.push('Вводимое значение должно быть больше 12 символов')
            }
            if(this.name==this.oldName){
                return this.errors.push('Указанная книга совпадает со старой')
            }

            this.editSuccess =true
            this.errors = []

            return setTimeout(()=>{
                this.dialog = false
                this.editSuccess = false
                this.name = ''
            }, 2000)
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
    .dialog-content{
        padding: 30px;
    }
    .book-check-box{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .book-check-box>input{
        width: 20px;
        height: 20px;
    }
</style>