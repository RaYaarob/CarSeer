// src/services/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export interface Make {
    make_ID: number;
    make_Name: string;
}


export interface VehicleType {
    vehicleTypeId: number;
    vehicleTypeName: string;
}

export interface CarModel {
    make_ID: number;
    make_Name: string;
    model_ID: number;
    model_Name: string;
}

export const getMakes = () => api.get<Make[]>('/makes');
export const getTypes = (makeId: number) => api.get<VehicleType[]>(`/types/${makeId}`);
export const getModels = (makeId: number, year: number) =>
    api.get<CarModel[]>(`/models?makeId=${makeId}&year=${year}`);

