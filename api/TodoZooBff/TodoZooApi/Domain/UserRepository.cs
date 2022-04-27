namespace TodoZooApi.Domain;

public class UserRepository
{
    private readonly UserAdminKeycloakAdapter _keycloakAdapter;

    public UserRepository(UserAdminKeycloakAdapter keycloakAdapter)
    {
        _keycloakAdapter = keycloakAdapter;
    }

    public async Task<bool> CheckForEmailAsync(string email)
    {
        return await _keycloakAdapter.CheckForEmailAsync(email);
    }

    public async Task<bool> CheckForUserName(string username)
    {
        return await _keycloakAdapter.CheckForUserNameAsync(username);
    }

    public async Task AddUserAsync(OnBoardRequest request)
    {
        var credentials = new List<CredentialsType> { new CredentialsType("password", request.password, false) };
        var user = new UserRepresentation(request.email, request.firstName, request.lastName, request.userName, credentials, true);
        await _keycloakAdapter.CreateUserAsync(user);
    }
}
