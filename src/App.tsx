import { useState, useEffect } from "react";
import StatusCard, { type StatusCardProps } from "./components/StatusCard";
import { SunOutlined, MoonOutlined, EyeOutlined, EyeInvisibleOutlined, AlertOutlined, BarChartOutlined } from "@ant-design/icons";
import "./App.css";

const cards: Omit<StatusCardProps, "onShare" | "showGaugePercent" | "showPriority" | "segmentedGauge">[] = [
  {
    title: "PROJECT: Alpha",
    subtitle: "Status: Active",
    metadata: "updated 2h ago",
    usageGauges: [
      { label: "CPU", percent: 12.5 },
      { label: "MEM", percent: 0 },
      { label: "DSK", percent: 25 },
      { label: "NET", percent: 0 },
      { label: "GPU", percent: 50 },
      { label: "I/O", percent: 100 },
      { label: "THR", percent: 75 },
    ],
    stats: [
      { label: "CPU", value: "72%" },
      { label: "Mem", value: "4.2 GB" },
      { label: "Disk", value: "128 GB" },
    ],
    segments: [
      { label: "Errors", value: 35, color: "#ef4444" },
      { label: "Warnings", value: 50, color: "#eab308" },
      { label: "Info", value: 15, color: "#3b82f6" },
    ],
    expandContent: <p style={{ margin: 0 }}>Primary workload cluster running ML training pipeline.</p>,
  },
  {
    title: "PROJECT: Bravo",
    subtitle: "Status: Degraded",
    metadata: "updated 15m ago",
    priority: "critical",
    usageGauges: [
      { label: "CPU", percent: 88 },
      { label: "MEM", percent: 92 },
      { label: "DSK", percent: 67 },
      { label: "NET", percent: 45 },
      { label: "GPU", percent: 30 },
      { label: "I/O", percent: 12 },
      { label: "THR", percent: 55 },
    ],
    stats: [
      { label: "CPU", value: "88%" },
      { label: "Mem", value: "14.7 GB" },
      { label: "Disk", value: "450 GB" },
    ],
    segments: [
      { label: "Errors", value: 120, color: "#ef4444" },
      { label: "Warnings", value: 30, color: "#eab308" },
      { label: "Info", value: 50, color: "#3b82f6" },
    ],
    expandContent: <p style={{ margin: 0 }}>High memory pressure — scaling event triggered.</p>,
  },
  {
    title: "PROJECT: Charlie",
    subtitle: "Status: Healthy",
    metadata: "updated 5m ago",
    usageGauges: [
      { label: "CPU", percent: 15 },
      { label: "MEM", percent: 22 },
      { label: "DSK", percent: 10 },
      { label: "NET", percent: 5 },
      { label: "GPU", percent: 0 },
      { label: "I/O", percent: 8 },
      { label: "THR", percent: 12 },
    ],
    stats: [
      { label: "CPU", value: "15%" },
      { label: "Mem", value: "1.8 GB" },
      { label: "Disk", value: "32 GB" },
    ],
    segments: [
      { label: "Errors", value: 2, color: "#ef4444" },
      { label: "Warnings", value: 8, color: "#eab308" },
      { label: "Info", value: 90, color: "#3b82f6" },
    ],
  },
  {
    title: "PROJECT: Delta",
    subtitle: "Status: Maintenance",
    metadata: "updated 1d ago",
    usageGauges: [
      { label: "CPU", percent: 0 },
      { label: "MEM", percent: 5 },
      { label: "DSK", percent: 80 },
      { label: "NET", percent: 0 },
      { label: "GPU", percent: 0 },
      { label: "I/O", percent: 3 },
      { label: "THR", percent: 0 },
    ],
    stats: [
      { label: "CPU", value: "0%" },
      { label: "Mem", value: "0.4 GB" },
      { label: "Disk", value: "800 GB" },
    ],
    segments: [
      { label: "Warnings", value: 15, color: "#eab308" },
      { label: "Info", value: 85, color: "#3b82f6" },
    ],
  },
  {
    title: "PROJECT: Echo",
    subtitle: "Status: Active",
    metadata: "updated 30m ago",
    priority: "warning",
    usageGauges: [
      { label: "CPU", percent: 55 },
      { label: "MEM", percent: 60 },
      { label: "DSK", percent: 42 },
      { label: "NET", percent: 78 },
      { label: "GPU", percent: 90 },
      { label: "I/O", percent: 35 },
      { label: "THR", percent: 68 },
    ],
    stats: [
      { label: "CPU", value: "55%" },
      { label: "Mem", value: "9.6 GB" },
      { label: "Disk", value: "256 GB" },
    ],
    segments: [
      { label: "Errors", value: 18, color: "#ef4444" },
      { label: "Warnings", value: 42, color: "#eab308" },
      { label: "Info", value: 40, color: "#3b82f6" },
    ],
    expandContent: <p style={{ margin: 0 }}>GPU inference workload — latency p99 within SLA.</p>,
  },
  {
    title: "PROJECT: Foxtrot",
    subtitle: "Status: Critical",
    metadata: "updated 2m ago",
    priority: "critical",
    usageGauges: [
      { label: "CPU", percent: 98 },
      { label: "MEM", percent: 95 },
      { label: "DSK", percent: 88 },
      { label: "NET", percent: 72 },
      { label: "GPU", percent: 100 },
      { label: "I/O", percent: 91 },
      { label: "THR", percent: 100 },
    ],
    stats: [
      { label: "CPU", value: "98%" },
      { label: "Mem", value: "15.2 GB" },
      { label: "Disk", value: "920 GB" },
    ],
    segments: [
      { label: "Errors", value: 200, color: "#ef4444" },
      { label: "Warnings", value: 80, color: "#eab308" },
      { label: "Info", value: 20, color: "#3b82f6" },
    ],
    expandContent: <p style={{ margin: 0 }}>Resource exhaustion — immediate attention required.</p>,
  },
  {
    title: "PROJECT: Golf",
    subtitle: "Status: Idle",
    metadata: "updated 6h ago",
    usageGauges: [
      { label: "CPU", percent: 2 },
      { label: "MEM", percent: 8 },
      { label: "DSK", percent: 15 },
      { label: "NET", percent: 1 },
      { label: "GPU", percent: 0 },
      { label: "I/O", percent: 1 },
      { label: "THR", percent: 3 },
    ],
    stats: [
      { label: "CPU", value: "2%" },
      { label: "Mem", value: "0.6 GB" },
      { label: "Disk", value: "64 GB" },
    ],
    segments: [
      { label: "Info", value: 100, color: "#3b82f6" },
    ],
  },
  {
    title: "PROJECT: Hotel",
    subtitle: "Status: Scaling",
    metadata: "updated 8m ago",
    priority: "warning",
    usageGauges: [
      { label: "CPU", percent: 70 },
      { label: "MEM", percent: 75 },
      { label: "DSK", percent: 50 },
      { label: "NET", percent: 65 },
      { label: "GPU", percent: 40 },
      { label: "I/O", percent: 58 },
      { label: "THR", percent: 82 },
    ],
    stats: [
      { label: "CPU", value: "70%" },
      { label: "Mem", value: "12 GB" },
      { label: "Disk", value: "512 GB" },
    ],
    segments: [
      { label: "Errors", value: 5, color: "#ef4444" },
      { label: "Warnings", value: 60, color: "#eab308" },
      { label: "Info", value: 35, color: "#3b82f6" },
    ],
    expandContent: <p style={{ margin: 0 }}>Auto-scaling from 3 to 6 replicas in progress.</p>,
  },
  {
    title: "PROJECT: India",
    subtitle: "Status: Active",
    metadata: "updated 1h ago",
    usageGauges: [
      { label: "CPU", percent: 38 },
      { label: "MEM", percent: 44 },
      { label: "DSK", percent: 30 },
      { label: "NET", percent: 20 },
      { label: "GPU", percent: 60 },
      { label: "I/O", percent: 25 },
      { label: "THR", percent: 45 },
    ],
    stats: [
      { label: "CPU", value: "38%" },
      { label: "Mem", value: "7.1 GB" },
      { label: "Disk", value: "200 GB" },
    ],
    segments: [
      { label: "Errors", value: 10, color: "#ef4444" },
      { label: "Warnings", value: 25, color: "#eab308" },
      { label: "Info", value: 65, color: "#3b82f6" },
    ],
  },
];

function App() {
  const [dark, setDark] = useState(false);
  const [showPercent, setShowPercent] = useState(true);
  const [showPriority, setShowPriority] = useState(true);
  const [segmentedGauge, setSegmentedGauge] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="app-shell">
      <div className="toolbar">
        <button
          className="toolbar-btn"
          onClick={() => setShowPercent(!showPercent)}
          aria-label={showPercent ? "Hide gauge percentages" : "Show gauge percentages"}
          title={showPercent ? "Hide %" : "Show %"}
        >
          {showPercent ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          <span className="toolbar-label">{showPercent ? "Hide %" : "Show %"}</span>
        </button>
        <button
          className={`toolbar-btn ${segmentedGauge ? "toolbar-btn-active" : ""}`}
          onClick={() => setSegmentedGauge(!segmentedGauge)}
          aria-label={segmentedGauge ? "Switch to solid gauges" : "Switch to segmented gauges"}
          title={segmentedGauge ? "Solid" : "Segmented"}
        >
          <BarChartOutlined />
          <span className="toolbar-label">{segmentedGauge ? "Solid" : "Segments"}</span>
        </button>
        <button
          className={`toolbar-btn ${showPriority ? "toolbar-btn-active" : ""}`}
          onClick={() => setShowPriority(!showPriority)}
          aria-label={showPriority ? "Hide priority borders" : "Show priority borders"}
          title={showPriority ? "Hide alerts" : "Show alerts"}
        >
          <AlertOutlined />
          <span className="toolbar-label">{showPriority ? "Alerts" : "Alerts"}</span>
        </button>
        <button
          className="toolbar-btn"
          onClick={() => setDark(!dark)}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          title={dark ? "Light mode" : "Dark mode"}
        >
          {dark ? <SunOutlined /> : <MoonOutlined />}
        </button>
      </div>

      {showPriority && (
        <div className="legend">
          <span className="legend-item">
            <span className="legend-dot legend-dot-critical" />
            Critical
          </span>
          <span className="legend-item">
            <span className="legend-dot legend-dot-warning" />
            Warning
          </span>
        </div>
      )}

      <div className="card-grid">
        {cards.map((card, i) => (
          <StatusCard key={i} {...card} showGaugePercent={showPercent} showPriority={showPriority} segmentedGauge={segmentedGauge} />
        ))}
      </div>
    </div>
  );
}

export default App;
