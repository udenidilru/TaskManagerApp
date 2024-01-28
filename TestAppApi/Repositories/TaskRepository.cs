using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestAppApi.Model;

namespace TestAppApi.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public TaskRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<IEnumerable<Activity>> GetAllTasks()
        {
            return await _dbContext.Tasks.ToListAsync();
        }

        public async Task<Activity> GetTaskById(int id)
        {
            return await _dbContext.Tasks.FindAsync(id);
        }

        public async Task<Activity> AddTask(Activity task)
        {
            _dbContext.Tasks.Add(task);
            await _dbContext.SaveChangesAsync();
            return task;
        }

        public async Task UpdateTask(int id, Activity updatedTask)
        {
            var existingTask = await _dbContext.Tasks.FindAsync(id);
            if (existingTask != null)
            {
                existingTask.Title = updatedTask.Title;
                existingTask.Description = updatedTask.Description;
                existingTask.DueDate = updatedTask.DueDate;
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Activity>> DeleteTask(int id)
        {
            var task = await _dbContext.Tasks.FindAsync(id);
            if (task != null)
            {
                _dbContext.Tasks.Remove(task);
                await _dbContext.SaveChangesAsync();
            }
            return await _dbContext.Tasks.ToListAsync();
        }
    }
}
