using CarSeer.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarSeer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleController : ControllerBase
    {
        private readonly VehicleApiService _service;

        public VehicleController(VehicleApiService service)
        {
            _service = service;
        }

        [HttpGet("makes")]
        public async Task<IActionResult> GetMakes()
        {
            var makes = await _service.GetAllMakesAsync();
            return Ok(makes);
        }

        [HttpGet("types/{makeId}")]
        public async Task<IActionResult> GetTypes(int makeId)
        {
            var types = await _service.GetVehicleTypesForMakeIdAsync(makeId);
            return Ok(types);
        }

        [HttpGet("models")]
        public async Task<IActionResult> GetModels([FromQuery] int makeId, [FromQuery] int year)
        {
            var models = await _service.GetModelsByMakeYearTypeAsync(makeId, year);
            return Ok(models);
        }
    }
}
