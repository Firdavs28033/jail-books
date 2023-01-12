<template>
    <div class="profile__books">
        <div class="profile__books-header">
            <h2>Книги</h2>

            <add-book></add-book>
        </div>
        <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left table-number">
                    №
                </th>
                <th class="text-left">
                    Название книги
                </th>
                <th class="text-left">
                    Срок
                </th>
                <th class="text-left">
                    Статус
                </th>
                <th class="text-left">
                    Действие
                </th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="item in books"
                :key="item.number"
                >
                <td>{{ item.number }}</td>
                <td>{{ item.name }}</td>
                <td><b>с</b> {{ item.term.since }}<br><b>до</b> {{ item.term.to }}</td>
                <td>
                    <p v-if="item.isComplate" style="color: green">прочтено</p>
                    <p v-else style="color: #777">читает</p>
                </td>
                <td>
                    <v-menu offset-y max-width="120">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            color="#777"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            small
                            class="mr-2"
                            >
                            ···
                            </v-btn>
                        </template>
                        <v-list>
                            <edit-book :isRead="item.isComplate" :book="item.name"></edit-book>
                            <delete-book :book="item.name"></delete-book>
                        </v-list>
                    </v-menu>
                </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>

        <div class="books-progress" v-if="showProgress">
            <v-progress-circular
            :width="3"
            color="#0B465A"
            indeterminate
            ></v-progress-circular>
        </div>
    </div>
</template>

<script>
import AddBook from "./AddBook.vue"
import EditBook from "./EditBook.vue"
import DeleteBook from "./DeleteBook.vue"
import getBooks from '@/services/getBooks'

export default {
    props:{
        profile: String
    },
    data() {
        return {
            searchID: '',
            books: [],
            showProgress: true
        }
    },
    mounted() {

        setTimeout(()=>{
            this.searchID = this.profile
            getBooks(this.searchID)
            .then((data)=>{
                this.books = data,
                this.showProgress = false
            })
        }, 2000)
    },
    components:{
        AddBook,
        EditBook,
        DeleteBook
    }
}
</script>

<style>
.profile-errors-box{
    width: 100%;
}

.books-progress{
    width: 100%;
    display: flex;
    height: 80px;
    justify-content: center;
    align-items: center;
}
</style>