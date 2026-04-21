import axios from "axios";

const BASE = "http://192.168.100.67:8000/api/people";
// const BASE = " http://127.0.0.1:8000/api/people";

export const getPeople = (params) => axios.get(BASE, { params });

export const createPerson = (data) => axios.post(BASE, data);

export const updatePerson = (id, data) =>
    axios.put(`${BASE}/${id}`, data);

export const deletePerson = (id) =>
    axios.delete(`${BASE}/${id}`);