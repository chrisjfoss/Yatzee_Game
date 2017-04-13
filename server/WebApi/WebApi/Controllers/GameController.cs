using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Yahtzee.Models;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json.Linq;

//https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api

namespace Yahtzee.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    public class GameController : Controller
    {
        private readonly IGameRepository _gameRepository;
        public GameController(IGameRepository gameRepository)
        {
            _gameRepository = gameRepository;
        }

        [HttpGet]
        [EnableCors("AllowAll")]
        public IEnumerable<Game> GetAll()
        {
            return _gameRepository.GetAll();
        }

        [HttpGet("{id}", Name = "GetGame")]
        [EnableCors("AllowAll")]
        public IActionResult GetById(long id)
        {
            var game = _gameRepository.Find(id);
            if(game == null)
            {
                return NotFound();
            }
            return new ObjectResult(game);
        }

        [HttpGet("incomplete")]
        [EnableCors("AllowAll")]
        public IEnumerable<Game> GetIncomplete()
        {
            return _gameRepository.GetAll().Where(t => t.IsFinished == false);
        }

        [HttpGet("complete")]
        [EnableCors("AllowAll")]
        public IEnumerable<Game> GetComplete()
        {
            return _gameRepository.GetAll().Where(t => t.IsFinished == true);
        }

        // POST api/values
        [HttpPost("{score}/{user}/{isFinished}/{id}")]
        [EnableCors("AllowAll")]
        public IActionResult Create(int score, string user, int isFinished, long id)
        {
            Game game = new Game()
            {
                Score = score,
                User = user,
                IsFinished = isFinished != 0
            };

            if(id != 0)
            {
                game.Id = id;
            }
            if (game == null)
            {
                return BadRequest();
            }
            _gameRepository.Add(game);

            return CreatedAtRoute("GetGame", new { id = game.Id }, game);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        [EnableCors("AllowAll")]
        public IActionResult Update(long id, [FromBody] Game game)
        {
            if (game == null || game.Id != id)
            {
                return BadRequest();
            }
            var todo = _gameRepository.Find(id);
            if(todo == null)
            {
                return NotFound();
            }

            todo.IsFinished = game.IsFinished;
            todo.Score = game.Score;
            todo.User = game.User;

            _gameRepository.Update(todo);
            return new NoContentResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        [EnableCors("AllowAll")]
        public IActionResult Delete(long id)
        {
            var todo = _gameRepository.Find(id);
            var test = _gameRepository.GetAll();
            if(todo == null)
            {
                return NotFound();
            }

            _gameRepository.Remove(id);
            return new NoContentResult();
        }
    }
}
