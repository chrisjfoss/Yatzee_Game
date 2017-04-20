using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.Formatters.Json;
using Newtonsoft.Json.Linq;

namespace Yahtzee.Models
{
    public class Game
    {
        public Game()
        {
            Score = 0;
            User = "";
            IsFinished = false;

            NumberOfRolls = 0;

            Aces = -1;
            Twos = -1;
            Threes = -1;
            Fours = -1;
            Fives = -1;
            Sixes = -1;

            ThreeOfAKind = -1;
            FourOfAKind = -1;
            FullHouse = -1;
            SmallStraight = -1;
            LargeStraight = -1;
            Yahtzee = -1;
            Chance = -1;

            Date = DateTime.Now;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public int Score { get; set; }
        public string User { get; set; }
        public bool IsFinished { get; set; }

        public int NumberOfRolls { get; set; }

        public int Aces { get; set; }
        public int Twos { get; set; }
        public int Threes { get; set; }
        public int Fours { get; set; }
        public int Fives { get; set; }
        public int Sixes { get; set; }

        public int ThreeOfAKind { get; set; }
        public int FourOfAKind { get; set; }
        public int FullHouse { get; set; }
        public int SmallStraight { get; set; }
        public int LargeStraight { get; set; }
        public int Yahtzee { get; set; }
        public int Chance { get; set; }
        public DateTime Date { get; set; }
    }
}
