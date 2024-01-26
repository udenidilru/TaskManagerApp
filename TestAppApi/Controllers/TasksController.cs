
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

            [HttpGet]
            public ActionResult<IEnumerable<Activity>> GetTasks()
            {
                return tasks.ToList();
            }

            [HttpPost]
            public ActionResult<Activity> CreateTask(Activity work)
            {
                work.Id = tasks.Count + 1;
                tasks.Add(work);
                return CreatedAtAction(nameof(GetTasks), tasks);
            }

            [HttpPut("{id}")]
            public IActionResult UpdateTask(int id, Activity updatedTask)
            {
                var existingTask = tasks.FirstOrDefault(x => x.Id == id);
                if (existingTask == null)
                {
                    return NotFound();
                }
                existingTask.Title = updatedTask.Title;
                existingTask.Description = updatedTask.Description;
                existingTask.DueDate = updatedTask.DueDate;

                return NoContent();
            }

            [HttpDelete("{id}")]
            public ActionResult<IEnumerable<Activity>> DeleteTask(int id)
            {
                var existingTask = tasks.FirstOrDefault(x => x.Id == id);
                if (existingTask == null)
                {
                    return NotFound();
                }

                tasks.Remove(existingTask);
                return tasks.ToList();
            }
        }
    }

