<template>
  <div>
    <textarea :value="input" @input="update"></textarea>
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import marked from "marked";
import * as _ from "lodash";

export default Vue.extend({
  props: ["markdown"],
  data: (props) => {
    return {
      input: props.markdown as string,
    };
  },
  computed: {
    // For some reason, these need to be cast.
    // See https://github.com/microsoft/TypeScript/issues/30854#issuecomment-485893681
    compiledMarkdown(): string {
        return marked(this.input as string, { sanitize: true });
    },
  },
  methods: {
    update: _.debounce(function (e: Event) {
      // Ugly, but we need something like this because of debounce
      // @ts-ignore line
      this.input = (e.target as HTMLInputElement).value;
    }, 300),
  }
});
</script>