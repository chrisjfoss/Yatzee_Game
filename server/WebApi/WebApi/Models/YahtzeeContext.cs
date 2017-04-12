using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Yahtzee.Models
{
    public class YahtzeeContext : DbContext
    {
        public YahtzeeContext(DbContextOptions<YahtzeeContext> options)
            : base(options)
        {
        }

        public DbSet<Game> Games { get; set; }
    }
}
