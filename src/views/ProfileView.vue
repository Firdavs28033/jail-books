<template>
    <div class="wrapper">
        <div class="container">
            <div class="profile__bio">
                <div class="profile__bio-media">
                    <v-img
                    contain
                    src="../assets/profile.webp"
                    transition="scale-transition"
                    width="200"
                    ></v-img>
                </div>
                <div class="profile__bio-content">
                    <table>
                        <tr>
                            <td><b>Ф.И.О.</b></td>
                            <td>{{ profile.fullname }}</td>
                        </tr>
                        <tr>
                            <td><b>Год рождения</b></td>
                            <td>{{ profile.born }}</td>
                        </tr>
                        <tr>
                            <td><b>Учреждение</b></td>
                            <td>{{ profile.jail.name }}</td>
                        </tr>
                        <tr>
                            <td><b>Количество прочитанных книг</b></td>
                            <td>{{ readBooksCount }}</td>
                        </tr>
                    </table>
                </div>
                <div class="profile__bio-criminal">
                    <b>Судимости</b>
                    <table>
                        <tr
                        v-for="item in profile.criminals"
                        :key="item.number"
                        >
                            <td><b>с</b> {{ item.term.since }}<br><b>до</b> {{ item.term.to }}</td>
                            <td><b>статья/и</b><br> {{ item.article }}</td>
                        </tr>
                    </table>
                </div>
            </div>

            <profile-books-table :booksList="profile.books"></profile-books-table>

        </div>
    </div>
</template>

<script>
import ProfileBooksTable from '@/components/ProfileBooksTable.vue';

export default {
    data () {
      return {
        profile: {
            id: 'id-1',
            fullname: 'Юров Афанасий Юрьевич',
            born: '19.08.1978',
            criminals: [
                {
                    id: 'crime-1',
                    term: { since: '20.04.1989', to: '09.06.2005' },
                    article: 'ч. 1 ст. 169'
                },
                {
                    id: 'crime-2',
                    term: { since: '20.04.2007', to: '09.06.2025' },
                    article: 'ч. 3 ст. 168'
                },
            ],
            jail: {
                id: 'jail-1',
                name: 'Зангиатинская колония общего режима'
            },
            books: [
            {
                number:1,
                name: 'Л.Н. Толстой "Война и мир"',
                term: { since: '12.06.2022', to: ''},
                isComplate: true
            },
            {
                number:2,
                name: 'Л.Н. Толстой "Война и мир"',
                term: { since: '12.06.2022', to: ''},
                isComplate: true
            },
            ]
        },
        readBooksCount: null
      }
    },
    methods: {
    },
    mounted() {
        let books = this.profile.books
        for(let i = 0; i!=books.length; i++){
            if(books[i].isComplate==true){
                this.readBooksCount+=1
            }
        }
    },
    components:{
        ProfileBooksTable
    }
}
</script>

<style>
    .profile__bio{
        display: grid;
        grid-template-columns: 220px 1fr 1fr;
    }
    
    .profile__bio-media{
    }
    .profile__bio-content{
        padding: 20px 15px;
        border-right: 1px solid rgb(179, 179, 179);
    }
    .profile__bio-criminal{
        padding: 20px 15px;
    }

    table{
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9em;
    }
    table>tr>td{
        padding: 10px 0;
    }
    table>tr:not(:last-child){
        border-bottom: 1px solid #777;
    }
    .profile__books{
        margin-top: 30px;
    }

    .profile__books-header{
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .table-number{
        width: 50px;
    }
    .v-application p{
        margin: 0;
    }
</style>