<template>
  <div class="home">
    <Navigation></Navigation>
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
      opponent: ''
    }
  },
  methods: {
  },
  mounted () {
    socket.on('join', (data) => {
      console.log(data)
      this.roomName = data.room
      this.roomMaster = data.RoomMaster
      this.opponent = data.opponent
    })
    socket.on('add', (data) => {
      console.log(data)
      this.roomName = data.room
      this.roomMaster = data.RoomMaster
      this.opponent = data.opponent
    })
  }
}
</script>
