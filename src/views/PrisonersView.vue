<template>
    <div class="wrapper">
        <div class="container">
            <div class="prisoners__header">
                <div class="prisoners__titles">
                    <h2>| Осужденные</h2>
                    <h4>наименование учреждения</h4>
                </div>
                <v-btn
                dark
                color="#0B465A"
                small
                >
                + добавить осужденного
                </v-btn>
            </div>

            <div class="prisoners__table">
                <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Ф.И.О.
                        </th>
                        <th class="text-left">
                            Срок прибывания в учреждении
                        </th>
                        <th class="text-left">
                            Количество прочитанных книг
                        </th>
                        <th class="text-left">
                            Действие
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="item in prisoners"
                        :key="item.name"
                        >
                        <td>{{ item.fullname }}</td>
                        <td><b>с</b> {{ item.term.since }}<br><b>до</b> {{ item.term.to }}</td>
                        <td>{{ item.booksCount }}</td>
                        <td>
                            <v-btn
                            class="jails__action"
                            dark
                            color="#0B465A"
                            small
                            @click="goToProfile"
                            >
                                <v-icon
                                    size="22"
                                    color="white"
                                    >
                                    mdi-eye-arrow-right
                                    </v-icon>
                                </v-btn>
                        </td>
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
    methods:{
        goToProfile: function (){
            this.$router.push('/profile')
        }
    },
    data () {
      return {
        prisoners: [
          {
            fullname: 'Ержинков Анатолий Степанович',
            term: { since: '12.06.2010', to:'25.08.2025'},
            booksCount: 34
          },
        ],
      }
    },
}
</script>

<style>
.prisoners__header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.prisoners__titles{
    display: flex;
    flex-direction: column;
}
.prisoners__table{
        margin-top: 30px;
    }
</style>