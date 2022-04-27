using HypertheoryApiUtils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SignalR;
using Microsoft.OpenApi.Models;
using TodoZooApi.Hubs;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
builder.Services.AddSingleton<IUserIdProvider, SubBasedIdProvider>();
// Add services to the container.
builder.Services.AddScoped<UserRepository>();
builder.Services.AddHttpClient<UserAdminKeycloakAdapter>(client =>
{
    client.BaseAddress = new Uri("http://auth.todo-zoo.com/");
});

builder.Services.Configure<MongoConnectionOptions>(builder.Configuration.GetSection(MongoConnectionOptions.SectionName));
builder.Services.AddSingleton<MongoDbAdapter>();
builder.Services.AddScoped<TodoRepository>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var audience = builder.Configuration.GetValue<string>("protectedAuthSettings:audience");
var authority = builder.Configuration.GetValue<string>("protectedAuthSettings:authority");
var realm = builder.Configuration.GetValue<string>("protectedAuthSettings:realm");

builder.Services.AddAuthForKeycloak(authority, audience, builder.Environment.IsDevelopment());
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swagger =>
{
    swagger.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.OAuth2,
        Flows = new OpenApiOAuthFlows
        {
            Implicit = new OpenApiOAuthFlow
            {
                AuthorizationUrl = new Uri($"{authority}/protocol/openid-connect/auth")
            }
        },
        In = ParameterLocation.Header,
        Scheme = JwtBearerDefaults.AuthenticationScheme
    });

    swagger.AddSecurityRequirement(new OpenApiSecurityRequirement {
    {
        new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference
            {
                Type = ReferenceType.SecurityScheme,
                Id = JwtBearerDefaults.AuthenticationScheme
            }
        },
        new string[] { }
    }
   });

});
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(cors =>
    {
        cors.AddDefaultPolicy(pol =>
        {
            pol.WithOrigins("http://localhost:4200");
            pol.AllowAnyHeader();
            pol.AllowCredentials();
            pol.AllowAnyMethod();

        });
    });
}

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.OAuthClientId(audience);
        c.OAuthRealm(realm);
    });
    app.UseCors();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<TodosHub>("/todos-hub");

app.Run();
