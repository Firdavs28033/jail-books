<template>
    <div class="wrapper">
        <div class="container">
            <div class="jails__header">
                <h2>| Учреждения</h2>
                <v-btn
                dark
                color="#0B465A"
                small
                >
                + добавить учреждение
                </v-btn>
            </div>

            <div class="jail__table">
                <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Наименование учреждения
                        </th>
                        <th class="text-left">
                            Количество осуждёных
                        </th>
                        <th class="text-left">
                            Действие
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="item in jails"
                        :key="item.name"
                        >
                        <td>{{ item.name }}</td>
                        <td>{{ item.amount }}</td>
                        <td>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                    color="#777"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    small
                                    class="mr-2"
                                    v-if="item.perm"
                                    >
                                    •••
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-btn class="header__btn" small><span style="color:#0B465A">Изменить</span></v-btn>
                                    <v-btn class="header__btn" small><span style="color:red">Удалить</span></v-btn>
                                </v-list>
                            </v-menu>

                            <v-btn
                            class="jails__action"
                            v-if="item.action"
                            dark
                            color="#0B465A"
                            small
                            @click="goToPrisoners"
                            >
                            перейти →
                            </v-btn>
                            <p v-else style="color: #777">—</p>
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
        goToPrisoners: function (){
            this.$router.push('/prisoners')
        }
    },
    data () {
      return {
        jails: [
          {
            name: 'Зангиатинская колония общего режима',
            amount: 159,
            action: true,
            perm:true
          },
          {
            name: 'Джиззакская колония общего режима',
            amount: 159,
            action: false,
            perm:false
          },
        ],
      }
    },
}
</script>

<style>
    .jails__header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .jail__table{
        margin-top: 30px;
    }
    .jails__action{
    }
    .v-application p{
        margin: 0;
    }
</style>