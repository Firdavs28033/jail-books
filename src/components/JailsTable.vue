<template lang="">
    <div class="jail__table">
        <v-simple-table class="jail__table">
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
                <td>!</td>
                <td>
                    <v-menu offset-y max-width="120" v-if="user.permissions[0].level=='*'">
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
                            <edit-jail :jail="item.name"></edit-jail>
                            <delete-jail :jail="item.name"></delete-jail>
                        </v-list>
                    </v-menu>
                   <v-btn
                    class="jails__action"
                    dark
                    color="#0B465A"
                    small
                    v-if="user.permissions[0].jail == item.id || user.permissions[0].level == '*'"
                    @click="goToPrisoners(item.id, item.name)"
                    >
                    перейти →
                    </v-btn>
                    <p v-else style="color: #777">—</p>
                </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>

        <div class="jails-progress" v-if="showProgress">
            <v-progress-circular
            :width="3"
            color="#0B465A"
            indeterminate
            ></v-progress-circular>
        </div>

        <div class="jails-empty" v-if="jails.length<=0 && showEmpted">
            <p>Данных нет</p>
        </div>
    </div>
</template>

<script>
import EditJail from './EditJail.vue'
import DeleteJail from './DeleteJail.vue'
import getJailsList from '@/services/getJailsList'

export default {
    data() {
        return {
            jails: [],
            user: JSON.parse(localStorage.getItem('user')),
            showProgress: true,
            showEmpted: false
        }
    },
    methods:{
        goToPrisoners: function (id, name){
            this.$router.push(`/prisoners?id=${id}&name=${name}`)
        }
    },
    mounted() {
        getJailsList()
        .then((data)=>{
            this.jails = data
            this.showProgress = false
            this.showEmpted = true
        })
    },
    components:{
        EditJail,
        DeleteJail
    }
}
</script>

<style>
.jails-errors-box{
    width: 100%;
}
.jails-progress{
    width: 100%;
    display: flex;
    height: 150px;
    justify-content: center;
    align-items: center;
}

.jails-empty{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(145, 145, 145, 0.144);
    color: rgb(88, 88, 88);
    font-size: 0.85em;
}
</style>