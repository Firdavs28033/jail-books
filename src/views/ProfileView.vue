<template>
    <div class="wrapper">
        <div class="container">
            <div class="profile__bio" v-if="showBio">
                <div class="profile__bio-media">
                    <v-img
                    contain
                    src="../assets/profile.webp"
                    transition="scale-transition"
                    width="200"
                    ></v-img>
                </div>

                <div class="profile__bio-content">
                    <table>
                        <tr>
                            <td><b>Ф.И.О.</b></td>
                            <td>{{ profile.fullname }}</td>
                        </tr>
                        <tr>
                            <td><b>Год рождения</b></td>
                            <td>{{ profile.born }}</td>
                        </tr>
                        <tr>
                            <td><b>Учреждение</b></td>
                            <td>{{ jailName }}</td>
                        </tr>
                        <tr>
                            <td><b>Количество прочитанных книг</b></td>
                            <td>0</td>
                        </tr>
                    </table>
                </div>
                <div class="profile__bio-criminal">
                    <b>Судимости</b>
                    <table>
                        <tr
                        v-for="item in profile.criminals"
                        :key="item.number"
                        >
                            <td><b>с</b> {{ item.term.since }}<br><b>до</b> {{ item.term.to }}</td>
                            <td><b>статья/и</b><br> {{ item.article }}</td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="prisoners-progress" v-if="showProgress">
                    <v-progress-circular
                    :width="3"
                    :size="80"
                    color="#0B465A"
                    indeterminate
                    ></v-progress-circular>
                </div>

            <profile-books-table v-if="showTable" :profile="profile.id"></profile-books-table>

        </div>
    </div>
</template>

<script>
import ProfileBooksTable from '@/components/ProfileBooksTable.vue'
import getProfile from '@/services/getProfile'

export default {
    data () {
      return {
        profile: {},
        searchID: '',
        jailName: '',
        showTable: false,
        showProgress: true,
        showBio: false
      }
    },
    methods: {
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
        this.searchID = urlParams.id
        this.jailName = urlParams.jail

        getProfile(this.searchID)
        .then((data)=>{
            this.profile = data
            this.showTable = true
            this.showProgress = false
            this.showBio = true
        })
    },
    components:{
        ProfileBooksTable
    }
}
</script>

<style>
    .profile__bio{
        display: grid;
        grid-template-columns: 220px 1fr 1fr;
    }
    
    .profile__bio-media{
    }
    .profile__bio-content{
        padding: 20px 15px;
        border-right: 1px solid rgb(179, 179, 179);
    }
    .profile__bio-criminal{
        padding: 20px 15px;
    }

    table{
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9em;
    }
    table>tr>td{
        padding: 10px 0;
    }
    table>tr:not(:last-child){
        border-bottom: 1px solid #777;
    }
    .profile__books{
        margin-top: 30px;
    }

    .profile__books-header{
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .table-number{
        width: 50px;
    }
    .v-application p{
        margin: 0;
    }

    .prisoners-progress{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>