/* eslint-disable react/prop-types */
import { Modal, message } from "antd";

const UserDelete = ({ open, onCancel, itemId, fetchData }) => {
  console.log(itemId); 
  
  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Token tidak ditemukan. Silakan login ulang.");
        onCancel();
        return;
      }

      const response = await fetch(`https://be-peramalan.vercel.app/api/user/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}`, 
        },
      });

      if (response.ok) {
        message.success("User berhasil dihapus");
        fetchData(); 
        onCancel(); 
      } else {
        const errorData = await response.json();
        message.error(errorData.error || "Terjadi kesalahan saat menghapus user");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Terjadi kesalahan pada koneksi");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Konfirmasi Hapus"
      okText="Hapus"
      cancelText="Batal"
      onOk={handleConfirmDelete} 
    >
      <p>Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak dapat dibatalkan.</p>
    </Modal>
  );
};

export default UserDelete;
