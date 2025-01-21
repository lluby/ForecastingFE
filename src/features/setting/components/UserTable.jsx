/* eslint-disable react/prop-types */
import { useState } from "react";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import UserDelete from "./UserDelete"; // Impor modal delete

const UserTable = ({ data, fetchData }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);

  const columns = [
    {
      title: "Nomor",
      key: "id",
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      title: "Username",
      dataIndex: "username", // Key sesuai dengan API
      key: "username",
    },
    {
      title: "Password",
      dataIndex: "password", // Key sesuai dengan API
      key: "password",
    },
    {
      title: "Role",
      dataIndex: "role", // Key sesuai dengan API
      key: "role",
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <div>
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


  // Handle klik tombol Delete
  const handleDelete = (id) => {
    setCurrentItemId(id); // Set ID item yang akan dihapus
    setShowDeleteModal(true); // Tampilkan modal delete
  };

  const handleCancelDelete = () => setShowDeleteModal(false);

  return (
    <div>
      {/* Tabel Pengguna */}
      <Table rowKey="id" columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />

      {/* Modal Delete User */}
      {showDeleteModal && (
        <UserDelete
          open={showDeleteModal}
          onCancel={handleCancelDelete}
          itemId={currentItemId}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default UserTable;
