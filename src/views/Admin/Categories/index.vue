<template>
  <div>
    <admin-sidebar>
      <template #title>
        <span>Categories Page</span>
      </template>
      <template #action>
        <button
          class="uk-button uk-button-primary uk-border-rounded"
          uk-toggle="target: #addCategory"
        >
          <span uk-icon="plus-circle"></span> Add
        </button>
      </template>
    </admin-sidebar>

    <!----------------------- Add Category modal ---------------------->
    <div id="addCategory" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Add New Category</h2>
        <!----------- form ------------->
        <form
          @submit.prevent="submitCategoryForm"
          class="uk-form-horizontal uk-margin-large"
        >
          <div class="uk-margin">
            <label class="uk-form-label" for="form-horizontal-text"
              >Category</label
            >
            <div class="uk-form-controls">
              <input
                class="uk-input"
                id="form-horizontal-text"
                type="text"
                placeholder="Add New Category..."
                v-model="categoryName"
              />
            </div>
          </div>
        </form>
        <!---------- end form ------------>
        <!-- Buttons in Add Category Modal -->
        <p class="uk-text-right">
          <button
            @click="cancelForm"
            class="uk-button uk-button-default uk-modal-close uk-margin-small-right"
            type="button"
          >
            Cancel
          </button>
          <button
            class="uk-button uk-button-primary uk-margin-2"
            type="button"
            @click="submitCategoryForm()"
            :disabled="disable"
          >
            <i id="loading" class="fas fa-circle-notch fa-pulse"></i>
            Save
          </button>
        </p>
        <!-- End Buttons in Add Category Modal -->

        <div v-if="alertShow" class="uk-alert-warning" uk-alert>
          <!-- <a class="uk-alert-close" uk-close></a> -->
          <p>Input is empty!</p>
        </div>
      </div>
    </div>
    <!----------------- End Add Category Modal --------------------->

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
          @click="confirmDelete(selectedCategoryToDelete)"
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
        <h4>Categories</h4>
        <div v-if="categories" class="uk-flex uk-flex-center uk-flex-wrap"
          uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 500">
          <div 
          class="uk-card uk-card-default uk-width-1-4@m uk-border-rounded uk-margin-right uk-margin-bottom" 
          v-for="category in categories" :key="category.id">
            <div>
              <div class="uk-card-body">
                <!----------- Edit Button -------->
                <div class="uk-card-badge">
                  <button class="uk-button uk-border-pill"
                  @click="fillForm(category)"
                  uk-toggle="target: #addCategory">
                  <span uk-icon="pencil"></span>
                  </button>
                </div>

                <h3 style="color:#000">{{ category.name }}</h3>
              </div>
              <div class="uk-card-footer">
                <button
                  class="uk-button uk-button-danger uk-modal-close"
                  type="button"
                  @click.prevent="showDeleteModalHandler(category.id)"
                  uk-toggle="target: #confirmDeleteModal"
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        </div>
        <span class="page-loading" uk-spinner="ratio: 4.5" v-else></span>
      </div>
    </div>

  </div>
</template>

<script>
import AdminSidebar from '@/components/Admin/AdminSidebar.vue';

export default {
  components: {
    AdminSidebar,
  },
  data() {
    return {
      categoryName: null,
      disable: false,
      alertShow: false,
      selectedCategoryToDelete: null,
      editId:null,
      isEditmode:false
    };
  },
  methods: {
      cancelForm(){
      this.categoryName = null;
      this.disable = false;
      this.editId = null;
      this.isEditmode = false;
      this.alertShow = false;
      this.selectedCategoryToDelete = null
    },
    addCategory(){
        return this.$store
          .dispatch("Admin/CategoryModule/submitCategory", { name: this.categoryName })
      },
      editCategory(){
        return this.$store
          .dispatch("Admin/CategoryModule/editCategory", {
            userCategory:{name: this.categoryName},
            id:this.editId
            } )
      },
    submitCategoryForm() {
      if (this.categoryName != null) {
          this.alertShow = false;
          this.disable = true;
          document.getElementById("loading").style.display = "inline-block";
          const callMethode = this.isEditmode ? 'editCategory' : 'addCategory'

            this[callMethode]().then(() => {
              this.categoryName = null;
              this.disable = false;
              document.getElementById("html").classList.remove("uk-modal-page")
              document.getElementById("addCategory").style.display = "none";
              document.getElementById("loading").style.display = "none";
            });
          
        } else {
        this.alertShow = true;
      }
      
    },

    showDeleteModalHandler(categoryId) {
      this.selectedCategoryToDelete = categoryId;
      
    },
    fillForm(data){
      const {id,name} = data;
      this.categoryName = name;
      this.editId = id;
      this.isEditmode = true;
    },
    confirmDelete(id) {
      document.getElementById("deleteLoading").style.display = "inline-block";
      this.disable = true;

      this.$store.dispatch("Admin/CategoryModule/deleteCategory", id).then(() => {
        document.getElementById("confirmDeleteModal").style.display = "none";
        document.getElementById("html").classList.remove("uk-modal-page");
        document.body.style=null;
        document.getElementById("deleteLoading").style.display = "none";
        this.disable = false;
      });
    },
  },

  mounted() {
    this.$store.dispatch("Admin/CategoryModule/getCategories");
    this.isEditmode && this.fillForm();
  },

  computed: {
    categories() {
      return this.$store.state.Admin.CategoryModule.categories;
    },
  },
};
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
