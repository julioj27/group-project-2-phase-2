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
        <div v-if="isStart===true">
          <button @click="answer('rock')">Rock</button>
          <button @click="answer('scissor')">Scissor</button>
          <button @click="answer('paper')">Paper</button>
        </div>
      </div>
      <div class="container">
        <h1>Opponent</h1>
        <p>{{ opponent }}</p>
      </div>
      <div v-if="isStart===false">
        <button @click="changeStatus(true)">mulai</button>
      </div>
      <div class="container" v-if="isFinish===true">
        <h1>Winner</h1>
        <p>{{ winner }}</p>
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
      errMsg: '',
      isFinish: '',
      isStart: false,
      opponentAnswer: '',
      myAnswer: '',
      winner: ''
    }
  },
  methods: {
    changeStatus (status) {
      this.isStart = status
    },
    answer (input) {
      this.myAnswer = input
      socket.emit('send-answer', { input, username: this.username })
    }
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
    socket.on('listen-answer', (data) => {
      if (data.username !== this.username) {
        this.opponentAnswer = data.input
      }
      console.log(data)
    })
  },
  computed: {
    finalAnswer: function () {
      return [this.myAnswer, this.opponentAnswer]
    }
  },
  watch: {
    finalAnswer: function () {
      if (this.myAnswer && this.opponentAnswer) {
        this.isFinish = true
        console.log(this.myAnswer, this.opponentAnswer)
        if (this.myAnswer === this.opponentAnswer) {
          this.winner = 'game is a tie'
        } else if (this.myAnswer === 'rock') {
          this.winner = this.opponentAnswer === 'paper' ? this.opponent : this.roomMaster
        } else if (this.myAnswer === 'scissor') {
          this.winner = this.opponentAnswer === 'rock' ? this.opponent : this.roomMaster
        } else if (this.myAnswer === 'paper') {
          this.winner = this.opponentAnswer === 'scissor' ? this.opponent : this.roomMaster
        }
        setTimeout(() => {
          this.myAnswer = ''
          this.opponentAnswer = ''
        }, 2000)
      }
    }
  }
}
</script>
