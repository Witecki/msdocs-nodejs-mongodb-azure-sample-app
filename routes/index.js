var express = require('express');
var Task = require('../models/task');
var Note = require('../models/note');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Task.find()
    .then((tasks) => {      
      const currentTasks = tasks.filter(task => !task.completed);
      const completedTasks = tasks.filter(task => task.completed === true);

      console.log(`Total tasks: ${tasks.length}   Current tasks: ${currentTasks.length}    Completed tasks:  ${completedTasks.length}`)
      res.render('index', { currentTasks: currentTasks, completedTasks: completedTasks });
    })
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });

   
});


/* GET index2 page. */
router.get('/index2', function(req, res, next) {
      console.log(`get index2`)

  Note.find().sort({createDate: -1})
    .then((notes) => {      
      const Notes = notes;

      console.log(`Total notes: ${notes.length} `)
      res.render('index2', {Notes: Notes });

    })
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });

});



router.post('/addTask', function(req, res, next) {
  const taskName = req.body.taskName;
  const createDate = Date.now();
  
  var task = new Task({
    taskName: taskName,
    createDate: createDate
  });
  console.log(`Adding a new task ${taskName} - createDate ${createDate}`)

  task.save()
      .then(() => { 
        console.log(`Added new task ${taskName} - createDate ${createDate}`)        
        res.redirect('/'); })
      .catch((err) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
      });
});

router.post('/addNote', function(req, res, next) {
  const noteName = req.body.noteName;
  const createDate = Date.now();
  
  var note = new Note({
    noteName: noteName,
    createDate: createDate
  });
  console.log(`Adding a new NOTE ${noteName} - createDate ${createDate}`)

  note.save()
      .then(() => { 
        console.log(`Added new NOTE ${noteName} - createDate ${createDate}`)        
        res.redirect('/index2'); })
      .catch((err) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
      });
});

router.post('/completeTask', function(req, res, next) {
  console.log("I am in the PUT method")
  const taskId = req.body._id;
  const completedDate = Date.now();

  Task.findByIdAndUpdate(taskId, { completed: true, completedDate: Date.now()})
    .then(() => { 
      console.log(`Completed task ${taskId}`)
      res.redirect('/'); }  )
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
});


router.post('/deleteTask', function(req, res, next) {
  const taskId = req.body._id;
  const completedDate = Date.now();
  Task.findByIdAndDelete(taskId)
    .then(() => { 
      console.log(`Deleted task $(taskId)`)      
      res.redirect('/'); }  )
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
});


module.exports = router;
