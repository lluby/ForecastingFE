/* eslint-disable react/prop-types */
import { Form, Input, message, Modal } from "antd";

const UserAdd = ({ open, onCancel, fetchData }) => {
  const onFinish = async (values) => {
    console.log("Data yang dikirim:", values);

    const data = {
      username: values.username,
      password: values.password,
      role: values.role,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Token tidak ditemukan. Silakan login ulang.");
        onCancel();
        return;
      }

      const response = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        message.success("User berhasil disimpan");
        fetchData();
        onCancel();
      } else {
        const errorData = await response.json();
        message.error(errorData.error || "Terjadi kesalahan saat menyimpan data");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Terjadi kesalahan pada koneksi");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal open={open} onCancel={onCancel} title="Add User" footer={false}>
      <div className="pt-4">
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="space-y-6"
          layout="vertical"
        >
          <div className="space-y-4">
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Username wajib diisi!",
                },
              ]}
              className="m-0"
            >
              <Input size="large" placeholder="Masukkan username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password wajib diisi!",
                },
              ]}
              className="m-0"
            >
              <Input size="large" placeholder="Masukkan password" />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Role wajib diisi!",
                },
              ]}
              className="m-0"
            >
              <Input size="large" placeholder="Masukkan role" />
            </Form.Item>
          </div>

          <Form.Item label={null} className="flex justify-end">
            <button className="bg-dark-blue-500 text-white px-6 py-2 rounded-xl w-auto tracking-widest">
              Submit
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default UserAdd;
