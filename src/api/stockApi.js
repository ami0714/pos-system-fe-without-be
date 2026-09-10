import { get,post,put } from '../utils/apiHelper';

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

export async function stockMovement(payload, type, productId) {

  const url = type == 'IN' ?`/stock/in/${productId}?type=${type}` : `/stock/adjust/${productId}?type=${type}`;


try{
const response = await put(url, payload);
  if (response?.status === true) {
    return response.message || 'Stock movement successful';
  }

  return {
    message: response?.message || 'Gagal melakukan stock movement',
    status: false
  };


}catch(error){
  return {
    message: error.message || 'Terjadi kesalahan pada server',
    status: false
  };

}

}



