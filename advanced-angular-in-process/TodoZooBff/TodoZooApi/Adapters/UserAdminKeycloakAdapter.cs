using System.Text.Json;
using System.Text.Json.Serialization;
using System.Web;

namespace TodoZooApi.Adapters;

public class UserAdminKeycloakAdapter
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<UserAdminKeycloakAdapter> _logger;

    public UserAdminKeycloakAdapter(HttpClient httpClient, ILogger<UserAdminKeycloakAdapter> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }

    public async Task CreateUserAsync(UserRepresentation userRepresentation)
    {
        var token = await GetAccessToken();
        _logger.LogInformation("The Token is " + token);
        _logger.LogInformation(JsonSerializer.Serialize(userRepresentation));
        string createUrl = "/auth/admin/realms/todo-zoo/users";
        var request = new HttpRequestMessage(HttpMethod.Post, createUrl)
        {
            Content = JsonContent.Create(userRepresentation)
        };
        request.Headers.TryAddWithoutValidation("Authorization", $"Bearer {token}");
        var response = await _httpClient.SendAsync(request);

        response.EnsureSuccessStatusCode();
    }

    public async Task<bool> CheckForEmailAsync(string email)
    {
        var qParam = "email";
        var qValue = email;
        return await HandleHeadRequest(qParam, qValue);
    }
    public async Task<bool> CheckForUserNameAsync(string userName)
    {
        return await HandleHeadRequest("username", userName);
    }

    private async Task<bool> HandleHeadRequest(string qParam, string qValue)
    {
        var token = await GetAccessToken();
        string userUrl = "/auth/admin/realms/todo-zoo/users";
        var qValueEncoded = HttpUtility.UrlEncode(qValue);

        string url = $"?{qParam}={qValueEncoded}&exact=true&briefRepresentation=true";
        var request = new HttpRequestMessage(HttpMethod.Get, userUrl + url);
        request.Headers.TryAddWithoutValidation("Authorization", $"Bearer {token}");
        var response = await _httpClient.SendAsync(request);

        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();

        return content != "[]";
    }


    public async Task<string> GetAccessToken()
    {
        var tokenUrl = "/auth/realms/todo-zoo/protocol/openid-connect/token";

        //var response = await _httpClient.PostAsJsonAsync(tokenUrl, credentials);
        var request = new HttpRequestMessage(HttpMethod.Post, tokenUrl)
        {
            Content = new FormUrlEncodedContent(new List<KeyValuePair<string, string>>()
            {

               new KeyValuePair<string, string>( "client_id", "user-api"),
               new KeyValuePair<string, string>( "grant_type", "password"),
               new KeyValuePair<string, string>( "username", "Todos-bff-api" ),
               new KeyValuePair<string, string>( "password", "TokyoJoe138!" ),
            })
        };
        var response = await _httpClient.SendAsync(request);

        response.EnsureSuccessStatusCode();

        var tokenValue = await response.Content.ReadFromJsonAsync<TokenResponse>();

        return tokenValue!.access_token;
    }
}

public record TokenResponse(string access_token);

public record UserRepresentation(string email, string firstName, string lastName, string username, [property: JsonPropertyName("credentials")] List<CredentialsType> credentials, bool enabled = true);



public record CredentialsType(string type, string value, bool temporary = false);
