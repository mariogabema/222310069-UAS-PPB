import axios from 'axios';


const API_URL = 'http://192.168.189.71:3000/api';

export const addUser = async (user) => {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};

export const getUserProfile = async (userId) => {
    const response = await axios.get(`${API_URL}/profile?userId=${userId}`);
    return response.data;
};

export const addCategory = async (category) => {
    const response = await axios.post(`${API_URL}/categories`, category);
    return response.data;
};


export const getCheatsheetsByCategory = async (categoryId) => {
    const response = await axios.get(`${API_URL}/cheatsheets?category=${categoryId}`);
    return response.data;
};

export const getCategories = async () => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
};

export const addCheatsheet = async (cheatsheet) => {
    const response = await axios.post(`${API_URL}/cheatsheets`, cheatsheet);
    return response.data;
};

export const getCheatsheetById = async (cheatsheetId) => {
    const response = await axios.get(`${API_URL}/cheatsheets/${cheatsheetId}`);
    return response.data;
};

export const editCheatsheet = async (cheatsheetId, cheatsheet) => {
    const response = await axios.put(`${API_URL}/cheatsheets/${cheatsheetId}`, cheatsheet);
    return response.data;
};

export const deleteCheatsheet = async (cheatsheetId) => {
    const response = await axios.delete(`${API_URL}/cheatsheets/${cheatsheetId}`);
    return response.data;
};