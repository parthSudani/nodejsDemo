const express = require('express');
const mongoose = require('mongoose');
const app = express();

/**
 * Connect to MongoDB
 */
mongoose.connect('mongodb://localhost/office-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


/**
 * Routes for creating users, projects, tasks, and performing other operations
 */
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');

app.use(express.json());

/**
 * Mount the routers
 */
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);

/**
 * Start the server
 */
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
