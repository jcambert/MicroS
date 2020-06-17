/* eslint-disable no-unused-vars */
<template>
  <div id="container">
    <h1>MY EDITOR</h1>
    <div id="editor"></div>
  </div>
</template>

<script>
import ace from "brace";
export default {
  components: {},
  props: {
    value: String,
    //lang: String,
    //theme: String,
    height: Number,
    width: Number,
    options: Object
  },
  data: function() {
    return {
      editor: null,
      contentBackup: "",
      lang:"",
      theme:""
    };
  },
  watch: {
    value: function(val) {
      if (this.contentBackup !== val) {
        this.editor.session.setValue(val, 1);
        this.contentBackup = val;
      }
    },
    theme: function(newTheme) {
      this.setTheme(newTheme);
    },
    lang: function(newLang) {
        
      this.setLang(newLang);
    },
    options: function(newOption) {
      this.editor.setOptions(newOption);
    },
    height: function() {
      this.$nextTick(function() {
        this.editor.resize();
      });
    },
    width: function() {
      this.$nextTick(function() {
        this.editor.resize();
      });
    }
  },
  methods: {
    px: function(n) {
      if (/^\d*$/.test(n)) {
        return n + "px";
      }
      return n;
    },
    setTheme: function(theme) {
      require(`brace/theme/${theme}`);
      this.editor.setTheme(`ace/theme/${theme}`);
    },
    setLang: function(lang) {
        console.log("Set Lang",lang)
        lang=lang ||"json";
      this.editor
        .getSession()
        .setMode(typeof lang === "string" ? `brace/mode/${lang}` : lang);
    }
  },
  mounted: function() {
    var self = this;
    var lang = this.lang || "json";
    var theme = this.theme || "cobalt";
    require("brace/ext/emmet");
    //require(`brace/theme/${theme}`);
    var editor = (self.editor = ace.edit("editor"));
    editor.$blockScrolling = Infinity;
    self.$emit("init", editor);
    //editor
    //  .getSession()
    //  .setMode(typeof lang === "string" ? `brace/mode/${lang}` : lang);
    //editor.setTheme(`ace/theme/${theme}` + theme);
    self.setLang(lang);
    self.setTheme(theme);
    if (this.value) editor.setValue(this.value, 1);
    this.contentBackup = this.value;

    editor.on("change", function() {
      var content = editor.getValue();
      self.$emit("input", content);
      self.contentBackup = content;
    });
    if (self.options) editor.setOptions(self.options);
  },
  beforeDestroy: function() {
    this.editor.destroy();
    this.editor.container.remove();
  },
  render: function(h) {
    var height = this.height ? this.px(this.height) : "100%";
    var width = this.width ? this.px(this.width) : "100%";
    console.log("rendering ace Editor");
    return h("div", {
      attrs: {
        style: "height: " + height + "; width: " + width
      }
    });
  }
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#container {
  height: 100%;
  width: auto;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  background-color: blue;
}
#editor {
  height: 100%;
  min-height: 50vh;
  width: 33%;
  display: inline-block;
}
</style>

