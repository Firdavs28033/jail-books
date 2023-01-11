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
      <v-spacer></v-spacer>

      <v-menu offset-y
       max-width="120"
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
            User
          </v-btn>
        </template>
        <v-list>
          <v-btn
          class="header__btn" 
          small color="#03212C" 
          dark
          >
            <span style="color:red">Выйти</span>
          </v-btn>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    }),
};
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
</style>