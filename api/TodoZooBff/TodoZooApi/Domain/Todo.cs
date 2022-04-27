using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TodoZooApi.Domain;

[BsonIgnoreExtraElements]
public class Todo
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public ObjectId Id { get; set; }

    [BsonElement("description")]
    public string Description { get; set; } = string.Empty;

    [BsonElement("completed")]
    public bool Completed { get; set; } = false;

    [BsonElement("sub")]
    public string Sub { get; set; } = string.Empty;
}
