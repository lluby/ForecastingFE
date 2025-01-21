import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Pastikan axios diimpor

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { username, password } = values;

    try {
      // Kirim permintaan login ke backend
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        username,
        password,
      });

      // Ambil token dan role dari respons
      const { token, role } = response.data;

      // Simpan token dan role ke localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Tampilkan notifikasi sukses
      notification.success({
        message: "Login Berhasil!",
        description: `Selamat datang kembali, ${role}!`,
        duration: 5,
      });

      // Navigasi ke dashboard
      navigate("/dashboard", { replace: true });
    } catch (error) {
      // Tampilkan notifikasi error
      notification.error({
        message: "Login Gagal!",
        description: error.response?.data?.message || "Username atau password salah.",
        duration: 5,
      });
    }
  };

  return (
    <Form name="login" layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input
          className="text-base px-2 py-4 bg-transparent focus:bg-transparent text-black-300 border border-gray-500 placeholder:text-black-400"
          placeholder="Username"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password
          className="text-base px-2 py-4 bg-transparent focus:bg-transparent text-black-300 border border-gray-500 placeholder:text-black-400"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item label={null} className="flex justify-center">
        <Button
          size="large"
          className="bg-blue-500 text-white px-8 py-6 font-semibold tracking-widest rounded-xl"
          type="primary"
          htmlType="submit"
        >
          LOGIN
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
