<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <langSelector v-model="lang"></langSelector>
    <themeSelector v-model="theme"></themeSelector>
    <tpl :theme="theme" :lang="lang"></tpl>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import tpl from './components/Template'
import langSelector from './components/LangSelector'
import themeSelector from './components/ThemeSelector'
export default {
  name: 'App',
  components: {
    //HelloWorld,
    tpl,
    langSelector,
    themeSelector
  },
  data:function(){
    return{
      lang:String,
      theme:String
    }
  },
  mounted:function () {
    this.theme="";
    this.lang="csharp"
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
