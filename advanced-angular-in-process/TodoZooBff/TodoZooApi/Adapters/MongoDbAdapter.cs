using HypertheoryApiUtils;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Events;

namespace TodoZooApi.Adapters;

public class MongoDbAdapter
{
    private readonly IMongoCollection<Todo> _todoCollection;
    private readonly ILogger<MongoDbAdapter> _logger;

    public MongoDbAdapter(ILogger<MongoDbAdapter> logger, IOptions<MongoConnectionOptions> options)
    {
        _logger = logger;
        var clientSettings = MongoClientSettings.FromConnectionString(options.Value.ConnectionString);
        if (options.Value.LogCommands)
        {
            clientSettings.ClusterConfigurator = db =>
            {
                db.Subscribe<CommandStartedEvent>(e =>
                {
                    _logger.LogInformation($"Running {e.CommandName} - the command looks like this {e.Command.ToJson()}");
                });
            };
        }

        var conn = new MongoClient(clientSettings);

        var db = conn.GetDatabase(options.Value.Database);

        _todoCollection = db.GetCollection<Todo>(options.Value.Collection);
    }

    public IMongoCollection<Todo> GetTodosCollection() => _todoCollection;
}
