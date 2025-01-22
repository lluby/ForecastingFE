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

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          throw new Error("Token tidak ditemukan");
        }
  
        const response = await fetch("https://be-peramalan.vercel.app/api/forecast", {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setForecastData(data.forecast); 
          setBulanData(data.bulan); 
        } else {
          throw new Error("Error fetching forecast data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Terjadi kesalahan dalam mengambil data peramalan.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchForecastData();
  }, []); 
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const data = {
    labels: bulanData,  
    datasets: [
      {
        label: "Data Forecasting",
        data: forecastData,  
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
