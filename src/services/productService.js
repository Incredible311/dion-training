import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export const getProducts = async (page = 1) => {
  const response = await axios.get(`${API_URL}?page=${page}&limit=16`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

export const updateProduct = async (product) => {
  const response = await axios.put(`${API_URL}/${product.id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
