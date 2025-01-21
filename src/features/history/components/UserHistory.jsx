import { useEffect, useState } from 'react';
import { List, Spin, Alert } from 'antd';

const UserHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token tidak ditemukan. Silakan login ulang.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/history", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(errorDetails.message || "Gagal mengambil data riwayat");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.message.includes("Failed to fetch")) {
          setError("Tidak dapat terhubung ke server. Pastikan server backend berjalan.");
        } else {
          setError(err.message || "Terjadi kesalahan saat mengambil data riwayat");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          closable
          style={{ marginBottom: 16 }}
        />
      )}
      <Spin spinning={loading}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<strong>{item.action}</strong>}
                description={item.deskripsi || `Dilakukan pada ${item.createdAt}`}
              />
            </List.Item>
          )}
        />
      </Spin>
    </div>
  );
};

export default UserHistory;
