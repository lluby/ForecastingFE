/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Modal, Form, Input, message, Select } from "antd";

const MONTHS = [
  { value: "Januari", label: "Januari" },
  { value: "Februari", label: "Februari" },
  { value: "Maret", label: "Maret" },
  { value: "April", label: "April" },
  { value: "Mei", label: "Mei" },
  { value: "Juni", label: "Juni" },
  { value: "Juli", label: "Juli" },
  { value: "Agustus", label: "Agustus" },
  { value: "September", label: "September" },
  { value: "Oktober", label: "Oktober" },
  { value: "November", label: "November" },
  { value: "Desember", label: "Desember" },
];

const InventoryEdit = ({ open, onCancel, initialData, onEditSuccess, fetchData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && initialData) {
      form.setFieldsValue({
        name: initialData.name,
        quantity: Number(initialData.quantity),
        alpha: initialData.alpha,
        month: initialData.month,
      });
    }
  }, [open, initialData, form]);

  const onFinish = async (values) => {
    const payload = { ...values, quantity: Number(values.quantity) };
    console.log("Form Values yang Dikirim:", payload);

    // Mendapatkan token dari localStorage
    const token = localStorage.getItem("token"); // Pastikan token tersimpan di localStorage

    try {
      const response = await fetch(`http://localhost:3000/api/bahan-baku/${initialData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Menambahkan token ke header
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success("Data berhasil diperbarui");
        fetchData();
        form.resetFields();
        onCancel();
        if (onEditSuccess) onEditSuccess();
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Terjadi kesalahan saat memperbarui data");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Terjadi kesalahan pada koneksi");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };
  
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Edit Inventory"
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        name="edit-inventory"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nama Kulit"
          name="name"
          rules={[{ required: true, message: "Nama kulit wajib diisi!" }]}>
          <Input size="large" placeholder="Masukkan nama kulit" />
        </Form.Item>

        <div className="flex justify-between gap-4">
          <Form.Item
            label="Jumlah"
            name="quantity"
            rules={[{ required: true, message: "Jumlah wajib diisi!" }]}
            className="w-full">
            <Input type="number" size="large" placeholder="Jumlah" />
          </Form.Item>

          <Form.Item
            label="Nilai Alpha"
            name="alpha"
            rules={[{ required: true, message: "Nilai Alpha wajib diisi!" }]}
            className="w-full">
            <Input type="number" step="0.01" size="large" placeholder="Nilai Alpha" />
          </Form.Item>

          <Form.Item
            label="Bulan"
            name="month"
            rules={[{ required: true, message: "Bulan wajib diisi!" }]}
            className="w-full">
            <Select options={MONTHS} placeholder="Pilih bulan" size="large" />
          </Form.Item>
        </div>

        <Form.Item>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-dark-blue-500 text-white rounded-lg tracking-wider hover:bg-dark-blue-600">
              Submit
            </button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InventoryEdit;
