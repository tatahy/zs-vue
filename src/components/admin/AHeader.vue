<template>
  <div class="header-fixed">
    <b-navbar fixed="top" toggleable="md" variant="dark" type="dark">
      <!-- <div class="container"> -->
        <b-navbar-brand href="#" >
          <!-- class="d-inline-block align-top" -->
          <img src="@/assets/zs.png" alt="中术" width="40" height="40" />
          中术
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="text-center">
            <!-- Navbar dropdowns -->
            <b-nav-item-dropdown text="AAAA">
              <b-dropdown-item href="#">a1</b-dropdown-item>
              <b-dropdown-item href="#">a2</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item href="#">a3</b-dropdown-item>
              <b-dropdown-item href="#">a4</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="BBBB">
              <b-dropdown-item href="#">b1</b-dropdown-item>
              <b-dropdown-item href="#">b2</b-dropdown-item>
              <b-dropdown-item href="#">b3</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="CCCC">
              <b-dropdown-item href="#">c1</b-dropdown-item>
              <b-dropdown-item href="#">c2</b-dropdown-item>
              <b-dropdown-item href="#">c3</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
             <b-nav-item v-on:click="setShowPage('index')">显示主页 </b-nav-item>
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

export default {
  name: "AHeader",
  methods:{
    ...mapMutations([
      'setShowPage'
    ]),
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
.header-fixed{
  padding-bottom: 70px;
} 


</style>
