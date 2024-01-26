﻿using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TaskManagerApp.Model;

namespace TaskManagerApp.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TasksController: ControllerBase
    {
        private readonly List<Work> tasks = new List<Work> {
        new Work { Id = 1, Title = "Task 1", Description = "Description for Task 1", DueDate = DateTime.Now.AddDays(1) },
        new Work { Id = 2, Title = "Task 2", Description = "Description for Task 2", DueDate = DateTime.Now.AddDays(2) }
        };

        [HttpGet] 
        public ActionResult<IEnumerable<Work>> GetTasks()
        {
            return tasks.ToList();
        }

        [HttpPost]
        public ActionResult<Work> CreateTask(Work work)
        {
            work.Id = tasks.Count + 1;
            tasks.Add(work);
            return CreatedAtAction(nameof(GetTasks), tasks);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, Work updatedTask)
        {
            var existingTask = tasks.FirstOrDefault(x => x.Id == id);
            if(existingTask == null)
            {
                return NotFound();
            }
            existingTask.Title = updatedTask.Title;
            existingTask.Description = updatedTask.Description;
            existingTask.DueDate = updatedTask.DueDate;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult<IEnumerable<Work>> DeleteTask(int id)
        {
            var existingTask = tasks.FirstOrDefault(x => x.Id==id);
            if(existingTask == null)
            {
                return NotFound();
            }

            tasks.Remove(existingTask);
            return tasks.ToList();
        }
    }
}