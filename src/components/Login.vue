<template>
    <div class="container">
        <Navbar/>
        <div class="row justify-content-center">
            <div class="col-sm-6 mt-4">
                <p class="text-danger" v-if="errors && errors.message">{{ errors.message }}</p>
                <form @submit.prevent="login()">
                    <div class="form-group mt-3">
                        <label for="email">Email Address:</label>
                        <input type="email" v-model="form.email" class="form-control" id="email" />
                        <p class="text-danger" v-if="errors.errors && errors.errors.email">{{ errors.errors.email[0] }}</p>
                    </div>
                    <div class="form-group mt-3">
                        <label for="password">Password:</label>
                        <input type="password" v-model="form.password" class="form-control" id="password" />
                        <p class="text-danger" v-if="errors.errors && errors.errors.password">{{ errors.errors['password'][0] }}</p>
                    </div>
                    <button type="submit" class="btn btn-primary mt-3">Login</button>
                </form>
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
      form: {
        email: '',
        password: ''
      },
      errors: []
    }
  },
  methods: {
    login () {
      this.errors = []
      axios.get('http://127.0.0.1:8000' + '/sanctum/csrf-cookie').then(response => {
        axios.post('http://127.0.0.1:8000' + '/api/v1/auth/login', this.form).then(response => {
          console.log(process.env)
          console.log(process.env.port)
          if (response.status === 200) {
            localStorage.setItem('token', response.data.response.accessToken)
            this.$router.push({ name: 'admin.dashboard' })
          }
        }).catch((e) => {
          this.errors = e.response.data
        })
      })
    }
  }
}
</script>
