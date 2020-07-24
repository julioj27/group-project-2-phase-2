<template>
    <div>
        <form class="form-signin" @submit.prevent="addRoom">
            <h1 class="h3 mb-3 font-weight-normal">Add Room</h1>
            <label for="inputEmail" class="sr-only">username</label>
            <input v-model="username" type="text" id="inputEmail" class="form-control" placeholder="Username" required="" autofocus="">
            <label for="inputEmail" class="sr-only">room</label>
            <input v-model="roomname" type="text" id="inputEmail" class="form-control" placeholder="Room name" required="" autofocus="">
            <button class="btn btn-lg btn-primary btn-block" type="add">Add</button>
            <router-link to="/join" class="nav-link">Join Room</router-link>
        </form>
    </div>
</template>

<script>
import socket from '../config/socket'

export default {
  name: 'Add',
  data () {
    return {
      username: '',
      roomname: ''
    }
  },
  methods: {
    addRoom () {
      const user = {
        name: this.username,
        room: this.roomname
      }
      socket.emit('add-room', user)
      localStorage.setItem('username', this.username)
      this.$router.push('/')
      this.username = ''
      this.roomname = ''
    }
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
