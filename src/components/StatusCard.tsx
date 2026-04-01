import { useState } from "react";
import { Tooltip, Typography } from "antd";
import {
  ShareAltOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import "./StatusCard.css";

const { Text } = Typography;

export interface UsageGaugeItem {
  label: string;
  /** Percentage value 0–100 */
  percent: number;
}

export interface SegmentedBarItem {
  label: string;
  value: number;
  color: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export type CardPriority = "critical" | "warning";

export interface StatusCardProps {
  /** Bold title line, e.g. "PROJECT: Alpha" */
  title: string;
  /** Greyed-out subtitle, e.g. "Status: Active" */
  subtitle: string;
  /** Small metadata text below subtitle */
  metadata: string;
  /** Array of 7 resource usage gauges with label and percent */
  usageGauges: UsageGaugeItem[];
  /** Key-value stats shown to the right of the usage bars */
  stats: StatItem[];
  /** Segments for the bottom horizontal bar chart */
  segments: SegmentedBarItem[];
  /** Callback when share icon is clicked */
  onShare?: () => void;
  /** Show percentage numbers above gauge bars */
  showGaugePercent?: boolean;
  /** Show segmented gauge bars instead of solid */
  segmentedGauge?: boolean;
  /** Priority level — adds a colored border */
  priority?: CardPriority;
  /** Whether to show priority borders */
  showPriority?: boolean;
  /** Optional expandable content */
  expandContent?: React.ReactNode;
}

const MAX_BAR_HEIGHT = 32;
const SEGMENT_COUNT = 8;

function UsageGauge({
  gauges,
  showPercent,
  segmented,
}: {
  gauges: UsageGaugeItem[];
  showPercent: boolean;
  segmented: boolean;
}) {
  return (
    <div className="usage-gauge">
      {gauges.map((g, i) => {
        const clamped = Math.max(0, Math.min(100, g.percent));
        const isMaxed = clamped >= 100;
        const colorClass = isMaxed ? "maxed" : clamped > 0 ? "filled" : "empty";

        return (
          <Tooltip key={i} title={`${g.label}: ${clamped}%`}>
            <div className="gauge-column">
              {showPercent && (
                <span className={`gauge-percent ${isMaxed ? "gauge-percent-maxed" : ""}`}>
                  {Math.round(clamped)}
                </span>
              )}
              {segmented ? (
                <div className="gauge-track gauge-track-segmented">
                  {Array.from({ length: SEGMENT_COUNT }, (_, si) => {
                    const segThreshold = ((si + 1) / SEGMENT_COUNT) * 100;
                    const isFilled = clamped >= segThreshold;
                    return (
                      <div
                        key={si}
                        className={`gauge-segment ${isFilled ? colorClass : "empty"}`}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="gauge-track">
                  <div
                    className={`gauge-fill ${colorClass}`}
                    style={{ height: Math.max(2, (clamped / 100) * MAX_BAR_HEIGHT) }}
                  />
                </div>
              )}
              <span className="gauge-label">{g.label.slice(0, 3)}</span>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
}

function SegmentedBar({ segments }: { segments: SegmentedBarItem[] }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  if (total === 0) return null;

  return (
    <div className="segmented-bar">
      {segments.map((seg, i) => {
        const pct = (seg.value / total) * 100;
        if (pct === 0) return null;
        return (
          <Tooltip key={i} title={`${seg.label}: ${seg.value}`}>
            <div
              className="segment"
              style={{
                width: `${pct}%`,
                backgroundColor: seg.color,
              }}
            >
              <span className="segment-label">{seg.label}</span>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
}

export default function StatusCard({
  title,
  subtitle,
  metadata,
  usageGauges,
  stats,
  segments,
  onShare,
  showGaugePercent = true,
  segmentedGauge = false,
  priority,
  showPriority = false,
  expandContent,
}: StatusCardProps) {
  const [expanded, setExpanded] = useState(false);

  const priorityClass = showPriority && priority ? `card-${priority}` : "";

  return (
    <div className={`status-card ${priorityClass}`}>
      {/* Header */}
      <div className="card-header">
        <div className="header-text">
          <Text className="card-title" strong>
            {title}
          </Text>
          <Text className="card-subtitle">{subtitle}</Text>
          <Text className="card-metadata">{metadata}</Text>
        </div>
        {onShare && (
          <button
            className="icon-btn"
            onClick={onShare}
            aria-label="Share"
          >
            <ShareAltOutlined />
          </button>
        )}
      </div>

      {/* Middle: usage gauge + stats */}
      <div className="card-middle">
        <UsageGauge gauges={usageGauges} showPercent={showGaugePercent ?? true} segmented={segmentedGauge ?? false} />
        <div className="card-stats">
          {stats.map((stat, i) => (
            <div key={i} className="stat-row">
              <Text className="stat-label">{stat.label}</Text>
              <Text className="stat-value">{stat.value}</Text>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: segmented bar + expand */}
      <div className="card-bottom">
        <SegmentedBar segments={segments} />
        {expandContent && (
          <button
            className="icon-btn expand-btn"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <UpOutlined /> : <DownOutlined />}
          </button>
        )}
      </div>

      {/* Expandable area */}
      {expanded && expandContent && (
        <div className="card-expand">{expandContent}</div>
      )}
    </div>
  );
}
