<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Packt Book Store</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div v-if="!showLinks" class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <router-link class="px-5" :to="{
                    name: 'Login'
                }">
                    Login
                </router-link>
                <router-link :to="{
                    name: 'Register'
                }">
                    Register
                </router-link>
            </div>
            <div v-else class="nav-link collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <a aria-current="page" @click="logout()"
                    class="px-5"> Logout
                </a>
            </div>
        </div>
    </nav>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      showLinks: !!localStorage.getItem('token')
    }
  },
  methods: {
    logout () {
      this.errors = []
      const token = localStorage.getItem('token')
      axios.get('http://127.0.0.1:8000' + '/sanctum/csrf-cookie').then(response => {
        axios.post('http://127.0.0.1:8000' + '/api/v1/auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response => {
          if (response.status === 200) {
            localStorage.removeItem('token')
            this.$router.push({ name: '/' })
          }
        }).catch((e) => {
          this.errors = e.response.data.errors
          console.log(e)
        })
      })
    }
  }
}
</script>
