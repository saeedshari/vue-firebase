<template>
  <div>
    <div>
    <!-- Navbar section ----------------------------->
        <nav class="uk-navbar uk-navbar-container">
            <div class="uk-navbar-left uk-dark uk-background-muted">
                <div class="uk-navbar-item">
                    <!-- Slot Sidebar of navbar -->
                    <slot name="sidebar"></slot>
                </div>
                <div class="uk-navbar-item">
                    <!-- Slot Title of navbar -->
                    <slot name="title">
                    </slot>
                </div>
            </div>
            <div class="uk-navbar-center uk-dark uk-background-muted">
                <div class="uk-navbar-item">
                    <!-- Slot Sidebar of navbar -->
                    <slot name="search"></slot>
                </div>
            </div>
            <div class="uk-navbar-right">
                <div class="uk-navbar-item">
                    <!-- Slot Button -->
                    <slot name="action">
                    </slot>
                </div>
            </div>
        </nav>
    </div>
    <!-- Side Navbar ------------------------------->
      <div id="sideNav" uk-offcanvas="mode: slide">
      <div class="uk-offcanvas-bar">
          <ul class="uk-nav uk-nav-default">
              <li :class="{'uk-active': $route.name == 'admin'}"><router-link to="/admin">Home</router-link></li>
              <li :class="{'uk-active': $route.name == 'products'}"><router-link to="/admin/products">Products</router-link></li>
              <li :class="{'uk-active': $route.name == 'categories'}"><router-link to="/admin/categories">Categories</router-link></li>
          </ul>
      </div>
</div>


  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>