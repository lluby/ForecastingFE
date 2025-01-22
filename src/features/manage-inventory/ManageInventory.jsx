import { useEffect, useState } from "react";

import Header from "../../components/common/header/Header";
import InventoryTable from "./components/InventoryTable";
import InventoryAdd from "./components/InventoryAdd";
import { message } from "antd";

const ManageInventory = () => {
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState([]); 

  const fetchData = async () => {
    try {
      const response = await fetch("https://be-peramalan.vercel.app/api/bahan-baku");
      const result = await response.json();
      setData(result); 
    } catch (error) {
      console.log(error);
      message.error("Terjadi kesalahan saat mengambil data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 


  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="relative flex flex-col bg-white">
        <Header title="Kelola Bahan Baku" />

        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={handleShowModal}
              className="bg-dark-blue-500 text-white px-6 py-2 rounded-xl w-auto tracking-widest"
            >
              Add
            </button>
          </div>
          <InventoryTable data={data} fetchData={fetchData} />
        </div>
      </div>

      <InventoryAdd open={showModal} onCancel={handleShowModal} fetchData={fetchData} />
      
    </>
  );
};

export default ManageInventory;
