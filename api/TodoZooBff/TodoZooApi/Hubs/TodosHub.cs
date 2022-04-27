using HypertheoryApiUtils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace TodoZooApi.Hubs;


public class TodosHub : Hub
{
  
    //public async Task SendItemCompleted(string sub, TodosResponseModel model) => await Clients.User(sub).ItemCompleted(model);

    //public async Task SendCompletedItemsRemoved(string sub, List<string> ids) => await Clients.User(sub).CompletedItemsRemoved(ids);
}

public interface TodosMessages
{
    Task ItemAdded(TodosResponseModel model);
    Task ItemCompleted(TodosResponseModel model);

    Task CompletedItemsRemoved(List<string> ids);
}

public class SubBasedIdProvider : IUserIdProvider
{
    public string? GetUserId(HubConnectionContext connection)
    {
        return connection?.User.GetSub();
    }
}
