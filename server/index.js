
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors')
//2XoL4CGww3b8mZCI
//bhimmridha62
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
mongoose.connect('mongodb+srv://bhimmridha62:2XoL4CGww3b8mZCI@cluster0.pfzffae.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Task = mongoose.model('Task', { text: String });

app.post('/tasks', async (req, res) => {
  const { text } = req.body;
  console.log(text);
  try {
    const task = new Task({ text });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { text } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(taskId, { text }, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;
  try {
    await Task.findByIdAndDelete(taskId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
