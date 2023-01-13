<template>
    <div class="wrapper">
        <div class="container">
            <div class="prisoners__header">
                <div class="prisoners__titles">
                    <h2>| Осужденные</h2>
                    <h4>{{ jailName }}</h4>
                </div>
                
                <add-prisoner v-if="user.permissions[0].level=='2' || user.permissions[0].level=='*'" :jail="currentJail"></add-prisoner>
            </div>

            <prisoners-table :jail="currentJail" :name="jailName"></prisoners-table>
        </div>
    </div>
</template>

<script>
import PrisonersTable from '@/components/PrisonersTable.vue';
import AddPrisoner from '@/components/AddPrisoner.vue';

export default {
    data () {
      return {
        currentJail: '',
        jailName: '',
        user: JSON.parse(localStorage.getItem('user')),
      }
    },
    mounted() {
        let urlParams = window
        .location
        .search
        .replace('?','')
        .split('&')
        .reduce(
            function(p,e){
                var a = e.split('=');
                p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                return p;
            },
            {}
        )
        this.currentJail = urlParams.id
        this.jailName = urlParams.name
    },
    components:{
        PrisonersTable,
        AddPrisoner
    }
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