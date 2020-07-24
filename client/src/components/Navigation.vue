<template>
    <div class="header">
        <nav class="navbar bg-dark navbar-dark sticky-top">
            <div class="navbar">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <a @click="logout" class="btn nav-link">logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'Navigation',
  methods: {
    logout () {
      localStorage.removeItem('username')
      this.$router.push({ path: '/join' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
