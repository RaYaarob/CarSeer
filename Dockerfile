# Use Linux-based .NET SDK image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["CarSeer.csproj", "./"]
RUN dotnet restore "CarSeer.csproj"
COPY . .
RUN dotnet publish "CarSeer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

# Force ASP.NET Core to listen on port 80
ENV ASPNETCORE_URLS=http://+:80

ENTRYPOINT ["dotnet", "CarSeer.dll"]
