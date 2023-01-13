<template>
    <div class="wrapper">
        <div class="container">
            <div class="jails__header">
                <h2>| Учреждения</h2>

                <add-jail v-if="user.permissions[0].level=='*'"></add-jail>
            </div>

            <jails-table></jails-table>

        </div>
    </div>
</template>

<script>
import JailsTable from '@/components/JailsTable.vue'
import AddJail from '@/components/AddJail.vue'

export default {
    data () {
      return {
        user: JSON.parse(localStorage.getItem('user')),
      }
    },
    components:{
        JailsTable,
        AddJail
    }
}
</script>

<style>
    .jails__header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .jail__table{
        margin-top: 30px;
    }
    .jails__action{
    }
    .v-application p{
        margin: 0;
    }
    .add-jail-dialog{
        background-color: #0B465A;
        color: #fff
    }

    .dialog-content{
        padding: 30px;
    }
</style>