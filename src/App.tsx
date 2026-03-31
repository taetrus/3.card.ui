import StatusCard from "./components/StatusCard";
import "./App.css";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: 520 }}>
        <StatusCard
          title="PROJECT: Alpha"
          subtitle="Status: Active"
          metadata="updated 2h ago"
          usageBars={6}
          stats={[
            { label: "CPU", value: "72%" },
            { label: "Mem", value: "4.2 GB" },
            { label: "Disk", value: "128 GB" },
          ]}
          segments={[
            { label: "Errors", value: 35, color: "#ef4444" },
            { label: "Warnings", value: 50, color: "#eab308" },
            { label: "Info", value: 15, color: "#3b82f6" },
          ]}
          onShare={() => alert("Shared!")}
          expandContent={<p style={{ margin: 0, color: "#6b7280" }}>Additional details go here.</p>}
        />
      </div>
    </div>
  );
}

export default App;
