const {v4: uuidv4} = require("uuid")

class Tarea {

    id = ""
    desc = ""
    completed = null

    constructor(desc) {
        this.id = uuidv4()
        this.desc = desc
        this.completed = null
    }
}

module.exports = Tarea