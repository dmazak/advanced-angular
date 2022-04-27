using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace TodoZooApi.Controllers;

[ApiController]
public class UsersController : ControllerBase
{
    private readonly UserRepository _userRepository;

    public UsersController(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpHead("users/email")]
    public async Task<ActionResult> CheckForEmail([FromQuery][BindRequired] string email)
    {
        bool exists = await _userRepository.CheckForEmailAsync(email);
        return exists ? Ok() : NotFound();
    }

    [HttpHead("users/username")]
    public async Task<ActionResult> CheckForUserName([FromQuery][BindRequired] string userName)
    {
        bool exists = await _userRepository.CheckForUserName(userName);
        return exists ? Ok() : NotFound();
    }

    [HttpPost("users")]
    public async Task<ActionResult> OnBoardUser([FromBody] OnBoardRequest request)
    {
        await _userRepository.AddUserAsync(request);
        return StatusCode(201);
    }
}
