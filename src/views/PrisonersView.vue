<template>
    <div class="wrapper">
        <div class="container">
            <div class="prisoners__header">
                <div class="prisoners__titles">
                    <h2>| Осужденные</h2>
                    <h4>наименование учреждения</h4>
                </div>
                
                <add-prisoner></add-prisoner>
            </div>

            <prisoners-table :prisonersList="prisoners"></prisoners-table>
        </div>
    </div>
</template>

<script>
import PrisonersTable from '@/components/PrisonersTable.vue';
import AddPrisoner from '@/components/AddPrisoner.vue';

export default {
    data () {
      return {
        prisoners: [
          {
            fullname: 'Ержинков Анатолий Степанович',
            born: '03.09.1976',
            criminal: 'ч.2 ст. 97 УП РУз.',
            term: { since: '12.06.2010', to:'25.08.2025'},
            jail: 'Зангиатинская колония общего режима',
            booksCount: 34
          },
        ],
      }
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