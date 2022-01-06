<template>
  <v-container>
    <h1 class="tituloCursos my-4">Lista de Cursos</h1>
    <v-row justify="space-around">
      <v-col
        v-for="curso in cursos"
        :key="curso.id"
        cols="12"
        md="4"
        sm="6"
        class="colCard"
      >
        <v-card width="400">
          <v-img height="400px" :src="curso.img"> </v-img>
          <v-card-text class="cardBody">
            <div>
              <h3 class="nombreCurso my-8">{{ curso.nombre }}</h3>
            </div>
            <div class="font-weight-bold ml-8 mb-2"><h3>Información</h3></div>

            <v-timeline class="pt-3" align-top dense>
              <v-timeline-item class="pb-0" color="deep-purple lighten-1" small>
                <div>
                  <div class="font-weight-normal">
                    <p>
                      Costo: <strong>{{ curso.costo }}</strong>
                    </p>
                  </div>
                  <div>
                    <p>Duración: {{ curso.duracion }}</p>
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>

            <v-timeline class="pt-3" align-top dense>
              <v-timeline-item class="pb-0" color="green" small>
                <div>
                  <div class="font-weight-normal">
                    <p>
                      Cupos: <strong>{{ curso.cupos }}</strong>
                    </p>
                  </div>
                  <div>
                    <p>
                      Completado: <span>{{ curso.estado }}</span>
                    </p>
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>

            <v-timeline class="pt-3" align-top dense>
              <v-timeline-item class="pb-0" color="deep-purple lighten-1" small>
                <div>
                  <div class="font-weight-normal">
                    <p>Fecha de Registro:</p>
                  </div>
                  <div>
                    <p>06/03/2021</p>
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>

            <v-timeline class="pt-3" align-top dense>
              <v-timeline-item class="pb-0" color="green" small>
                <div>
                  <div class="font-weight-normal">
                    <p>Descripción:</p>
                  </div>
                  <div>
                    <p>{{ curso.descripcion }}</p>
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'home',
  // props: {},
  data: function () {
    return {}
  },
  computed: {
    ...mapState(['cursos'])
  }
}
</script>

<style scoped>
.tituloCursos {
  text-align: center;
  font-size: 70px;
  font-weight: 400;
}

.nombreCurso {
  text-align: center;
  font-size: 20px;
}

.cardBody {
  background-color: #eee;
  height: 550px;
}

.colCard {
  display: flex;
  justify-content: center;
}
</style>
