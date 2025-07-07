using CarSeer.Models;

namespace CarSeer.Services
{
    public class VehicleApiService
    {
        private readonly HttpClient _httpClient;

        public VehicleApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<MakeData>?> GetAllMakesAsync()
        {
            var response = await _httpClient.GetFromJsonAsync<ApiResponse<List<MakeData>>>("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json");
            return response?.Results;
        }

        public async Task<List<VehicleTypeData>?> GetVehicleTypesForMakeIdAsync(int makeId)
        {
            var url = $"https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/{makeId}?format=json";
            var response = await _httpClient.GetFromJsonAsync<ApiResponse<List<VehicleTypeData>>>(url);
            return response?.Results;
        }

        public async Task<List<CarModelData>?> GetModelsByMakeYearTypeAsync(int makeId, int year)
        {
            var url = $"https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json";
            var response = await _httpClient.GetFromJsonAsync<ApiResponse<List<CarModelData>>>(url);
            return response?.Results;
        }
    }

    public class ApiResponse<T>
    {
        public int Count { get; set; }
        public  string? Message { get; set; }
        public  string? SearchCriteria { get; set; }
        public  T? Results { get; set; }
    }

}