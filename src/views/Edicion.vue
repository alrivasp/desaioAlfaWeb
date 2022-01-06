<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="editItem.nombre" label="Nombre"></v-text-field>
          <v-text-field
            v-model="editItem.img"
            label="Url de la Imagen del curso"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="editItem.cupos"
            label="Cupos del curso"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="editItem.inscritos"
            label="Inscritos en el curso"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="editItem.duracion"
            label="Duración del curso"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="editItem.costo"
            label="Costo del curso"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="editItem.id"
            label="Código del curso"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            outlined
            v-model="editItem.descripcion"
            label="Descripción del curso"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="editItem.fecha"
            label="Fecha de Registro"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="btnEdicionInf">
        <v-btn class="mr-3" color="success" @click="update">Actualizar</v-btn>
        <v-btn class="ml-3" color="warning" @click="$router.push('/admin')">Volver</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'edicion',
  props: {
    id: {}
  },
  data: function () {
    return {
      editItem: {
        nombre: '',
        img: '',
        cupos: '',
        inscritos: '',
        duracion: '',
        costo: '',
        estado: '',
        id: '',
        descripcion: '',
        fecha: ''
      }
    }
  },
  // computed: {},
  methods: {
    ...mapActions(['fetchIdCurso', 'updateCurso', 'fetchCursos']),
    async setCurso () {
      let curso
      const resp = await this.fetchIdCurso(this.id)
      curso = resp.data()

      this.editItem.nombre = curso.nombre
      this.editItem.img = curso.img
      this.editItem.cupos = curso.cupos
      this.editItem.inscritos = curso.inscritos
      this.editItem.duracion = curso.duracion
      this.editItem.costo = curso.costo
      this.editItem.estado = curso.estado
      this.editItem.id = curso.id
      this.editItem.descripcion = curso.descripcion
      this.editItem.fecha = curso.fecha
    },
    update () {
      this.editItem.id = this.id
      this.updateCurso(this.editItem)
        .then((resp) => {
          alert('Edición Exitosa')
          this.fetchCursos()
          this.$router.push('/admin')
        })
        .catch((error) => {
          alert('Edición no guardada :' + error.message)
        })
    }
  },
  // watch: {},
  // components: {},

  // -- Lifecycle Methods
  // beforeCreate() {},
  created () {
    this.setCurso()
  }
  // beforeMount() {},
  // mounted() {},
  // beforeUpdate() {},
  // updated() {},
  // beforeDestroy() {},
  // destroyed() {},
  // -- End Lifecycle Methods
}
</script>

<style scoped>
.btnEdicionInf {
  display: flex;
  justify-content: center;
}
</style>
