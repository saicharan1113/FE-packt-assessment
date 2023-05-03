<!-- eslint-disable no-tabs -->
<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div class="container">
        <Navbar />
        <div class="row mt-2">
            <div class="col-4">
            </div>
            <div class="col-6">
                <form class="d-flex center" @submit.prevent="getData">
                    <input class="form-control me-2" @input="getData" v-model="searchText" type="search"
                        placeholder="Search by title-author-published-isbn-genre-publisher..." aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            <div class="col-2">
            </div>
        </div>
        <p class="text-center mt-2 fs-2" v-if="noData">No Data Found</p>
        <div class="row mt-3" v-else>
            <div class="col-3">
                <!-- <Filter :filterData="filterData" @filterGetData="getFilterData" /> -->
            </div>
            <div class="col-9">
                <div class="row gy-4">
                    <div v-for="book in books" class="col-6 col-xl-4" :key="book.uniqueBookId">
                        <div class="card shadow-sm h-100">
                            <div class="card-img">
                                <img :src="book.image" :alt="book.name" class="img-fluid">
                            </div>
                            <div class="card-body">
                                <router-link :to="{
                                    name: 'show',
                                    params: { id: book.uniqueBookId }
                                }">
                                    <h5 class="card-title">{{ book.title }}</h5>
                                </router-link>
                                <!-- <p class="card-text">{{ book.description }}</p> -->
                                <p class="font-weight-bold">{{ book.published }}, {{ book.publisher }}</p>
                                <p class="font-weight-bold">Author: {{ book.author }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-end">
                            <!-- <li class="page-item" v-for="link in pagination.links"> e' : ''"
                                <button @click="getPageData(link.url)" v-html="link.label"></button>
                            </li> -->
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
// import Filter from './Filter.vue'
import Navbar from './Navbar.vue'
// import { RouterLink, RouterView } from 'vue-router'
export default {
  components: { Navbar },
  data () {
    return {
      searchText: '',
      books: [],
      pagination: {
        links: []
      },
      filters: {},
      filterData: [],
      errors: [],
      url: `http://127.0.0.1:8000/api/v1/book/getBookList`,
      noData: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let data = {}
      if (this.searchText) {
        data = { search: this.searchText }
      }
      if (Object.keys(this.filters).length > 0) {
        Object.assign(data, this.filters)
      }
      axios.get(this.url, { params: data })
        .then(response => {
          this.books = response.data.data
          this.pagination.links = response.data.meta.links
          this.filterData = response.data
          this.filters = {}
          if (this.books.length === 0) {
            this.noData = true
          } else {
            this.noData = false
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    getPageData (url) {
      this.url = url
      this.getData()
    },
    getFilterData (data) {
      this.filters = data
      this.getData()
    }
  }
}
</script>
<style scoped>
 .card .card-img {
     height: 15rem;
     width: 100%;
}
 .card .card-img img {
    height: 100%;
    width: 100%;
    transform: scale(0.95);
}
</style>
