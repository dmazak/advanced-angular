using HypertheoryApiUtils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using TodoZooApi.Hubs;

namespace TodoZooApi.Controllers;

[Route("todos")]
[ApiController]
[Authorize]
public class TodosController : ControllerBase
{
    private readonly TodoRepository _todoRepository;
    private readonly IHubContext<TodosHub> _hub;

    public TodosController(TodoRepository todoRepository, IHubContext<TodosHub> hub)
    {
        _todoRepository = todoRepository;
        _hub = hub;
    }

    [HttpGet]
    public async Task<IActionResult> GetTodos()
    {
        var sub = User.GetSub();
        var data = await _todoRepository.GetTodosForUserAsync(sub!);
        
        return Ok(new { data });
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] TodosRequestModel todo)
    {
        var sub = User.GetSub()!;
        var email = User.GetClaimFrom("email");
        TodosResponseModel response = await _todoRepository.AddTodoAsync(todo, sub);
        await SendWsMessage("itemAdded", response);
        return StatusCode(201, response);
    }
    [HttpPost("completed")]
    public async Task<ActionResult> CompleteItem([FromBody] TodosResponseModel request)
    {
        var sub = User.GetSub()!;
        TodosUpdateType response = await _todoRepository.MarkTodoCompleteAsync(request, sub);
        var result = request with { completed = true };
        await SendWsMessage("itemCompleted", result);
        return response switch
        {
            TodosUpdateType.Success => NoContent(),
            TodosUpdateType.Forbidden => StatusCode(403),
            TodosUpdateType.NotFound => NotFound(),
            _ => StatusCode(500, "Wasn't Expecting THAT")
        };
    }

    [HttpDelete("completed")]
    public async Task<ActionResult> RemoveCompletedTodos()
    {
        var sub = User.GetSub()!;
        await _todoRepository.RemoveCompletedTodosForUserAsync(sub);
        return NoContent();
    }
    private async Task SendWsMessage<T>(string message, T response)
    {
        var email = User.GetClaimFrom("email")!;
        await _hub.Clients.All.SendAsync(message, new WsResponse<T>(email, response));
    }

    public record WsResponse<T>(string email, T message);
}
