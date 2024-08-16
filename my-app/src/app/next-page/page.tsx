"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale
);

interface StockData {
  Symbol: string;
  Company_Name: string;
  Current: number;
  Current_Date: string;
  Currency: string;
  Today_Open: number;
  Today_Change: number;
  "1_Week_Change": number;
  "1_Month_Change": number;
  "1_Year_Change": number;
  "1_Week_Back_Date": string;
  "1_Month_Back_Date": string;
  "1_Year_Back_Date": string;
  Today_High: number;
  Today_Low: number;
  Weekly_Low: number;
  Weekly_High: number;
  Monthly_Low: number;
  Monthly_High: number;
  Yearly_Low: number;
  Yearly_High: number;
}

async function fetchStockData(): Promise<StockData[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/run-sqlonly3/?t=${new Date().getTime()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch stock data');
  }
  return response.json();
}

function getChangeColor(value: number) {
  return value >= 0 ? 'text-green-500' : 'text-red-500';
}

const CollapsibleRow = ({ stock, isOpen, onToggle }: { stock: StockData; isOpen: boolean; onToggle: () => void }) => (
  <>
    <tr onClick={onToggle} className={`cursor-pointer ${isOpen ? 'bg-gray-100' : 'bg-white'}`}>
      <td className="p-2">{stock.Company_Name}</td>
      <td className="p-2">{stock.Current.toFixed(2)}</td>
      <td className="p-2">{stock.Currency}</td>
    </tr>
    {isOpen && (
      <tr className="bg-gray-50">
        <td colSpan={3} className="p-4">
          <table className="w-full">
            <tbody>
              {Object.entries({
                Symbol: stock.Symbol,
                "Company Name": stock.Company_Name,
                Current: stock.Current.toFixed(2),
                "Current Date": stock.Current_Date,
                Currency: stock.Currency,
                "Today Open": stock.Today_Open.toFixed(2),
                "Today Change": `${stock.Today_Change.toFixed(2)}%`,
                "1 Week Change": `${stock["1_Week_Change"].toFixed(2)}%`,
                "1 Month Change": `${stock["1_Month_Change"].toFixed(2)}%`,
                "1 Year Change": `${stock["1_Year_Change"].toFixed(2)}%`,
                "Today High": stock.Today_High.toFixed(2),
                "Today Low": stock.Today_Low.toFixed(2),
                "Weekly Low": stock.Weekly_Low.toFixed(2),
                "Weekly High": stock.Weekly_High.toFixed(2),
                "Monthly Low": stock.Monthly_Low.toFixed(2),
                "Monthly High": stock.Monthly_High.toFixed(2),
                "Yearly Low": stock.Yearly_Low.toFixed(2),
                "Yearly High": stock.Yearly_High.toFixed(2),
              }).map(([label, value]) => (
                <tr key={label}>
                  <td className="p-2 font-bold">{label}:</td>
                  <td className={`p-2 ${label.includes("Change") ? getChangeColor(parseFloat(value)) : ''} font-bold`}>
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr>
    )}
  </>
);

const LineChartComponent = ({ data }: { data: StockData[] }) => {
  const lineChartData = {
    labels: data.map(item => item.Symbol),
    datasets: [
      {
        label: 'Today Change',
        data: data.map(item => item.Today_Change),
        borderColor: 'rgba(75, 192, 192, 0.9)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        type: 'line',
      },
      {
        label: '1 Week Change',
        data: data.map(item => item["1_Week_Change"]),
        borderColor: 'rgba(255, 159, 64, 0.9)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        type: 'line',
      },
      {
        label: '1 Month Change',
        data: data.map(item => item["1_Month_Change"]),
        borderColor: 'rgba(153, 102, 255, 0.9)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        type: 'line',
      },
      {
        label: '1 Year Change',
        data: data.map(item => item["1_Year_Change"]),
        borderColor: 'rgba(255, 99, 132, 0.9)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        type: 'line',
      },
    ],
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Stock Performance Over Time (Line Chart)</h3>
      <Line data={lineChartData} />
    </div>
  );
};

const BarChartComponent = ({ data }: { data: StockData[] }) => {
  const barChartData = {
    labels: data.map(item => item.Symbol),
    datasets: [
      {
        label: 'Today Change',
        data: data.map(item => item.Today_Change),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: '1 Week Change',
        data: data.map(item => item["1_Week_Change"]),
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: '1 Month Change',
        data: data.map(item => item["1_Month_Change"]),
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: '1 Year Change',
        data: data.map(item => item["1_Year_Change"]),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Stock Performance Over Time (Bar Chart)</h3>
      <Bar data={barChartData} />
    </div>
  );
};

export default function StockPage() {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [openRows, setOpenRows] = useState<Set<number>>(new Set());
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      fetchStockData()
        .then(data => {
          setStockData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching stock data:', err);
          setError('Failed to fetch stock data');
          setLoading(false);
        });
    }
  }, [router]);

  const toggleRow = (index: number) => {
    setOpenRows(prev => {
      const newOpenRows = new Set(prev);
      newOpenRows.has(index) ? newOpenRows.delete(index) : newOpenRows.add(index);
      return newOpenRows;
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Stock Data</h2>
      <table className="w-full border border-gray-200">
        <thead>
          <tr>
            <th className="p-2 border-b text-left">Company Name</th>
            <th className="p-2 border-b text-left">Current Price</th>
            <th className="p-2 border-b text-left">Currency</th>
          </tr>

        </thead>
        <tbody>
          {stockData.map((stock, index) => (
            <CollapsibleRow
              key={index}
              stock={stock}
              isOpen={openRows.has(index)}
              onToggle={() => toggleRow(index)}
            />
          ))}
        </tbody>
      </table>
      <BarChartComponent data={stockData} />
      <LineChartComponent data={stockData} />
    </div>
  );
}

