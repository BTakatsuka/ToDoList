<template>
  <div class="home">
    <section class="todo-top">
      <h4 class="text-top">Tasks List</h4>
      <b-button v-b-modal.create-task pill class="new-task">New Task</b-button>
      <b-modal
        id="create-task"
        ref="modal"
        title="Create a new task"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Task name"
            label-for="name-input"
            invalid-feedback="Task name is required"
            :state="nameState"
          >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
          </b-form-group>
        </form>
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Task description"
            label-for="name-input"
            invalid-feedback="Task description is required"
            :state="nameState"
          >
            <b-form-input
              id="name-input"
              v-model="description"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </section>
    <section class="todo-table">
      <b-table :items="items" :fields="fields" striped responsive="sm">
        <template #cell(show_details)="row">
          <b-button pill size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
          </b-button>
        </template>
        <template #cell(actions)="row">
          <b-button pill size="sm" class="mr-2" variant="success" @click="completeTask(row.item._id)" v-b-tooltip.hover title="complete">
            <b-icon icon="check"></b-icon>
          </b-button>
          <b-button pill size="sm" class="mr-2" variant="danger" @click="showModal(row.item._id)" v-b-tooltip.hover title="detele">
            <b-icon icon="x"></b-icon>
          </b-button>
        </template>
        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Descrition:</b></b-col>
              <b-col>{{ row.item.description }}</b-col>
            </b-row>
          </b-card>
        </template>
      </b-table>
      <b-modal
          ref="confirmDelete"
          header-bg-variant="danger"
          title="Delete this task?"
          @ok="deleteTask(id)"
      ></b-modal>
      <div class="pag mt-3">
        <b-pagination
          pills
          v-model="currentPage"
          :total-rows="total"
          :per-page="limit"
        ></b-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      fields: ['name', 'createdAt', 'show_details', 'actions'],
      items: [],
      newTask: false,
      name: '',
      description: '',
      nameState: null,
      pages: 1,
      currentPage: 1,
      limit: 10,
      total: 0
    }
  },
  created() {
    this.getTasks(1, 10, "asc");
  },
  methods: {
    getTasks(page, limit, sort){
      axios.get(`${this.API_ENDPOINT}/task/${page}/${limit}/${sort}`).then(res => {
        let results = res.data.data;
        results.forEach(e => {
          e.createdAt = this.convertDataTime(e.createdAt);
          e.updatedAt = this.convertDataTime(e.updatedAt);
        });
        this.items = res.data.data;
        this.pages = Math.ceil(Math.max(1, res.data.count/10));
        this.currentPage = page;
        this.limit = limit;
        this.total = res.data.count;
      }).catch(error => {
        console.log(error);
      })
    },
    convertDataTime(data){
      data = new Date(data);
      return data.toLocaleTimeString() + " " + data.toLocaleDateString();
    },
    resetModal() {
      this.name = ''
      this.description = ''
    },
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
    },
    handleOk(bvModalEvt) {
        bvModalEvt.preventDefault()
        this.handleSubmit()
      },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return
      }
      let obj = {
        name: this.name,
        description: this.description
      }
      axios.post(`${this.API_ENDPOINT}/task`, obj).then(() => {
        this.getTasks(this.currentPage, 10, "asc");
      }).catch(error => {
        console.log(error);
      })
      this.$nextTick(() => {
        this.$bvModal.hide('create-task')
      })
    },
    deleteTask(id) {
      axios.delete(`${this.API_ENDPOINT}/task/${id}`).then(() => {
        this.getTasks(this.currentPage, 10, "asc");
      }).catch(error => {
        console.log(error);
      })
    },
    completeTask(id) {
      axios.patch(`${this.API_ENDPOINT}/task/${id}`).then(() => {
        this.getTasks(this.currentPage, 10, "asc");
      }).catch(error => {
        console.log(error);
      })
    },
    showModal(id) {
      this.$refs['confirmDelete'].show();
      this.id = id;
    }
  },
  watch: {
    currentPage: {
      handler: function(val) {
        this.getTasks(val, 10, "asc");
      }
    }
  }
}
</script>

<style scoped>

  .todo-top {
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    background-color: #343A40;
  }
  .todo-top h4 {
    color: white;
  }

  .new-task {
    margin-right: 10%;
  }
  .text-top {
    margin-left: 8%;
  }
  .new-task:hover {
    background-color: #cd5447;
  }

  .pag {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
    margin-right: 5%;
  }
</style>