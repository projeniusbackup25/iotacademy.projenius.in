import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import "./ReportsPage.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const API = "https://iotacademy-backend.onrender.com";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b"
];

export default function ReportsPage() {

  const [stats, setStats] = useState({
    totalRegistrations: 0,
    totalCourses: 0,
    totalRevenue: 0,
    activeStudents: 0,
    completedStudents: 0
  });

  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {

    fetchReports();

  }, []);


  const fetchReports = async () => {

    try {

      const res = await fetch(`${API}/api/reports/dashboard`);
      const data = await res.json();

      setStats(data);

      const levels = [
        { level: "Beginner", students: data.levelDistribution.beginner },
        { level: "Intermediate", students: data.levelDistribution.intermediate },
        { level: "Advanced", students: data.levelDistribution.advanced }
      ];

      setBarData(levels);

      const pie = [
        { name: "Beginner", value: data.levelDistribution.beginner },
        { name: "Intermediate", value: data.levelDistribution.intermediate },
        { name: "Advanced", value: data.levelDistribution.advanced }
      ];

      setPieData(pie);

    }

    catch (err) {

      console.error("REPORT FETCH ERROR:", err);

    }

  };


  /* PDF DOWNLOAD */

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.text("IoT Academy Reports",20,20);

    doc.text(`Total Registrations: ${stats.totalRegistrations}`,20,40);
    doc.text(`Total Revenue: ₹${stats.totalRevenue}`,20,50);
    doc.text(`Active Students: ${stats.activeStudents}`,20,60);
    doc.text(`Completed Students: ${stats.completedStudents}`,20,70);

    doc.save("report.pdf");

  };


  /* EXCEL DOWNLOAD */

  const downloadExcel = () => {

    const reportTable = [
      ["Metric","Value"],
      ["Total Registrations",stats.totalRegistrations],
      ["Total Revenue",stats.totalRevenue],
      ["Active Students",stats.activeStudents],
      ["Completed Students",stats.completedStudents]
    ];

    const ws = XLSX.utils.aoa_to_sheet(reportTable);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb,ws,"Report");

    const excelBuffer = XLSX.write(wb,{bookType:"xlsx",type:"array"});

    const data = new Blob([excelBuffer],{type:"application/octet-stream"});

    saveAs(data,"report.xlsx");

  };


  /* CSV DOWNLOAD */

  const downloadCSV = () => {

    const reportTable = [
      ["Metric","Value"],
      ["Total Registrations",stats.totalRegistrations],
      ["Total Revenue",stats.totalRevenue],
      ["Active Students",stats.activeStudents],
      ["Completed Students",stats.completedStudents]
    ];

    const ws = XLSX.utils.aoa_to_sheet(reportTable);
    const csv = XLSX.utils.sheet_to_csv(ws);

    const blob = new Blob([csv],{type:"text/csv;charset=utf-8;"});

    saveAs(blob,"report.csv");

  };


  return (

    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-main">

        {/* HEADER */}

        <div className="reports-header">

          <h2>Reports & Analytics</h2>

          <div className="export-buttons">

            <button onClick={downloadPDF}>PDF</button>
            <button onClick={downloadExcel}>EXCEL</button>
            <button onClick={downloadCSV}>CSV</button>

          </div>

        </div>


        {/* FILTERS */}

        <div className="filters-row">

          <input
          className="search-box"
          placeholder="Search students..."
          />

          <select>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <select>
            <option>All Status</option>
            <option>Paid</option>
            <option>Failed</option>
          </select>

          <select>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last 6 Months</option>
          </select>

        </div>


        {/* STATS */}

        <div className="stats-grid">

          <div className="stat-card">
            <p>Total Registrations</p>
            <h3>{stats.totalRegistrations}</h3>
          </div>

          <div className="stat-card">
            <p>Total Courses</p>
            <h3>{stats.totalCourses}</h3>
          </div>

          <div className="stat-card">
            <p>Total Revenue</p>
            <h3>₹{stats.totalRevenue}</h3>
          </div>

          <div className="stat-card">
            <p>Active Students</p>
            <h3>{stats.activeStudents}</h3>
          </div>

          <div className="stat-card">
            <p>Completed Students</p>
            <h3>{stats.completedStudents}</h3>
          </div>

        </div>


        {/* CHARTS */}

        <div className="charts-grid">

          {/* BAR CHART */}

          <div className="chart-card">

            <h4>Course Level Registrations</h4>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={barData}>

                <XAxis dataKey="level"/>
                <YAxis/>
                <Tooltip/>

                <Bar
                dataKey="students"
                fill="#3b82f6"
                radius={[6,6,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>


          {/* PIE CHART */}

          <div className="chart-card">

            <h4>Student Distribution</h4>

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                data={pieData}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                >

                {pieData.map((entry,index)=>(
                  <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  />
                ))}

                </Pie>

                <Tooltip/>

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </main>

    </div>

  );
}