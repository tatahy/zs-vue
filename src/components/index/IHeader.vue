<template>
  <div class="header-fixed">
    <b-navbar fixed="top" toggleable="md" variant="info" type="dark">
      <b-navbar-brand href="#" class="mx-md-5">
        <!-- class="d-inline-block align-top" -->
        <img src="@/assets/zs.png" alt="中术" width="40" height="40" />
        中术
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- <b-navbar-nav class="navItemCenter "> -->
        <b-navbar-nav class="text-center">
          <div v-for="nav in navArr" v-bind:key="nav.title">
            <!-- Navbar dropdowns -->
            <b-nav-item-dropdown v-if="nav.type=='dropdown'" v-bind:text="nav.title">
              <div v-for="arr in nav.arr" v-bind:key="arr.text">
                <b-dropdown-divider v-if="arr.type=='divider'"></b-dropdown-divider>
                <b-dropdown-item v-else v-bind:href="arr.href">{{arr.text}}</b-dropdown-item>
              </div>
            </b-nav-item-dropdown>
            <!-- Navbar item -->
            <b-nav-item v-else v-bind:href="nav.href">{{nav.title}}</b-nav-item>
          </div>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-item v-on:click="setShowPage('admin')">显示后台 </b-nav-item> -->
          <router-link v-bind:to="{name:'admin'}" class="nav-link">显示后台</router-link>
        </b-navbar-nav>
      </b-collapse>
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
    title: "AAAA",
    type: "dropdown",
    arr: [
      { type: "item", href: "#", text: "a1" },
      { type: "item", href: "#", text: "a2" },
      { type: "divider" },
      { type: "item", href: "#", text: "a3" },
      { type: "item", href: "#", text: "a4" }
    ]
  },
  {
    title: "BBBB",
    type: "dropdown",
    arr: [
      { type: "item", href: "#", text: "b1" },
      { type: "item", href: "#", text: "b2" },
      { type: "item", href: "#", text: "b3" }
    ]
  },
  {
    title: "CCCC",
    type: "dropdown",
    arr: [
      { type: "item", href: "#", text: "c1" },
      { type: "item", href: "#", text: "c2" },
      { type: "item", href: "#", text: "c3" }
    ]
  },
];

export default {
  name: "IHeader",
  data(){
    return {
      navArr:navArr
    };
  },
  methods: {
    ...mapMutations(["setShowPage"])
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

</style>
