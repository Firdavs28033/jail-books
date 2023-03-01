<template>
  <v-app>
    <v-app-bar
      app
      color="#0B465A"
      dark
      class="app-header"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Jail Books Logo"
          class="shrink mr-5"
          contain
          src="./assets/m-logo.svg"
          transition="scale-transition"
          width="55"
        />

        <h4 class="header__title">Система учёта прочитанных книг осужденными, отбывающих наказание в учреждениях по исполнению наказания</h4>
      </div>

      <v-spacer></v-spacer>
      <div class="div" v-if="!$route.meta.hideHeader && connection">
        <v-icon
            dark
            left
            @click="$router.go(-1)"
          >
            mdi-arrow-left
          </v-icon>
        <v-icon
            dark
            right
            @click="$router.go(+1)"
          >
            mdi-arrow-right
          </v-icon>
      </div>
      <v-spacer></v-spacer>

      <v-menu offset-y
       max-width="120"
       v-if="!$route.meta.hideHeader && connection"
       >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#03212C"
            dark
            v-bind="attrs"
            v-on="on"
            min-width="120"
            small
          >
            <v-img
              class="shrink mr-3"
              contain
              src="./assets/user.png"
              transition="scale-transition"
              width="15"
            />
            {{ !$route.meta.hideHeader ? user.name : ''}}
          </v-btn>
        </template>
        <v-list>
          <v-btn
          class="header__btn" 
          small color="#03212C" 
          dark
          @click="leave"
          >
            <span style="color:red">Выйти</span>
          </v-btn>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="main">
        <router-view v-if="connection"/>

      <div class="connection-down" v-if="!connection">
        <v-img
        contain
        max-height="150"
        max-width="250"
        src="./assets/network.png"
      ></v-img>
      <h2 class="mt-3">Нет соединения с Интернетом</h2>
      </div>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    user: {},
    connection: true
  }),
  methods: {
    leave: function (){
      localStorage.removeItem('user')
      window.location.reload()
    }
  },
  watch: {
      $route(to, from) {
        let user = localStorage.getItem('user')
        let currentRout = this.$router.currentRoute.name

        if(user){
          this.user = JSON.parse(user)
        }
        if(!user){
          this.$router.push('/').catch(()=>{})
        }
        if(user && currentRout=='auth'){
          this.$router.push('/jails').catch(()=>{})
        }
      }
  },
  mounted() {
      let connectionCheck = setInterval(()=>{
        fetch('http://google.com',{
          method: 'GET',
          mode: 'no-cors',
        })
        .then((data)=>{
          if(!this.connection){
            this.connection = true
            this.user = JSON.parse(localStorage.getItem('user'))
          }
          return
        })
        .catch((e)=>{
          this.connection = false
          return
        })
      }, 5000)

  }
}
</script>

<style>
.app-header{
  -webkit-app-region: drag;
}
.wrapper{
  width: 100%;
  height: 100%;
  background-color: #CFD4D4;
}
.container{
  width: 100%;
  height: 100%;
  padding: 50px;
}
.header__title{
  width: 600px;
}
.v-list{
  padding: 0;
}
.header__btn{
  width: 100%;
}
.v-menu__content{
  width: 200px;
}
.v-card__actions {
    flex-direction: column;
}

.input{
  width: 	100%;
  height: 35px;
  text-indent: 10px;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 5px;
}
.input:not(:last-child){
  margin-bottom: 25px;
}
.input:focus{
  outline: none;
    box-shadow: 0px 0px 5px 5px #0b465a42;
}

.main{
  position: relative;
}

.connection-down{
  position: absolute;
  top:0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>