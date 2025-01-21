import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register komponen ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartData = () => {
  const [forecastData, setForecastData] = useState([]);
  const [bulanData, setBulanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mengambil data peramalan dari API
  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        // Mengambil token dari localStorage
        const token = localStorage.getItem("token");
  
        // Jika token tidak ada, tampilkan pesan atau tangani sesuai kebutuhan
        if (!token) {
          throw new Error("Token tidak ditemukan");
        }
  
        const response = await fetch("https://be-peramalan.vercel.app/api/forecast", {
          method: "GET", // Pastikan metode sesuai dengan API
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Menambahkan token di header
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setForecastData(data.forecast); // Menyimpan data peramalan yang diterima dari API
          setBulanData(data.bulan); // Menyimpan data bulan yang diterima dari API
        } else {
          throw new Error("Error fetching forecast data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Terjadi kesalahan dalam mengambil data peramalan.");
      } finally {
        setLoading(false); // Selesai memuat data
      }
    };
  
    fetchForecastData();
  }, []); // Efek ini dijalankan sekali setelah komponen pertama kali di-render
  
  // Menampilkan loader jika data sedang dimuat
  if (loading) {
    return <div>Loading...</div>;
  }

  // Menampilkan error jika ada kesalahan saat fetching data
  if (error) {
    return <div>{error}</div>;
  }

  // Data untuk chart (menggunakan data peramalan yang diterima dari API)
  const data = {
    labels: bulanData,  // Label bulan yang diterima dari API
    datasets: [
      {
        label: "Data Forecasting",
        data: forecastData,  // Data peramalan dari API
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-5 w-full border rounded-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartData;
