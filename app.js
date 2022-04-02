require("colors")

const { guardarArchivo, leerDb } = require("./helpers/guardarArchivo")
const { inquirerMenu, pause, leerInput, listadoTareaBorrar, confirmar, listadoTareaChange } = require("./helpers/inquirer")
const Tareas = require("./models/tareas")



const main = async() => {

    const tareas = new Tareas()
    let opt;

    const tareasDb = leerDb()
    if ( tareasDb ) {
        tareas.cargarTareasFromArray( tareasDb )
    }

    do {
        opt = await inquirerMenu()

        switch (opt) {
            case "1":
                const desc = await leerInput( "Descripcion:" )
                tareas.crearTarea( desc )

                break;
            case "2":
                tareas.listadoCompleto()
                break;

            case "3":
                tareas.listarCompletadas()
                break;

            case "4":
                tareas.listarPendientes()
                break;

            case "5":
                const ids = await listadoTareaChange( tareas.listadoArr )
                tareas.toggleTareasIsCompleted( ids )
                break;

            case "6":
                const id = await listadoTareaBorrar( tareas.listadoArr )
                if(id !== "0") {
                    const isok = await confirmar( "¿Estas seguro?" )
                    if (isok) {
                        tareas.deleteTarea( id )
                        console.log("Tarea eliminada")
                    }
                }
                break;
            }

        guardarArchivo(tareas.listadoArr)

        if(opt !== "0") await pause()


    } while (opt !== "0");
}

main()