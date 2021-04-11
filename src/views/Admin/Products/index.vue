<template>
  <div>
    <admin-sidebar>
      <template #title>
        <span>Products Page</span>
      </template>
      <template #action>
        <button
          @click="cancelForm"
          class="uk-button uk-button-primary uk-border-rounded"
          uk-toggle="target: #addProducts"
        >
          <span uk-icon="plus-circle"></span> Add
        </button>
      </template>
    </admin-sidebar>

    <!----------------------- Add & Edit Products modal ---------------------->
    <div id="addProducts" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Add New Products</h2>
        <!----------- Input Form ---------->
        <form @submit.prevent="submitProductForm">
          <fieldset class="uk-fieldset">
            <div class="uk-margin">
                <input 
                v-model="form.name" class="uk-input" type="text" placeholder="Name">
            </div>
            <div class="uk-margin">
                <input 
                v-model="form.price" class="uk-input" type="number" placeholder="Price">
            </div>
            <div class="uk-margin">
                <img :data-src="imageUrl" width="100" height="80" alt="" uk-img>
            </div>
            <div class="js-upload" uk-form-custom>
                <input type="file" @change="imageChangeHandler" accept="image/*" multiple>
                <button class="uk-button uk-button-default" type="button" tabindex="-1">Image</button>
            </div>
          </fieldset>
        </form>
        
        <!--------- End Input Form -------->

        <!-- Buttons in Add Products Modal -->
        <p class="uk-text-right">
          <button
            @click="cancelForm"
            class="uk-button uk-button-default uk-modal-close uk-margin-small-right"
            type="button"
          >
            Cancel
          </button>
          <button
            class="uk-button uk-button-primary"
            type="button"
            @click="submitProductForm()"
            :disabled="disable"
          >
            <i id="loading" class="fas fa-circle-notch fa-pulse"></i>
            Save
          </button>
        </p>
        <!-- End Buttons in Add Products Modal -->

        <div v-if="alertShow" class="uk-alert-warning" uk-alert>
          <!-- <a class="uk-alert-close" uk-close></a> -->
          <p>Input is empty!</p>
        </div>
      </div>
    </div>
    <!----------------- End Add & Edit Products Modal --------------------->

    <!-------------------- Delete Modal -------------------------->
    <div id="confirmDeleteModal" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Confirm Delete</h2>
        <button
          @click="cancelForm"
          class="uk-button uk-button-default uk-modal-close"
          type="button"
        >
          Close
        </button>
        <button
          class="uk-button uk-button-danger"
          type="button"
          :disabled="disable"
          @click="confirmDelete(selectedProductToDelete)"
        >
          <i id="deleteLoading" class="fas fa-circle-notch fa-pulse"></i>
          Delete
        </button>
      </div>
    </div>
    <!-------------------- End Delete Modal ------------------------>

  <!------------------------- lists -------------------------------->
    <div class="uk-section uk-section-primary uk-light">
      <div class="uk-container">
        <h4>Products</h4>
        <div v-if="products" class="uk-flex uk-flex-center uk-flex-wrap"
          uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 500">
          <!--------------- one Card ----------------------->
          <div
          v-for="product in products" :key="product.id"
          class="uk-card uk-card-default uk-width-1-4@m uk-border-rounded uk-margin-right uk-margin-bottom">
            <div  class="uk-card-media-top">
                <!----------- Edit Button -------->
                <div class="uk-card-badge">
                  <button class="uk-button uk-border-pill"
                  @click="fillForm(product)"
                  uk-toggle="target: #addProducts">
                  <span uk-icon="pencil"></span>
                  </button>
                </div>
                <img :data-src="product.imageUrl" width="" height="" :alt="product.name" uk-img>
                
            </div>

            <div class="uk-card-body">
                <div><h2 style="color:#000">{{ product.name }}</h2></div>
                <div>$ {{ product.price }}</div>
            </div>

            <div class="uk-card-footer">
                <button
                  class="uk-button uk-button-danger uk-modal-close"
                  type="button"
                  @click.prevent="showDeleteModalHandler(product.id)"
                  uk-toggle="target: #confirmDeleteModal"
                  >
                    Delete
                </button>
            </div>
              
          </div>
          <!---------------- End one Card ---------------->
        </div>
        <span class="page-loading" uk-spinner="ratio: 4.5" v-else></span>
      </div>
    </div>
  <!----------------------- End lists -------------------------------->
  </div>
</template>

<script>
import AdminSidebar from "@/components/Admin/AdminSidebar.vue";
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('Admin/ProductsModule/');
const initForm = ()=>({
      name:null,
      price:null,
})

export default {
  components: {
      AdminSidebar,
    },
    data() {
      return {
        disable: false,
        alertShow: false,
        selectedProductToDelete: null,
        imageFlie:null,
        form:initForm(),
        imageUrl:null,
        reader: new FileReader(),
        editId:null,
        isEditmode:false
      };
    },
  created(){
    this.reader.onload = ()=>{
      this.imageUrl = this.reader.result;
    };
  },
  methods: {
    ...mapActions(['submitProducts','editProductForm','deleteProducts']),
    cancelForm(){
      this.form = initForm();
      this.imageFlie = null;
      this.imageUrl = null;
      this.disable = false;
      this.editId = null;
      this.isEditmode = false;
      this.alertShow = false;
      this.selectedProductToDelete = null
    },
    imageChangeHandler(e){
      this.imageFlie = e.target.files[0];
      this.reader.readAsDataURL(this.imageFlie);
    },
    addProduct(){
      return submitProducts({
              file:this.imageFlie,
              product:this.form
              })
    },
    editProduct(){
      return editProductForm({
              product:this.form,
              id:this.editId,
              file:this.imageFlie
              })
    },
    submitProductForm() {
      if (this.form.name != null && this.form.price != null) {
          this.alertShow = false;
          this.disable = true;
          document.getElementById("loading").style.display = "inline-block";
          console.log(this.isEditmode);
        const callMethode = this.isEditmode ? 'editProduct' : 'addProduct'
          
            this[callMethode]().then(() => {
              this.form = initForm();
              this.disable = false;
              document.getElementById("html").classList.remove("uk-modal-page")
              document.getElementById("addProducts").style.display = "none";
              document.getElementById("loading").style.display = "none";
            });
          
        } else {
        this.alertShow = true;
      }
      
    },
    showDeleteModalHandler(categoryId) {
      this.selectedProductToDelete = categoryId;
    },
    confirmDelete(id){
      document.getElementById("deleteLoading").style.display = "inline-block";
      this.disable = true;

      deleteProducts(id).then(() => {
        document.getElementById("confirmDeleteModal").style.display = "none";
        document.getElementById("html").classList.remove("uk-modal-page");
        document.body.style=null;
        document.getElementById("deleteLoading").style.display = "none";
        this.disable = false;
      });
    },
    fillForm(data){
      const {id,name,price,imageUrl} = data
      this.form = {name,price}
      this.editId = id
      this.imageUrl = imageUrl
      this.isEditmode = true
    },
  },
  mounted(){
    this.$store.dispatch("Admin/ProductsModule/getProducts");
    this.isEditmode && this.fillForm();
  },
  computed:{
    ...mapState(['products'])
  }
}
</script>

<style>
#loading,
#deleteLoading {
  display: none;
}
.page-loading{
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  
}

</style>