<template>
  <div class="home">
    <Navigation></Navigation>
    <div v-if="errMsg">
      <h1>alert {{ errMsg }}</h1>
    </div>
    <div v-else>
      <div class="container">
        <h1>Room</h1>
        <p>{{ roomName }}</p>
      </div>
      <div class="container">
        <h1>Room Master</h1>
        <p>{{ roomMaster }}</p>
      </div>
      <div class="container">
        <h1>Opponent</h1>
        <p>{{ opponent }}</p>
      </div>
      <div class="container">
        <h1>isfinish</h1>
        <p>{{ isFinish }}</p>
      </div>
      <div v-if="opponent">
        <button>mulai</button>
      </div>
    </div>
  </div>
</template>

<script>
import socket from '../config/socket'
import Navigation from '../components/Navigation'

export default {
  name: 'Home',
  components: {
    Navigation
  },
  data () {
    return {
      username: localStorage.username,
      roomName: '',
      roomMaster: '',
      opponent: '',
      isFinish: '',
      errMsg: ''
    }
  },
  methods: {
  },
  mounted () {
    socket.on('join', (data) => {
      if (data.name === 'error') {
        this.errMsg = data.msg
      } else {
        this.roomName = data.room
        this.roomMaster = data.RoomMaster
        this.opponent = data.opponent
        this.isFinish = data.isFinish
      }
    })
    socket.on('add', (data) => {
      this.roomName = data.room
      this.roomMaster = data.RoomMaster
      this.opponent = data.opponent
      this.isFinish = data.isFinish
    })
  }
}
</script>
