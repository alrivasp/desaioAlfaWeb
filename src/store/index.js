/* eslint-disable no-empty-pattern */
import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../firebase/firebaseDB'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cursos: [],
    email: ''
  },
  getters: {

    totalCursos: state => state.cursos.length,
    totalCursosActivos: (state) => {
      const cursoActivo = state.cursos.filter((curso) => {
        if (curso.estado === 'true') {
          return curso
        }
      })
      return cursoActivo.length
    },
    totalCursosTerminados: (state) => {
      const cursoTerminado = state.cursos.filter((curso) => {
        if (curso.estado === 'false') {
          return curso
        }
      })
      return cursoTerminado.length
    },
    totalCuposPermitidos: (state) => {
      console.log(state.cursos.map(item => item.cupos).reduce((prev, cupos) => parseInt(prev) + parseInt(cupos)))
      return state.cursos.map(item => item.cupos).reduce((prev, cupos) => parseInt(prev) + parseInt(cupos))
    },
    totalCuposInscritos: (state) => {
      return state.cursos.reduce(function (total, curso) {
        return total + parseInt(curso.inscritos)
      }, 0)
    },
    totalCuposRestantes: (state, getter) => {
      console.log(getter.totalCursosInscritos)
      return getter.totalCuposPermitidos - getter.totalCuposInscritos
    }
  },

  mutations: {
    SET_EMAIL (state, email) {
      state.email = email
    },
    RESET_EMAIL (state) {
      state.email = ''
    },
    READ_CURSO (state, curso) {
      state.cursos.push({
        id: curso.id,
        nombre: curso.data().nombre,
        descripcion: curso.data().descripcion,
        cupos: curso.data().cupos,
        duracion: curso.data().duracion,
        estado: curso.data().estado,
        fecha: curso.data().fecha,
        img: curso.data().img,
        inscritos: curso.data().inscritos,
        costo: curso.data().costo
      })
    },
    ADD_CURSO (state, curso) {
      state.cursos.push({
        id: curso.id,
        nombre: curso.data().nombre,
        descripcion: curso.data().descripcion,
        cupos: curso.data().cupos,
        duracion: curso.data().duracion,
        estado: curso.data().estado,
        fecha: curso.data().fecha,
        img: curso.data().img,
        inscritos: curso.data().inscritos,
        costo: curso.data().costo
      })
    },
    RESET_CURSOS (state) {
      state.cursos = []
    }

  },
  actions: {
    fetchCursos ({ commit }) {
      this.state.cursos = []
      db.collection('cursos').onSnapshot(result => {
        console.log(result)
        result.forEach((doc) => {
          commit('READ_CURSO', doc)
        })
      })
    },
    // CREATE
    createCurso ({}, curso) {
      return db.collection('cursos').add(curso)
    },
    // OBTENER CURSO POR ID (UNITARIO, SÓLO UN CURSO)
    fetchIdCurso ({}, idCurso) {
      return db.collection('cursos').doc(idCurso).get()
    },
    // UPDATE
    updateCurso ({}, curso) {
      return db.collection('cursos').doc(curso.id).update(curso)
    },
    // DELETE
    deleteCurso ({}, idCurso) {
      return db.collection('cursos').doc(idCurso).delete()
    },
    setMail ({ commit }, email) {
      commit('SET_EMAIL', email)
    },
    resetEmail ({ commit }) {
      commit('RESET_EMAIL')
    }
  },
  modules: {
  }
})
