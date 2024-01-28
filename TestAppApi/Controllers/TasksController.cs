
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using TestAppApi.Model;
using System.Linq;
using TestAppApi.Repositories;

namespace TestAppApi.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;

        public TasksController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Activity>> GetTasks()
        {
            return await _taskRepository.GetAllTasks();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetTaskById(int id)
        {
            var task = await _taskRepository.GetTaskById(id);
            if (task == null)
            {
                return NotFound();
            }
            return task;
        }

        [HttpPost]
        public async Task<ActionResult<Activity>> CreateTask(Activity task)
        {
            var addedTask = await _taskRepository.AddTask(task);
            return CreatedAtAction(nameof(GetTaskById), new { id = addedTask.Id }, addedTask);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, Activity task)
        {
            await _taskRepository.UpdateTask(id, task);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IEnumerable<Activity>> DeleteTask(int id)
        {
            return await _taskRepository.DeleteTask(id);
        }
    }
}
