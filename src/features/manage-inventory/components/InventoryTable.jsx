/* eslint-disable react/prop-types */
import { useState } from "react";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import InventoryEdit from "./InventoryEdit"; // Impor modal edit
import InventoryDelete from "./InventoryDelete"; // Impor modal delete

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
      dataIndex: "alpha", // Gunakan key yang benar dari API
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

  // Handle klik tombol Edit
  const handleEdit = (record) => {
    setEditData(record); // Set data yang akan diedit
    setShowEditModal(true); // Tampilkan modal edit
  };

  // Handle klik tombol Delete
  const handleDelete = (id) => {
    setCurrentItemId(id); // Set ID item yang akan dihapus
    setShowDeleteModal(true); // Tampilkan modal delete
  };


  // Handle pembatalan modal edit dan delete
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
