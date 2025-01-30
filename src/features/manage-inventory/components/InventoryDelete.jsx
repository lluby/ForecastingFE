/* eslint-disable react/prop-types */
import { Modal, message } from "antd";

const InventoryDelete = ({ open, onCancel, itemId, fetchData }) => {
  console.log(itemId);

  
  const handleConfirmDelete = async () => {
    
    const token = localStorage.getItem("token"); 

    try {
      // Gunakan URL yang benar
      const response = await fetch(`https://be-peramalan.vercel.app/api/bahan-baku/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}`, 
        },
      });

      if (response.ok) {
        message.success("Item berhasil dihapus");
        fetchData();
        onCancel(); 
      } else {
        const errorData = await response.json();
        message.error(errorData.error || "Terjadi kesalahan saat menghapus item");
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
      <p>Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat dibatalkan.</p>
    </Modal>
  );
};

export default InventoryDelete;
