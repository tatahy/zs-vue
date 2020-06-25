<template>
  <div>
    <div>
      <h5>Response Items:</h5>

      <TheArrayList
        list-val-name="items"
        v-bind:list-val="items"
        col-length="2"
        align-vertical="start"
      />
    </div>

    <p>
      resData:
      <br />
      {{resData}}
    </p>

    <p>
      items:
      <br />
      {{items}}
    </p>
  </div>
</template>

<script>
import { asyFetch, getServUrl } from "@/utility/util";

export default {
  name: "DataTable",
  data() {
    return {
      url: getServUrl(),
      items: [],
      resData: ""
    };
  },
  computed: {},
  methods: {
    initData:async function(){
      const res=await this.fetchTbData();
      if (res.ok) {
        this.items = res.cont.items;
      }
      this.resData = res;
    },
    fetchTbData: async function() {
      const query = {
        tbName: "data_raw",
        fields: [],
        where:'',
        limit:''
      };
      const opt = { method: "POST", body: JSON.stringify(query) };
      const url = this.url + "terminal";

      return  await asyFetch(url, opt);
    }
  },
  components: {
    TheArrayList: () => import("@/components/admin/emqx-test/TheArrayList.vue")
  },
  created() {
    this.initData();
  }
};
</script>

<style scoped>
</style>
