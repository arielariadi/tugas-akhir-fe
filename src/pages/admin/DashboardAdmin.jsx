/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import dashboardAdminService from '../../services/admin/dashboardAdmin.service';

import Chart from 'chart.js/auto';
import { useRef } from 'react';

import '../../styles/admin/dashboard-admin.css';

const DashboardAdmin = () => {
	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const dashboardData = await dashboardAdminService();
				const sortedData = dashboardData.data.sort((a, b) => {
					// Mengurutkan berdasarkan golongan darah
					return a.GolDarah.gol_darah.localeCompare(b.GolDarah.gol_darah);
				});

				const formattedData = sortedData.map(data => ({
					label: data.GolDarah.gol_darah || 'Unknown Blood Type',
					value: data.jumlah_kantong_darah,
				}));
				setChartData(formattedData);
			} catch (error) {
				console.error('Error fetching admin dashboard data:', error);
			}
		};
		fetchData();

		// Cleanup function
		return () => {
			// Destroy the chart when component unmounts
			if (chartRef.current && chartRef.current.chart) {
				chartRef.current.chart.destroy();
			}
		};
	}, []);

	const chartRef = useRef(null);

	useEffect(() => {
		if (chartData.length === 0) return;

		const canvas = document.getElementById('bloodStockChart');
		const ctx = canvas.getContext('2d');

		// Destroy the existing chart if it exists
		if (chartRef.current && chartRef.current.chart) {
			chartRef.current.chart.destroy();
		}

		// Create the chart
		if (!chartRef.current) {
			chartRef.current = new Chart(ctx, {
				type: 'pie',
				data: {
					labels: chartData.map(item => item.label),
					datasets: [
						{
							label: 'Jumlah Kantong Darah',
							data: chartData.map(item => item.value),
							backgroundColor: [
								'rgb(242, 34, 27)',
								'rgb(27, 70, 242)',
								'rgb(255, 205, 86)',
								'rgb(93, 224, 56)',
								'rgb(197, 45, 227)',
								'rgb(23, 9, 26)',
								'rgb(39, 226, 230)',
								'rgb(242, 127, 27)',
							],
							borderColor: 'black',
							borderWidth: 1,
						},
					],
				},
			});
		} else {
			chartRef.current.data.labels = chartData.map(item => item.label);
			chartRef.current.data.datasets[0].data = chartData.map(
				item => item.value
			);
			chartRef.current.update(); // Trigger chart update
		}
	}, [chartData]);

	return (
		<>
			<div className="dashboard-admin-wrapper">
				<h1>Dashboard Admin</h1>

				<div className="content">
					<div className="chart-container">
						<canvas id="bloodStockChart"></canvas>
					</div>
				</div>
			</div>
		</>
	);
};

export default DashboardAdmin;
