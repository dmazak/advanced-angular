using MongoDB.Bson;
using MongoDB.Driver;

namespace TodoZooApi.Domain;

public class TodoRepository
{
    private readonly MongoDbAdapter _mongoDbAdapter;

    public TodoRepository(MongoDbAdapter mongoDbAdapter)
    {
        _mongoDbAdapter = mongoDbAdapter;
    }

    public async Task<List<TodosResponseModel>> GetTodosForUserAsync(string sub)
    {
        var projection = Builders<Todo>.Projection.Expression(todo => new TodosResponseModel(todo.Id.ToString(), todo.Description, todo.Completed));
        var filter = Builders<Todo>.Filter.Where(todo => todo.Sub == sub);

        var response = await _mongoDbAdapter.GetTodosCollection().Find(filter).Project(projection).ToListAsync();
        return response;
    }

    public  async Task<TodosResponseModel> AddTodoAsync(TodosRequestModel todo, string sub)
    {
        var todoToAdd = new Todo
        {
            Description = todo.description,
            Completed = false,
            Sub = sub
        };

        await _mongoDbAdapter.GetTodosCollection().InsertOneAsync(todoToAdd);
        return new TodosResponseModel(todoToAdd.Id.ToString(), todoToAdd.Description, todoToAdd.Completed);
    }

    public async Task<TodosUpdateType> MarkTodoCompleteAsync(TodosResponseModel request, string sub)
    {
        var projection = Builders<Todo>.Projection.Expression(todo => new TodosResponseModel(todo.Id.ToString(), todo.Description, todo.Completed));
        var id = ObjectId.Parse(request.id);
        var filter = Builders<Todo>.Filter.Where(todo => todo.Sub == sub && todo.Id == id);

        var todo = await _mongoDbAdapter.GetTodosCollection().Find(filter).SingleOrDefaultAsync();
        if (todo == null)
        {
            return TodosUpdateType.NotFound;
        }

        if (todo.Sub != sub)
        {
            return TodosUpdateType.Forbidden;
        }

        todo.Completed = true;
        var updateDefinition = Builders<Todo>.Update.Set(f => f.Completed, true);
        var result = await _mongoDbAdapter.GetTodosCollection().UpdateOneAsync(filter, updateDefinition);
        return result.MatchedCount == 1 ? TodosUpdateType.Success : TodosUpdateType.NotFound;

       
    }

    public async Task RemoveCompletedTodosForUserAsync(string sub)
    {
        var filter = Builders<Todo>.Filter.Where(todo => todo.Sub == sub);
        await _mongoDbAdapter.GetTodosCollection().DeleteManyAsync(filter);
    }
}
