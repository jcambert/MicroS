<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <langSelector v-model="lang"></langSelector>
    <themeSelector v-model="theme"></themeSelector>
    <tpl id="template" :theme="theme" lang="json" v-model="content"></tpl>
    <tpl id="render" :theme="theme" lang="json" v-model="render"></tpl>
    <pre>{{lang}} - {{theme}}</pre>
    <p>&nbsp;</p>
  </div>
</template>

<script>
import tpl from "./components/Template"
import langSelector from "./components/LangSelector"
import themeSelector from "./components/ThemeSelector"
import datas from './assets/datas/index' 
export default {
  name: "App",
  components: {
    tpl,
    langSelector,
    themeSelector
  },
  data: function() {
    return {
      lang: "",
      theme: "",
      content:"",
      render:""
    };
  },
  watch:{
    content:function(newContent){
      console.log("Template has changed to ",newContent,typeof newContent);
     // console.log(JSON.parse(newContent));
      this.render=JSON.stringify( window.wemock.render(JSON.parse(newContent))) ;
    }
  },
  mounted(){
    console.log(datas)
    window.wemock.datas=datas;
    
  }
};
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
