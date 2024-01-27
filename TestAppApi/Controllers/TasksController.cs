
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using TestAppApi.Model;
using System.Linq;

namespace TestAppApi.Controllers
{
    [Route("api/tasks")]
        [ApiController]
        public class TasksController : ControllerBase
        {
            private readonly List<Activity> tasks = new List<Activity> {
                new Activity { Id = 1, Title = "Task 1", Description = "Description for Task 1", DueDate = DateTime.Now.AddDays(1) },
                new Activity { Id = 2, Title = "Task 2", Description = "Description for Task 2", DueDate = DateTime.Now.AddDays(2) }
                };
            private readonly ApplicationDbContext _context;

            public TasksController(ApplicationDbContext context)
            {
                _context = context;
            }
            [HttpGet]
            public ActionResult<IEnumerable<Activity>> GetTasks()
            {
                //return tasks.ToList();
                return _context.Tasks.ToList();
            }

            [HttpGet("{id}")]
            public ActionResult<Activity> GetTaskById(int id)
            {
                var task = _context.Tasks.FirstOrDefault(t => t.Id == id);

                if (task == null)
                {
                    return NotFound();
                }

                return task;
            }

            [HttpPost]
            public ActionResult<Activity> CreateTask(Activity task)
            {
                //work.Id = tasks.Count + 1;
                //tasks.Add(work);
                //return CreatedAtAction(nameof(GetTasks), tasks);
                _context.Tasks.Add(task);
                _context.SaveChanges();
                return CreatedAtAction(nameof(GetTasks), _context.Tasks.ToList());
            }


            [HttpPut("{id}")]
            public IActionResult UpdateTask(int id, Activity updatedTask)
            {
                var existingTask = _context.Tasks.FirstOrDefault(t => t.Id == id);
                if (existingTask == null)
                {
                    return NotFound();
                }

                existingTask.Title = updatedTask.Title;
                existingTask.Description = updatedTask.Description;
                existingTask.DueDate = updatedTask.DueDate;

                _context.SaveChanges();
                return NoContent();
            //var existingTask = tasks.FirstOrDefault(x => x.Id == id);
            //if (existingTask == null)
            //{
            //    return NotFound();
            //}
            //existingTask.Title = updatedTask.Title;
            //existingTask.Description = updatedTask.Description;
            //existingTask.DueDate = updatedTask.DueDate;

            //return NoContent();
        }

            [HttpDelete("{id}")]
            public ActionResult<IEnumerable<Activity>> DeleteTask(int id)
            {
                var taskToRemove = _context.Tasks.FirstOrDefault(t => t.Id == id);
                if (taskToRemove == null)
                {
                    return NotFound();
                }

                _context.Tasks.Remove(taskToRemove);
                _context.SaveChanges();
                return _context.Tasks.ToList();
            //var existingTask = tasks.FirstOrDefault(x => x.Id == id);
            //if (existingTask == null)
            //{
            //    return NotFound();
            //}

            //tasks.Remove(existingTask);
            //return tasks.ToList();
        }
        }
    }

