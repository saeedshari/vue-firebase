<template>
<div class="uk-container-cover">

    <div class="uk-background-cover uk-height-medium uk-panel image-background" uk-height-viewport>

        <div class="uk-flex uk-flex-center uk-margin-top">
          <div class="uk-alert-warning" uk-alert>
              <p>Due to the use of firebase, you must use a VPN</p>
          </div>
        </div>
        <div class="uk-flex uk-flex-center uk-margin-small">
            <router-link class="uk-button uk-button-primary uk-margin-right" to="/">Home</router-link> 
            <router-link class="uk-button uk-button-secondary" to="/admin">Admin</router-link>
        </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Home',
  
}
</script>
<style scoped>
.image-background{
  background-image: url('../../src/assets/blog-image.jpg');
}
</style>