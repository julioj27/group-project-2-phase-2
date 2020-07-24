<template>
  <div class="login">
    <form class="form-signin" @submit.prevent="joinRoom">
      <h1 class="h3 mb-3 font-weight-normal">Join Room</h1>
      <label for="inputuser" class="sr-only">username</label>
      <input v-model="username" type="text" id="inputuser" class="form-control" placeholder="username" required="" autofocus="">
      <label for="inputroom" class="sr-only">room</label>
      <input v-model="roomname" type="text" id="inputroom" class="form-control" placeholder="Room" required="">
      <button class="btn btn-lg btn-primary btn-block" type="add">Join</button>
      <router-link to="/add" class="nav-link">Add Room</router-link>
    </form>
  </div>
</template>

<script>
import socket from '../config/socket'

export default {
  name: 'Join',
  data () {
    return {
      username: '',
      roomname: ''
    }
  },
  methods: {
    joinRoom () {
      const user = {
        name: this.username,
        room: this.roomname
      }
      socket.emit('join-room', user)
      localStorage.setItem('username', this.username)
      this.$router.push('/')
      this.username = ''
      this.roomname = ''
    }
  },
  created () {
  }
}
</script>

<style scoped>
.form-signin {
    width: 100%;
    max-width: 460px;
    padding: 15px;
    padding-top: 50px;
    margin: 0 auto;
}

.form-signin h1 {
  font-size: 30px;
  color: #403866;
  text-transform: uppercase;
  text-align: center;
}

.form-signin input {
  color: #403866;
  font-size: 18px;
  height: 62px;
  margin-bottom: 20px;
}

.form-signin button {
  background-color: #403866;
}
</style>
