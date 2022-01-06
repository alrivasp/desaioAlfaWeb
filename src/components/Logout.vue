<template>
  <div>
    <v-btn
    depressed
    color="deep-purple accent-4"
    @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'

export default {
  name: 'Logout',
  // props: {},
  data: function () {
    return {}
  },
  // computed: {},
  methods: {
    logout () {
      firebase.auth().signOut()
        .then(() => {
          this.resetEmail()
          this.$router.push('/login')
        })
        .catch(error => {
          console.log(error)
        })
    },
    ...mapActions(['resetEmail'])
  }
}
</script>

<style scoped>
</style>
