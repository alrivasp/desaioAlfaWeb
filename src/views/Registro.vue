<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h2 class="tituloRegistro mt-3 mb-5">Registro de Usuario</h2>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="user"
              :counter="10"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="pass"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show2 ? 'text' : 'password'"
              name="input-10-2"
              label="Contraseña"
              hint="Min 6 caracteres"
              value="wqfasds"
              class="input-group--focused"
              @click:append="show2 = !show2"
            ></v-text-field>

            <div class="btnForm">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="login"
              >
                REGISTRARSE
              </v-btn>

              <v-btn color="error" class="mr-4" @click="limpiarForm">
                LIMPIAR FORMULARIO
              </v-btn>

              <v-btn color="warning" @click="$router.push('/login')">
                IR A LOGIN
              </v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data: function () {
    return {
      user: '',
      pass: '',
      show2: false,
      rules: {
        required: (value) => !!value || 'Contraseña requerida',
        min: (v) => v.length >= 6 || 'Min 6 caracteres'
      },
      valid: true,
      emailRules: [
        (v) => !!v || 'E-mail es requerido',
        (v) => /.+@.+\..+/.test(v) || 'El E-mail debe ser válido'
      ],
      showSnackbar: false
    }
  },
  methods: {
    login () {
      this.showSnackbar = true
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.user, this.pass)
        .then((resp) => {
          console.log(resp, 'login')
          alert('Registro exitoso')
          this.setMail(this.user)
          this.$router.push('/')
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
        })
    },
    ...mapActions(['setMail']),
    limpiarForm () {
      this.user = ''
      this.pass = ''
    }
  },
  components: {}

}
</script>

<style scoped>
.tituloRegistro {
  font-size: 40px;
}

.datosIngreso {
  text-align: center;
}

.btnForm {
  text-align: center;
}
</style>
