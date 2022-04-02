const inquirer = require('inquirer');
require('colors')

const preguntas = [
    {
        type: "list",
        name: "opcion",
        message: "¿Que desea hacer?",
        choices: [
            {
                value: "1",
                name: `${ "1.".green } Crear tarea`
            },
            {
                value: "2",
                name: `${ "2.".green } Listar tareas`
            },
            {
                value: "3",
                name: `${ "3.".green } Listar tareas completadas`
            },
            {
                value: "4",
                name: `${ "4.".green } Listar tareas pendientes`
            },
            {
                value: "5",
                name: `${ "5.".green } Completar tarea(s)`
            },
            {
                value: "6",
                name: `${ "6.".green } Borrar tarea`
            },
            {
                value: "0",
                name: `${ "0.".green } Salir`
            },
        ]
    }
]


const inquirerMenu = async() => {

    console.log("==============================".green)
    console.log("   Selecciona una opción   ".white)
    console.log("==============================\n".green)

    const {opcion} = await inquirer.prompt(preguntas)

    return opcion
}

const pause = async() => {
    const pausePregunta = [
        {
            type: "input",
            message: `Presiona ${"ENTER".green} para continuar`,
            name: "pause"
        }
    ]

    console.log("\n")
    await inquirer.prompt(pausePregunta)
}

const leerInput = async( message = "" ) => {
    const question = [
        {
            name: "desc",
            type: "input",
            message,
            validate(value) {
                if(value.length === 0) {
                    return "Por favor ingrese una descripcion"
                }
                return true
            }
        }
    ]

    const {desc} = await inquirer.prompt(question)
    return desc
}

const listadoTareaBorrar = async( tareas = [] ) => {
    const choices = tareas.map((tarea, i) => {

        const index = `${i + 1}.`.green
        return {
            value: tarea.id,
            name: `${index} ${tarea.desc}`,
        }
    })

    choices.unshift({
        value: "0",
        name: "0.".green + " Cancelar"
    })

    const preguntas = [
        {
            type: "list",
            name: "id",
            message: "Borrar",
            choices
        }
    ]

    const { id } = await inquirer.prompt( preguntas )
    return id
}

const confirmar = async( message = "" ) => {
    const pregunta = [
        {
            type: "confirm",
            name: "ok",
            message
        }
    ]

    const { ok } = await inquirer.prompt( pregunta )
    return ok
}

const listadoTareaChange = async( tareas = [] ) => {
    const choices = tareas.map((tarea, i) => {

        const index = `${i + 1}.`.green
        return {
            value: tarea.id,
            name: ` ${index} ${tarea.desc}`,
            checked: tarea.completed ? true : false
        }
    })

    const preguntas = [
        {
            type: "checkbox",
            name: "ids",
            message: "Seleccione",
            choices
        }
    ]

    const { ids } = await inquirer.prompt( preguntas )
    return ids
}

module.exports = {
    inquirerMenu,
    pause,
    leerInput,
    listadoTareaBorrar,
    confirmar,
    listadoTareaChange
}