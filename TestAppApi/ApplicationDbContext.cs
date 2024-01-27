using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TestAppApi.Model;

namespace TestAppApi
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Activity> Tasks { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
