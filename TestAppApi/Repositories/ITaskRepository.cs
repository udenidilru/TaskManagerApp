using System.Collections.Generic;
using System.Threading.Tasks;
using TestAppApi.Model;

namespace TestAppApi.Repositories
{
    public interface ITaskRepository
    {
        Task<IEnumerable<Activity>> GetAllTasks();
        Task<Activity> GetTaskById(int id);
        Task<Activity> AddTask(Activity task);
        Task UpdateTask(int id, Activity task);
        Task<IEnumerable<Activity>> DeleteTask(int id);
    }
}
