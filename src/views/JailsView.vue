<template>
    <div class="wrapper">
        <div class="container">
            <div class="jails__header">
                <h2>| Учреждения</h2>

                <add-jail></add-jail>
            </div>

            <jails-table :jailsList="jails"></jails-table>

        </div>
    </div>
</template>

<script>
import JailsTable from '@/components/JailsTable.vue';
import AddJail from '@/components/AddJail.vue';

export default {
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
        ]
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