<template>
  <select id="themeselector" v-model="current" class="theme-selector" v-on:change="$emit('input',$event.target.value)">
    <option
      v-for="(_theme,index) in themes"
      :key="index"
      v-bind:value="_theme.name"
    >{{_theme.caption}}</option>
  </select>
</template>

<script>
import ace from "brace";
import "brace/ext/themelist";
export default {
  props: {
    value:String

  },
  data: function() {
    return {
      current:this.value,
      themes: []
    };
  },
  methods: {
  },
  computed: {},
  watch: {
   /* value: function(newTheme) {
      console.dir(newTheme);
      this.$emit("ace-theme", newTheme);
    }*/
  },
  mounted: function() {
    var v = ace.acequire("ace/ext/themelist");
    this.themes = v.themes;
  }
};
</script>

<style>
</style>