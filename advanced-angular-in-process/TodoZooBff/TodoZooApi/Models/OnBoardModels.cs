using System.ComponentModel.DataAnnotations;

namespace TodoZooApi.Models;


public record OnBoardRequest([Required] string firstName, [Required] string lastName, [Required] string email, [Required] string userName, [Required] string password);
