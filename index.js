const express = require("express");
const app = express();
const port = 3000;
const connectDb = require("./db");
const tasksModel = require("./tasksmodel")

connectDb();
app.use(express.json());

app.get("/", (req, res)=>{
res.send("felicitaciones vas bien")
});

app.post("/task", async (req, res) => {
  try {
    const { taskName } = req.body;
    await connectDb();

    if (!taskName) {
      console.log(taskName);
      return res.send("No hay nada");
    } else {
      await connectDb();
      const task = { taskName, complete: false };
      const newTask = await tasksModel.create(task);
      console.log(newTask);
      return res.send({ message: "Tarea agregada", tarea: newTask });
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return res.status(500).send("Error en el servidor");
  }
});

app.get("/task", async (req, res) => {
  try {
    await connectDb();
    const tasks = await tasksModel.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener las tareas." });
  }
});

app.put("/task/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const { taskName, complete } = req.body;

  try {
    await connectDb();
    const taskToUpdate = await tasksModel.findByIdAndUpdate(
      taskId,
      { taskName, complete },
      { new: true }
    );

    if (!taskToUpdate) {
      res.status(404).send({ message: "Tarea no encontrada." });
    } else {
      res.send({ message: "Tarea actualizada", tarea: taskToUpdate });
    }
  } catch (error) {
    res.status(500).send({ message: "Error al actualizar la tarea." });
  }
});

app.delete("/task/:taskId", async (req, res) => {
  const { taskId } = req.params;

  try {
    await connectDb();
    const deletedTask = await tasksModel.findByIdAndDelete(taskId);

    if (!deletedTask) {
      res.status(404).send({ message: "Tarea no encontrada." });
    } else {
      res.send({ message: "Tarea eliminada", tarea: deletedTask });
    }
  } catch (error) {
    res.status(500).send({ message: "Error al eliminar la tarea." });
  }
});

app.listen(port, () => {
    console.log("servidor corriendo")
})