<template>
  <select id="langselector"  v-model="value" class="lang-selector" v-on:change="$emit('input',$event.target.value)">
    <option v-for="(_lang,index) in langs" :key="index" v-bind:value="_lang.name"  >{{_lang.caption}}</option>
  </select>
</template>

<script>

import ace from "brace";
import 'brace/ext/modelist'
export default {
    props:{
    },
    data:function(){
        return{
            value:String,
            langs:[]
        }
    },
    methods:{

    },
    computed:{
    },
    watch:{
        value:function(newLang){
            console.dir(newLang);
            this.$emit("ace-lang",newLang);
        }
    },
    mounted:function(){
        var v=ace.acequire('ace/ext/modelist');
        this.langs=v.modes;
    }
}
</script>

<style>

</style>