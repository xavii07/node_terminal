const Tarea = require("./tarea")
const colors = require('colors')

class Tareas {

    _listado = {}

    get listadoArr() {
        const listado = []
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })
        return listado
    }

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    constructor() {
        this._listado = {}
    }

    deleteTarea( id = "" ) {
        if(this._listado[id]) {
            delete this._listado[id]
        }
    }

    crearTarea( desc = "" ) {
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    listadoCompleto() {
        let mensaje = "\n"
        this.listadoArr.forEach(({desc, completed }, index) => {
            mensaje += `${colors.green(index + 1)}. ${desc} :: ${completed ? "Completada".green : "Pendiente".red}\n`
        })
        console.log(mensaje)
    }

    listarCompletadas() {
        const completadas = this.listadoArr.filter(tarea => tarea.completed)
        let mensaje = "\n"
        completadas.forEach(({desc, completed }, index) => {
            mensaje += `${colors.green(index + 1)}. ${desc} :: ${colors.green(completed)}\n`
        })
        console.log(mensaje)
    }

    listarPendientes() {
        const pendientes = this.listadoArr.filter(tarea => !tarea.completed)
        let mensaje = "\n"
        pendientes.forEach(({desc, completed }, index) => {
            mensaje += `${colors.green(index + 1)}. ${desc} :: ${!completed &&  "Pendiente".red}\n`
        })
        console.log(mensaje)

    }

    toggleTareasIsCompleted( ids = [] ) {
        ids.forEach(id => {
            const tarea = this._listado[id]
            if(!tarea.completed) {
                tarea.completed = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completed = null
            }
        })
    }
}

module.exports = Tareas