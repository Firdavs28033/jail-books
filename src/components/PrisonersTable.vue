<template>
    
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
                                <edit-prisoner :prisoner="item"></edit-prisoner>
                                <delete-prisoner :prisoner="item.fullname"></delete-prisoner>
                                <release-prisoner :prisoner="item.fullname"></release-prisoner>
                                <transfer-prisoner :prisoner="item.jail"></transfer-prisoner>
                            </v-list>
                        </v-menu>

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
</template>

<script>
import EditPrisoner from './EditPrisoner.vue'
import DeletePrisoner from './DeletePrisoner.vue'
import ReleasePrisoner from './ReleasePrisoner.vue'
import TransferPrisoner from './TransferPrisoner.vue';

export default {
    props:{
        prisonersList: Array
    },
    data() {
        return {
            prisoners: this.prisonersList
        }
    },
    methods:{
        goToProfile: function (){
            this.$router.push('/profile')
        }
    },
    components:{
        EditPrisoner,
        DeletePrisoner,
        ReleasePrisoner,
        TransferPrisoner
    }
}
</script>

<style>
.prisoners-errors-box{
    width: 100%;
} 
</style>