<template>
    <div class="wrapper">
        <div class="container">
            <div class="profile__bio">
                <div class="profile__bio-media">
                    <v-img
                    contain
                    src="../assets/profile.webp"
                    transition="scale-transition"
                    width="220"
                    ></v-img>
                </div>
                <div class="profile__bio-content">
                    <table>
                        <tr>
                            <td><b>Ф.И.О.</b></td>
                            <td>Юров Афанасий Юрьевич</td>
                        </tr>
                        <tr>
                            <td><b>Год рождения</b></td>
                            <td>19.08.1978</td>
                        </tr>
                        <tr>
                            <td><b>Количество прочитанных книг</b></td>
                            <td>56</td>
                        </tr>
                    </table>
                </div>
                <div class="profile__bio-criminal">
                    <b>Судимости</b>
                    <table>
                        <tr>
                            <td><b>с</b> 20.04.1980<br><b>до</b> 09.06.2025</td>
                            <td><b>статья</b><br>ч. 1 ст. 169</td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="profile__books">
                <div class="profile__books-header">
                    <h2>Книги</h2>
                    <v-btn
                    dark
                    color="#0B465A"
                    small
                    >
                    + добавить книгу
                    </v-btn>
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
                        :key="item.name"
                        >
                        <td>{{ item.number }}</td>
                        <td>{{ item.name }}</td>
                        <td><b>с</b> {{ item.term.since }}<br><b>до</b> {{ item.term.to }}</td>
                        <td>
                            <p v-if="item.isComplate" style="color: green">прочтено</p>
                            <p v-else style="color: #777">читает</p>
                        </td>
                        <td>action</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
      return {
        books: [
          {
            number:1,
            name: 'Л.Н. Толстой "Война и мир"',
            term: { since: '12.06.2022', to:''},
            isComplate: false
          },
        ],
      }
    },
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
</style>