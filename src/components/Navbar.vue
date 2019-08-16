<template>
    <nav class="navbar-wrap">
        <div class="center-wrap">
            <h2>
                <router-link :to="{name: 'Home'}">Smoothies</router-link>
            </h2>
            <router-link :to="{name: 'AddSmoothie'}" class="btn-add">
                <span class="pbscoicon-x"></span>
            </router-link>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
      return {

      }
  }

}
</script>

<style>

</style>
