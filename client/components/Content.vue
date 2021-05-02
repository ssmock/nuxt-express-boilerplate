<template>
  <div>
    <div>
      <markdown :markdown="content" />
    </div>
    <div>
      <button>Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Content } from "../../domain/Content";
import Markdown from "./Markdown.vue";
import { RemoteResource, RemoteResources } from "../types/RemoteResource";

export default Vue.extend({
  components: { Markdown },
  data: () => {
    const remote: RemoteResource<Content> = RemoteResources.fresh<Content>();

    return {
      remote: remote
    };
  },
  computed: {
    content() {
        return this.remote.data || "";
    },
  },
  methods: {
    async fetchData() {
      try {
        this.remote = RemoteResources.startRequest(this.remote);

        // TODO: What's the URL?
        const data = (await (this as any).$axios.$get(
          "http://localhost:5000/thing/A"
        )) as Content;

        this.remote = RemoteResources.withData(this.remote, data);
      } catch (ex) {
        this.remote = await RemoteResources.withUnknownError(this.remote, ex);
      }
    },
  },
});
</script>