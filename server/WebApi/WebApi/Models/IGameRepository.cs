using System.Collections.Generic;

namespace Yahtzee.Models
{
    public interface IGameRepository
    {
        void Add(Game game);
        IEnumerable<Game> GetAll();
        Game Find(long id);
        void Remove(long id);
        void Update(Game game);
    }
}
