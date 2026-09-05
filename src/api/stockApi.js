import { get } from '../utils/apiHelper';

export async function getProdukLog(type, start, end) {
  const params = new URLSearchParams();

  if (start && end) {
    params.append('startDate', start);
    params.append('endDate', end);
  }
  
  if (type) {
    params.append('type', type);
  }

  const queryString = params.toString();
  
  
  const url = queryString ? `/stock?${queryString}` : '/stock';

  try {
    const response = await get(url);
    console.log(response.data)
    if (response?.status === true) {
      return response.data;
    }

    return {
      message: response?.message || 'Gagal mengambil data produk log',
      status: false
    };
  } catch (error) {
    return {
      message: error.message || 'Terjadi kesalahan pada server',
      status: false
    };
  }
}