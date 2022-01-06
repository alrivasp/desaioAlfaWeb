<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="cursos"
          class="elevation-1 mt-5"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title class="text-h4">ADMINISTRACIÓN</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Agregar Curso
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h4">Agregando curso</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="addItem.nombre"
                            :counter="40"
                            label="Nombre"
                          ></v-text-field>
                          <v-text-field
                            v-model="addItem.img"
                            label="Url de la Imagen del curso"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="addItem.cupos"
                            label="Cupos del curso"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="addItem.inscritos"
                            label="Inscritos en el curso"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="addItem.duracion"
                            label="Duración del curso"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="addItem.costo"
                            label="Costo del curso"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="addItem.id"
                            label="Código del curso"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-subheader>Fecha Inicio</v-subheader>
                          <v-date-picker
                            v-model="addItem.fecha"
                            label="Fecha de Inicio"
                            flat
                          ></v-date-picker>
                        </v-col>
                        <v-radio-group v-model="addItem.estado" mandatory>
                          <v-subheader>Curso Activo</v-subheader>
                          <v-radio label="Si" value="true"></v-radio>
                          <v-radio label="No" value="false"></v-radio>
                        </v-radio-group>
                        <v-col cols="12">
                          <v-textarea
                            outlined
                            v-model="addItem.descripcion"
                            label="Descripción del curso"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions class="btnModalAgregar">
                    <v-btn color="success" @click="save"> Agregar </v-btn>
                    <v-btn class="mx-5" color="error" @click="reset">
                      Limpiar Formulario
                    </v-btn>
                    <v-btn color="warning" @click="close"> Cancelar </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="550px">
                <v-card>
                  <v-card-title class="textoEliminar text-h5"
                    >¿Estás seguro de querer borrar este curso?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="deleteItemConfirm"
                      >Eliminar</v-btn
                    >
                    <v-btn color="warning" @click="closeDelete">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.acciones="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-alert dense outlined color="purple" icon="mdi-account-group">
          Cantidad total de alumnos permitidos: {{ totalCuposPermitidos }}
        </v-alert>

        <v-alert dense outlined color="blue" icon="mdi-account-multiple-check">
          Cantidad total de alumnos inscritos: {{ totalCuposInscritos }}
        </v-alert>

        <v-alert dense outlined color="pink" icon="mdi-account-clock">
          Cantidad total de cupos restantes: {{ totalCuposRestantes }}
        </v-alert>

        <v-alert dense outlined color="red" icon="mdi-cancel">
          Cantidad total de cursos terminados: {{ totalCursosTerminados }}
        </v-alert>

        <v-alert dense outlined color="teal" icon="mdi-bell-check">
          Cantidad total de cursos activos: {{ totalCursosActivos }}
        </v-alert>

        <v-alert dense outlined color="deep-orange" icon="mdi-bell-ring">
          Cantidad total de cursos: {{ totalCursos }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "administracion",
  data: function () {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Curso",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Cupos", value: "cupos" },
        { text: "Inscritos", value: "inscritos" },
        { text: "Duración", value: "duracion" },
        { text: "Costo", value: "costo" },
        { text: "Terminado", value: "estado" },
        { text: "Fecha", value: "fecha" },
        { text: "Acciones", value: "acciones", sortable: false },
      ],
      editedIndex: -1,
      addItem: {
        nombre: "",
        img: "",
        cupos: "",
        inscritos: "",
        duracion: "",
        costo: "",
        estado: "",
        id: "",
        descripcion: "",
        fecha: "",
      },
      defaultItem: {
        nombre: "",
        img: "",
        cupos: "",
        inscritos: "",
        duracion: "",
        costo: "",
        estado: "",
        id: "",
        descripcion: "",
        fecha: "",
      },
      idEliminar: "",
    };
  },
  computed: {
    ...mapState(["cursos"]),
    ...mapGetters([
      "totalCursos",
      "totalCursosActivos",
      "totalCursosTerminados",
      "totalCuposPermitidos",
      "totalCuposInscritos",
      "totalCuposRestantes",
    ]),
  },
  methods: {
    ...mapActions(["createCurso", "deleteCurso", "fetchCursos"]),

    mostrarEstado(estado) {
      if (estado === true) {
        return "Sí";
      } else {
        return "No";
      }
    },

    editItem(item) {
      this.$router.push("/edicion/" + item.id);
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.idEliminar = item.id;
    },

    deleteItemConfirm() {
      this.deleteCurso(this.idEliminar)
        .then((resp) => {
          alert("Borrado exitosamente");
          this.idEliminar = "";
          this.dialogDelete = false;
          this.fetchCursos();
        })
        .catch((error) => {
          alert("Ups, hubo un error al eliminar el curso" + error);
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.createCurso(this.addItem)
        .then((resp) => {
          alert("Registro Exitoso");
          this.dialog = false;
          this.reset();
          this.fetchCursos();
        })
        .catch((error) => {
          alert("Ups, hubo un error al agregar" + error);
        });
    },

    reset() {
      this.addItem.nombre = "";
      this.addItem.img = "";
      this.addItem.cupos = "";
      this.addItem.inscritos = "";
      this.addItem.duracion = "";
      this.addItem.costo = "";
      this.addItem.estado = "";
      this.addItem.fecha = "";
      this.addItem.id = "";
      this.addItem.descripcion = "";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
};
</script>

<style scoped>
.btnModalAgregar,
.textoEliminar {
  display: flex;
  justify-content: center;
}
</style>
