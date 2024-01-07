import React, { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    if (newTask.trim() !== '') {
      try {
        await axios.post('http://localhost:5000/tasks', { text: newTask });
        setNewTask('');
        fetchTasks(); 
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleEditTask = async (taskId, newText) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${taskId}`, { text: newText });
      fetchTasks(); 
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      fetchTasks(); 
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>
          <span>Bhim </span> Todo list
        </h1>
        <form id="new-task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            name="new-task-input"
            id="new-task-input"
            placeholder="What do you have planned?"
            value={newTask}
            onChange={handleInputChange}
          />
          <input type="submit" id="new-task-submit" value="Add task" />
        </form>
      </header>
      <main>
        <section className="task-list">
          <h2>Tasks</h2>
          <div id="tasks">
            {tasks.map((task) => (
              <div className="task" key={task._id}>
                <div className="content">
                  <input
                    type="text"
                    className="text"
                    value={task.text}
                    readOnly
                  />
                </div>
                <div className="actions">
                  <button
                    className="edit"
                    onClick={() => {
                      const newText = prompt('Edit the task:', task.text);
                      if (newText !== null) {
                        handleEditTask(task._id, newText);
                      }
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
