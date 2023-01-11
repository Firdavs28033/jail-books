<template lang="">
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
                    <v-menu offset-y max-width="120">
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
                    v-if="item.action"
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
</template>

<script>
import EditJail from './EditJail.vue';
import DeleteJail from './DeleteJail.vue';

export default {
    props:{
        jailsList: Array
    },
    data() {
        return {
            jails: this.jailsList
        }
    },
    methods:{
        goToPrisoners: function (){
            this.$router.push('/prisoners')
        }
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
</style>