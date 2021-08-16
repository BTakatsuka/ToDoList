<template>
  <div class="done">
    <section class="todoTable">
      <b-table :items="items" :fields="fields" striped responsive="sm">
        <template #cell(show_details)="row">
          <b-button pill size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
          </b-button>
        </template>
        <template #cell(action)="row">
          <b-button pill size="sm" class="mr-2" variant="danger" @click="showModal(row.item._id)" v-b-tooltip.hover title="detele">
            <b-icon icon="x"></b-icon>
          </b-button>
        </template>
        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Description:</b></b-col>
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
        fields: ['name', 'updatedAt', 'show_details', 'action'],
        items: [],
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
      axios.get(`${this.API_ENDPOINT}/done/${page}/${limit}/${sort}`).then(res => {
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
    deleteTask(id) {
      axios.delete(`${this.API_ENDPOINT}/task/${id}`).then(() => {
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
.pag {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
    margin-right: 5%;
  }
</style>