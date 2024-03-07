const apiUrl = process.env.REACT_APP_API_URL;

// Fungsi untuk mencari NIK
export const searchByNIK = async (nik) => {
  try {
    const response = await fetch(`${apiUrl}/users/nik/${nik}`);
    const data = await response.json(); // Coba untuk mengambil data JSON

    // Jika tidak ada kesalahan saat mengambil data JSON
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'Data tidak ditemukan' }; // Menggunakan pesan dari server jika ada
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return { success: false, error: 'Terjadi kesalahan saat memproses permintaan' };
  }
};

// Fungsi untuk mencari kandidat berdasarkan ID
export const searchByID = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/users/${id}`);
      const data = await response.json(); // Mengambil data JSON dari respons
  
      // Jika respons berhasil
      if (response.ok) {
        return { success: true, data: data.data }; // Mengembalikan data kandidat dari properti "data"
      } else {
        return { success: false, error: data.message || 'Data tidak ditemukan' }; // Menggunakan pesan dari server jika ada
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return { success: false, error: 'Terjadi kesalahan saat memproses permintaan' };
    }
  };

export const getCandidates = async () => {
    try {
      const response = await fetch(`${apiUrl}/candidates`);
      const data = await response.json();
  
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message || 'Gagal mendapatkan data kandidat' };
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return { success: false, error: 'Terjadi kesalahan saat memproses permintaan' };
    }
  };