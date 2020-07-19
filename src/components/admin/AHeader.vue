<template>
  <div class="header-fixed">
    <b-navbar fixed="top" toggleable="md" variant="dark" type="dark">
      <!-- <div class="container"> -->
      <b-navbar-brand href="#">
        <!-- class="d-inline-block align-top" -->
        <img src="@/assets/zs.png" alt="中术" width="40" height="40" />
        中术
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="text-center">
          <div v-for="nav in navArr" v-bind:key="nav.title">
            <!-- Navbar dropdowns -->
            <b-nav-item-dropdown v-if="nav.type=='dropdown'" v-bind:text="nav.title">
              <div v-for="arr in nav.arr" v-bind:key="arr.text">
                <b-dropdown-divider v-if="arr.type=='divider'"></b-dropdown-divider>

                <router-link
                  v-else-if="arr.type=='router-link'"
                  class="dropdown-item"
                  v-bind:to="{name:arr.name}"
                >{{arr.text}}</router-link>
                <b-dropdown-item v-else v-bind:href="arr.href">{{arr.text}}</b-dropdown-item>
              </div>
            </b-nav-item-dropdown>
            <!-- Navbar item -->
            <b-nav-item v-else v-bind:to="{name:nav.name}">{{nav.title}}</b-nav-item>

            <!-- <b-nav-item v-else >
              <router-link v-bind:to="{name:nav.name}" class="nav-color">{{nav.title}}</router-link>
            </b-nav-item>-->
          </div>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/">显示主页</b-nav-item>
          <!-- <router-link v-bind:to="{path:'/'}" class="nav-color">显示主页</router-link> -->
        </b-navbar-nav>
      </b-collapse>
      <!-- </div> -->
    </b-navbar>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import {
  BNavItem,
  BNavItemDropdown,
  BDropdownDivider,
  BDropdownItem,
  BNavbar,
  BNavbarNav,
  BNavbarBrand,
  BNavbarToggle,
  BCollapse
} from "bootstrap-vue";

const navArr = [
  {
    title: "设备",
    type: "dropdown",
    arr: [
      { type: "router-link", name: "equipment-info", text: "设备概要" },
      { type: "router-link", name: "equipment-data", text: "设备数据" }
    ]
  },
  {
    title: "测试",
    type: "dropdown",
    arr: [
      { type: "router-link", name: "emqx-http-api", text: "Emqx: Http Api" },
      { type: "router-link", name: "emqx-mqtt-client", text: "Emqx: Mqtt Client" },
      { type: "divider" },
      { type: "router-link", name: "post-data", text: "上传数据" }
    ]
  },
  {
    title: "模块数据",
    type: "",
    name: "module"
  }
];

export default {
  name: "AHeader",
  data() {
    return {
      navArr: navArr
    };
  },
  methods: {
    ...mapMutations(["setShowPage"])
    // onRouteChange(opt){
    //   console.log(opt);
    //   console.log(this.$route);

    //   return this.$router.push(opt);
    // }
  },
  components: {
    BNavItem,
    BNavItemDropdown,
    BDropdownDivider,
    BDropdownItem,
    BNavbar,
    BNavbarNav,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse
  }
};
</script>

<style scoped>
.header-fixed {
  padding-bottom: 70px;
}

.nav-color {
  color: rgba(255, 255, 255, 0.5);
}

.nav-color:hover {
  color: rgba(255, 255, 255, 0.8);
  /* color: #fff; */
  text-decoration: none;
}
</style>
