/* eslint-disable react/prop-types */
import { useState } from "react";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import InventoryEdit from "./InventoryEdit"; 
import InventoryDelete from "./InventoryDelete"; 

const InventoryTable = ({data, fetchData}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [editData, setEditData] = useState(null);
  
  
  const columns = [
    {
      title: "Nomor",
      key: "id",
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      title: "Nama Kulit",
      dataIndex: "name", // Key sesuai dengan API
      key: "name",
    },
    {
      title: "Jumlah",
      dataIndex: "quantity", // Key sesuai dengan API
      key: "quantity",
    },
    {
      title: "Nilai Alpha",
      dataIndex: "alpha", // Key sesuai dari API
      key: "alpha",
    },
    {
      title: "Bulan",
      dataIndex: "month", // Key sesuai dengan API
      key: "month",
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <div>
          {/* Tombol Edit */}
          <button
            onClick={() => handleEdit(record)}
            className="text-green-500 text-xl"
          >
            <EditOutlined />
          </button>
          {/* Tombol Delete */}
          <button
            onClick={() => handleDelete(record.id)}
            className="text-red-500 text-xl ml-2"
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (record) => {
    console.log({ record })
    setEditData(record); 
    setShowEditModal(true); 
  };

  const handleDelete = (id) => {
    console.log(id);
    setCurrentItemId(id); 
    setShowDeleteModal(true); 
  };


  const handleCancelEdit = () => setShowEditModal(false);
  const handleCancelDelete = () => setShowDeleteModal(false);

  return (
    <div>
      {/* Tabel Inventaris */}
      <Table rowKey="id" columns={columns} dataSource={data} pagination={{ pageSize: 12 }} />

      {/* Modal Edit Inventory */}
      {showEditModal && (
        <InventoryEdit
          open={showEditModal}
          onCancel={handleCancelEdit}
          initialData={editData}
          fetchData={fetchData}
        />
      )}

      {/* Modal Delete Inventory */}
      {showDeleteModal && (
        <InventoryDelete
          open={showDeleteModal}
          onCancel={handleCancelDelete}
          itemId={currentItemId}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default InventoryTable;
