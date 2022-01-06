<template>
  <div>
    <v-footer dark padless class="mt-5">
      <v-card class="flex" flat tile>
        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>Alvaro Rivas | G10</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>

export default {
  name: 'footer-component'
}
</script>

<style scoped>
 .supFooter {
     background-color: #9400ff;
 }
</style>
