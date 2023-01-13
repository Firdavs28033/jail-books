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
                        Количество книг
                    </th>
                    <th class="text-left">
                        Действие
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="item in prisoners"
                    :key="item.fullname"
                    v-if="!item.isDeleted && !item.isReleased"
                    >
                    <td>{{ item.fullname }}</td>
                    <td><b>с</b> {{ item.criminals[0].term.since }}<br><b>до</b> {{ item.criminals[0].term.to }}</td>
                    <td>!</td>
                    <td>
                        <v-menu offset-y max-width="120" v-if="user.permissions[0].level=='2' || user.permissions[0].level=='*'">
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
                                <delete-prisoner :prisoner="item.fullname" :prisonerID="item.id"></delete-prisoner>
                                <release-prisoner :prisoner="item.fullname" :prisonerID="item.id"></release-prisoner>
                                <transfer-prisoner :prisoner="item.jail" :prisonerID="item.id"></transfer-prisoner>
                            </v-list>
                        </v-menu>

                        <v-btn
                        class="jails__action"
                        dark
                        color="#0B465A"
                        small
                        @click="goToProfile(item.id)"
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

        <div class="prisoners-progress" v-if="showProgress">
            <v-progress-circular
            :width="3"
            color="#0B465A"
            indeterminate
            ></v-progress-circular>
        </div>

        <div class="prisoners-empty" v-if="prisoners.length<=0 && showEmpted || allDeleted">
            <p>Данных нет</p>
        </div>
    </div>
</template>

<script>
import EditPrisoner from './EditPrisoner.vue'
import DeletePrisoner from './DeletePrisoner.vue'
import ReleasePrisoner from './ReleasePrisoner.vue'
import TransferPrisoner from './TransferPrisoner.vue'
import getPrisonersList from '@/services/getPrisonersList'

export default {
    props:{
        jail: String,
        name: String
    },
    data() {
        return {
            prisoners: [],
            currentJail: '',
            showProgress: true,
            jailName: '',
            showEmpted: false,
            user: JSON.parse(localStorage.getItem('user')),
            allDeleted: false
        }
    },
    methods:{
        goToProfile: function (id){
            this.$router.push(`/profile?id=${id}&jail=${this.jailName}`)
        }
    },
    mounted() {
        setTimeout(()=>{
            this.currentJail = this.jail
            this.jailName = this.name
            getPrisonersList(this.currentJail)
            .then((data)=>{
                this.prisoners = data
                this.showProgress = false
                this.showEmpted = true
            })
            .then(()=>{
                let deleted = 0
                for(let i = 0; i != this.prisoners.length; i++){
                    if(!this.prisoners[i].isDeleted && !this.prisoners[i].isReleased){
                        deleted++
                    }
                }
                if(deleted==0){
                    this.allDeleted=true
                }
            })
        },500)
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
.prisoners-progress{
    width: 100%;
    display: flex;
    height: 150px;
    justify-content: center;
    align-items: center;
}

.prisoners-empty{
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