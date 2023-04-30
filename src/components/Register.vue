<template>
    <div class="card" align="left">
            <div class="card-header">Register Form</div>
            <div class="card-body">
                <form  @submit.prevent="saveData">
                <label>First Name</label>
                <input type="text" v-model="userBook.name" name="name" id="name" class ="form-control"/>
                <label>Email</label>
                <input type="email" v-model="userBook.email" name="email" id="email" class ="form-control"/>
                <label>Password</label>
                <input type="password" v-model="userBook.password" name="password" id="password" class ="form-control"/>
                <label>Confirm Password</label>
                <input type="password" v-model="userBook.confirmPassword" name="password" id="password" class ="form-control"/>
                <input type="submit" value="Save" class="btn btn-success">
                </form>
            </div>
        </div>
    </template>
<script>
import Vue from 'vue'
import axios from 'axios'
Vue.use(axios)
export default {
  name: 'Register',
  data () {
    return {
      result: {},
      userBook: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  created () {
  },
  mounted () {
    console.log('mounted() called.......')
    this.userBook.inputs = JSON.parse(localStorage.getItem('form')) || []
  },
  watch: {
    user: {
      handler: function () {
        localStorage.setItem('form', JSON.stringify(this.userBook.inputs))
      },
      deep: true
    }
  },
  methods: {
    saveData () {
      axios.post('http://127.0.0.1:8000/api/v1/auth/register', this.userBook)
        .then(
          ({data}) => {
            console.log(data)
            try {
              alert('saveddddd')
            } catch (err) {
              alert('failed')
            }
          }
        )
    }
  }
}
</script>
