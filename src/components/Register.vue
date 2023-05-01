<template>
    <div class="container">
        <!-- <AdminHeader /> -->
        <div class="row justify-content-center">
            <div class="col-sm-6 mt-4">
                <form @submit.prevent="register()">
                    <div class="form-group mt-3">
                        <label for="name">Name:</label>
                        <input type="name" class="form-control" v-model="form.name" id="name" />
                        <p class="text-danger" v-if="errors && errors.name">{{ errors['name'][0] }}</p>
                    </div>
                    <div class="form-group mt-3">
                        <label for="email">Email Address:</label>
                        <input type="email" class="form-control" v-model="form.email" id="email" />
                        <p class="text-danger" v-if="errors && errors.email">{{ errors['email'][0] }}</p>
                    </div>
                    <div class="form-group mt-3">
                        <label for="password">Password:</label>
                        <input type="password" class="form-control" v-model="form.password" id="password" />
                        <p class="text-danger" v-if="errors && errors.password">{{ errors['password'][0] }}</p>
                    </div>
                    <div class="form-group mt-3">
                        <label for="confirm_password">Confirm Password:</label>
                        <input type="password" class="form-control" v-model="form.confirmPassword" id="confirm_password" />
                        <p class="text-danger" v-if="errors && errors.password">{{ errors['password'][0] }}
                        </p>
                    </div>
                    <button type="submit" class="btn btn-primary mt-3">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
// import AdminHeader from '../../components/Admin/AdminHeader.vue'
export default {
  // components: { AdminHeader },
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      errors: []
    }
  },
  methods: {
    register () {
      this.errors = []
      axios.get('http://127.0.0.1:8000' + '/sanctum/csrf-cookie').then(response => {
        axios.post('http://127.0.0.1:8000' + '/api/v1/auth/register', this.form).then(response => {
          if (response.status === 201) {
            localStorage.setItem('token', response.data.response.accessToken)
            this.$router.push({ name: 'admin.dashboard' })
          }
        }).catch((e) => {
          this.errors = e.response.data.errors
          console.log(this.errors)
        })
      })
    }
  }
}
</script>
