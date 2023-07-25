const  mongoose  = require("mongoose")

const taskSchema = new mongoose.Schema({taskName: {type: String, required:true},complete:{type: Boolean}})
const tasksModel = mongoose.model("taskModel", taskSchema)

module.exports = tasksModel;