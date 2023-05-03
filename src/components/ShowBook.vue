<template>
    <div class="container">
        <Navbar />
        <div class="container-md mt-5">
        <div>
            <div>
                <div class="row">
                    <div class="col-md-5 col-sm-6 product-img border border-1 border-secondary bg-white rounded">
                        <img :src="bookImage" :alt="book.title" class="img-fluid">
                    </div>
                    <div class="col-md-7 col-sm-6 fs-5 d-flex flex-column justify-content-between align-items-start mb-md-0 mb-5 px-4">
                        <div class="mt-4 mt-md-0">
                            <h2 class="mb-4">{{book.title}}</h2>
                            <p class="mt-3 fs-6">
                                <strong class="fs-4">Description</strong>
                                <br />
                                {{book.description}}
                            </p>
                            <p class="my-2">
                                Genre: <span>{{book.genre}}</span>
                                </p>
                            <p class="my-2">
                                Author: <span>{{book.author}}</span>
                            </p>
                            <p class="my-2">
                                Publisher: <span>{{book.publisher}}</span>
                            </p>
                            <p class="my-2">
                                ISBN: <span>{{book.isbn}}</span>
                            </p>
                             <p class="my-2">
                                Published on: <span>{{formatDate(book.publishedOn)}}</span>
                            </p>
                        </div>
                        <div class="d-inline-block mt-14">
                            <router-link to="/home" class="text-decoration-none">
                                <a href="#" class="btn btn-outline-warning d-flex align-items-center">
                                    <i class="fas fa-arrow-left mx-1"></i>
                                    Back to Main Page
                                </a>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import Navbar from './Navbar.vue'
export default {
  components: { Navbar },
  data () {
    return {
      id: this.$route.params.uniqueBookId,
      book: [],
      bookImage: [],
      errors: []
    }
  },
  mounted () {
    this.getData(`http://127.0.0.1:8000/api/v1/book/get/` + this.id)
  },
  methods: {
    getData (url) {
      axios.get(url)
        .then(response => {
          this.book = response.data.response._source
          return axios.get(`http://127.0.0.1:8000/api/v1/get-media/` + response.data.response._source.uniqueMediaId)
        }).then((response) => {
          this.bookImage = response.data.response
          console.log(this.bookImage)
        }).catch(e => {
          this.errors.push(e)
        })
    },
    formatDate (publishedOn) {
      return new Date(publishedOn).toLocaleDateString()
    }
  }
}
</script>
<style lang="css" scoped>
.row .product-img {
    height: 60vh;
    padding: 0;
    margin: 0;
}
 .row .product-img img {
    height: 100%;
    width: 100%;
    transform: scale(0.75, 0.85);
}
 @media (max-width: 30rem) {
    .row .product-img img {
        transform: scale(0.9);
    }
}
 .row .quantity-input {
    width: 3rem;
}
</style>
