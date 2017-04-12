using System;
using System.Collections.Generic;
using System.Linq;

namespace Yahtzee.Models
{
    public class GameRepository : IGameRepository
    {
        private readonly YahtzeeContext _context;

        public GameRepository(YahtzeeContext context)
        {
            _context = context;

            if (_context.Games.Count() == 0)
            {
                Add(new Game { User = "Test" });
            }
        }

        public IEnumerable<Game> GetAll()
        {
            return _context.Games.ToList();
        }

        public void Add(Game game)
        {
            _context.Games.Add(game);
            _context.SaveChanges();
        }

        public Game Find(long id)
        {
            var game = _context.Games.FirstOrDefault<Game>(t => t.Id == id);
            return game;
        }

        public void Remove(long id)
        {
            var entity = _context.Games.FirstOrDefault<Game>(t => t.Id == id);
            _context.Games.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(Game game)
        {
            _context.Games.Update(game);
            _context.SaveChanges();
        }
    }
}
