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
                :key="item.id"
                v-if="!item.isDeleted && getCount == jails.length"
                >
                <td>{{ item.name }}</td>
                <td>{{ item.prisonersCount }}</td>
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
                            <edit-jail :jail="item.name" :jailID="item.id"></edit-jail>
                            <delete-jail :jail="item.name" :jailID="item.id"></delete-jail>
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

        <div class="jails-progress mt-8" v-if="showProgress">
            <v-progress-circular
            :width="3"
            color="#0B465A"
            indeterminate
            ></v-progress-circular>
        </div>

        <div class="jails-empty" v-if="jails.length<=0 && showEmpted || allDeleted && showEmpted">
            <p>Данных нет</p>
        </div>
    </div>
</template>

<script>
import EditJail from './EditJail.vue'
import DeleteJail from './DeleteJail.vue'
import getJailsList from '@/services/getJailsList'
import getPrisonersList from '@/services/getPrisonersList'

export default {
    data() {
        return {
            jails: [],
            user: JSON.parse(localStorage.getItem('user')),
            showProgress: true,
            showEmpted: false,
            addStatus: false,
            allDeleted: false,
            getCount: 0,
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
                if(data){
                    this.jails = data
                } else{
                    this.showEmpted = true
                    this.allDeleted = true
                    this.showProgress = false
                    return
                }
                
            })
            .then(()=>{
                for(let i = 0; i != this.jails.length; i++){
                    getPrisonersList(this.jails[i].id)
                    .then((data)=>{
                        this.jails[i].prisonersCount = 0
                        if(data){
                            for(let g = 0; g != data.length; g++){
                                if(!data[g].isDeleted && !data[g].isReleased){
                                    this.jails[i].prisonersCount++
                                }
                            }
                        }
                        this.getCount++
                    })
                }
             })
            .then(()=>{
                let deleted = 0
                for(let i = 0; i != this.jails.length; i++){
                    if(!this.jails[i].isDeleted){
                        deleted++
                    }
                }
                if(deleted==0){
                    this.allDeleted=true
                }
            })
    },
    watch:{
        getCount: function (){
            if(this.getCount == this.jails.length){
                this.showProgress = false
                this.showEmpted = true
            }
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
.jails-progress{
    width: 100%;
    display: flex;
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