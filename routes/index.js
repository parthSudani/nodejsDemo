const usersRouter = require('./users');
const projectsRouter = require('./projects');
const tasksRouter = require('./tasks');

app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);
