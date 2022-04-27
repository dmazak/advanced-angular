using System.ComponentModel.DataAnnotations;

namespace TodoZooApi.Models;

public record TodosResponseModel(string id, string description, bool completed);

public record TodosRequestModel([Required]string description);

public enum TodosUpdateType {  Success, NotFound, Forbidden };
