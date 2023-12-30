const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Database connection
const db = 'mongodb://127.0.0.1:27017/todolist';

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Db connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

connectDB();

// Schema and Model
const DataSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
  }
});
const Data = mongoose.model('data', DataSchema);

// Controllers
const getAllData = (req, res) => {
  Data.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ message: 'Data not found', error: err.message }));
};

const postCreateData = (req, res) => {
    console.log(req.body);
  Data.create(req.body)
    .then((data) => res.json({ message: 'Data added successfully', data }))
    .catch((err) => res.status(404).json({ message: 'Failed to add data', error: err.message }));
};

const deleteData = (req, res) => {
  Data.findByIdAndRemove(req.params.id, req.body)
    .then((data) => res.json({ message: 'Data deleted successfully', data }))
    .catch((err) => res.status(404).json({ message: 'Failed to delete data', error: err.message }));
};

// Routes
const router = express.Router();
router.get("/", getAllData);
router.post("/", postCreateData);
router.delete("/:id", deleteData);

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use("/", (req, res) => res.send("Server is running"));
app.use('/api/data', router);

// Setting up port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
