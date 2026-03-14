import React from "react";
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

/* BAR CHART DATA */

const barData = [
  { level: "Beginner", students: 5 },
  { level: "Intermediate", students: 6 },
  { level: "Advanced", students: 4 }
];

/* PIE CHART DATA */

const pieData = [
  { name: "IoT Fundamentals", value: 3 },
  { name: "Arduino & Sensors", value: 3 },
  { name: "Raspberry Pi Mastery", value: 3 },
  { name: "Smart Home Automation", value: 2 },
  { name: "Industrial IoT", value: 2 },
  { name: "Edge Computing", value: 2 }
];

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#a855f7",
  "#ef4444",
  "#06b6d4"
];

/* REPORT TABLE DATA */

const reportTable = [
  ["Student Name","Course","Payment","Status","Progress","Reg Date"],
  ["Aarav Sharma","IoT Fundamentals","4999","Paid","85%","2025-12-01"],
  ["Priya Patel","Arduino & Sensors","5999","Paid","92%","2025-11-15"],
  ["Rohan Gupta","Raspberry Pi Mastery","6999","Pending","45%","2026-01-10"],
  ["Sneha Reddy","Smart Home Automation","7999","Paid","100%","2025-10-20"],
  ["Vikram Singh","Industrial IoT","8999","Failed","12%","2026-02-05"]
];

export default function ReportsPage() {

  /* PDF DOWNLOAD */

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.text("ProJenius IoT Academy - Report",20,20);

    reportTable.forEach((row,i)=>{
      doc.text(row.join("   "),20,40+(i*10));
    });

    doc.save("report.pdf");
  };

  /* EXCEL DOWNLOAD */

  const downloadExcel = () => {

    const ws = XLSX.utils.aoa_to_sheet(reportTable);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb,ws,"Report");

    const excelBuffer = XLSX.write(wb,{bookType:"xlsx",type:"array"});

    const data = new Blob([excelBuffer],{type:"application/octet-stream"});

    saveAs(data,"report.xlsx");
  };

  /* CSV DOWNLOAD */

  const downloadCSV = () => {

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
            <h3>15</h3>
          </div>

          <div className="stat-card">
            <p>Total Courses</p>
            <h3>6</h3>
          </div>

          <div className="stat-card">
            <p>Total Revenue</p>
            <h3>₹73,489</h3>
          </div>

          <div className="stat-card">
            <p>Active Students</p>
            <h3>12</h3>
          </div>

          <div className="stat-card">
            <p>Completed Students</p>
            <h3>3</h3>
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
                <Bar dataKey="students" fill="#3b82f6" radius={[6,6,0,0]} />
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