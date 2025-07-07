import { useEffect, useState } from 'react';
import { getMakes, getModels, getTypes } from '../services/api';
import type { Make, VehicleType, CarModel } from '../services/api';
import Select from 'react-select';

export default function CarSearchPage() {
    const [makes, setMakes] = useState<Make[]>([]);
    const [types, setTypes] = useState<VehicleType[]>([]);
    const [models, setModels] = useState<CarModel[]>([]);
    const [selectedMakeId, setSelectedMakeId] = useState<number | null>(null);
    const [year, setYear] = useState<number | ''>('');
    const [error, setError] = useState<string>('');

    const makeOptions = makes.map((make) => ({
        value: make.make_ID,
        label: make.make_Name,
    }));

    useEffect(() => {
        getMakes()
            .then((res) => setMakes(res.data))
            .catch(() => setError('Failed to load vehicle makes.'));
    }, []);

    const handleMakeSelect = async (selectedOption: { value: number; label: string } | null) => {
        if (!selectedOption) {
            setSelectedMakeId(null);
            setTypes([]);
            setModels([]);
            return;
        }

        const makeId = selectedOption.value;
        setSelectedMakeId(makeId);
        setTypes([]);
        setModels([]);

        try {
            const res = await getTypes(makeId);
            setTypes(res.data);
        } catch {
            setError('Failed to load vehicle types.');
        }
    };

    const handleSearch = async () => {
        if (!selectedMakeId || !year) {
            setError('Please select a make and enter a year.');
            return;
        }

        try {
            setError('');
            const res = await getModels(selectedMakeId, year);
            setModels(res.data);
        } catch {
            setError('Failed to load vehicle models.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Vehicle Search</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
                <label className="form-label">Make</label>
                <Select
                    options={makeOptions}
                    onChange={handleMakeSelect}
                    isClearable
                    placeholder="Search or select a make..."
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Year</label>
                <input
                    type="number"
                    className="form-control"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    min={1900}
                    max={new Date().getFullYear()}
                />
            </div>

            <button className="btn btn-primary" onClick={handleSearch}>
                Get Models
            </button>

            <div className="mt-4">
                <h5>Vehicle Types</h5>
                <ul className="list-group">
                    {types.map((type) => (
                        <li key={type.vehicleTypeId} className="list-group-item">
                            {type.vehicleTypeName}
                        </li>
                    ))}
                </ul>

                <h5 className="mt-4">Models</h5>
                <ul className="list-group">
                    {models.map((model) => (
                        <li key={model.model_ID} className="list-group-item">
                            {model.model_Name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
