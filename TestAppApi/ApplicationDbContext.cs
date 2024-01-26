using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace TestAppApi
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Task> Tasks { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
