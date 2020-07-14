<template>
  <select id="langselector"  v-model="current" class="lang-selector" v-on:change="$emit('input',$event.target.value)">
    <option v-for="(_lang,index) in langs" :key="index" v-bind:value="_lang.name"  >{{_lang.caption}}</option>
  </select>
</template>

<script>

import ace from "brace";
import 'brace/ext/modelist'
export default {
    props:{
        value:String
    },
    data:function(){
        return{
            current:this.value,
            langs:[]
        }
    },
    methods:{

    },
    computed:{
    },
    watch:{

    },
    mounted:function(){
        var v=ace.acequire('ace/ext/modelist');
        this.langs=v.modes;
    }
}
</script>

<style>

</style>