import { useState } from "react";
import { Tooltip, Typography } from "antd";
import {
  ShareAltOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import "./StatusCard.css";

const { Text } = Typography;

export interface UsageBar {
  /** Value from 0 to 8 (number of filled bars out of 8) */
  filled: number;
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

export interface StatusCardProps {
  /** Bold title line, e.g. "PROJECT: Alpha" */
  title: string;
  /** Greyed-out subtitle, e.g. "Status: Active" */
  subtitle: string;
  /** Small metadata text below subtitle */
  metadata: string;
  /** 0-8 filled vertical bars representing usage (12.5% increments) */
  usageBars: number;
  /** Key-value stats shown to the right of the usage bars */
  stats: StatItem[];
  /** Segments for the bottom horizontal bar chart */
  segments: SegmentedBarItem[];
  /** Callback when share icon is clicked */
  onShare?: () => void;
  /** Optional expandable content */
  expandContent?: React.ReactNode;
}

function UsageGauge({ filled }: { filled: number }) {
  const totalBars = 8;
  return (
    <div className="usage-gauge">
      {Array.from({ length: totalBars }, (_, i) => (
        <Tooltip key={i} title={`${((i + 1) * 12.5).toFixed(1)}%`}>
          <div
            className={`gauge-bar ${i < filled ? "filled" : "empty"}`}
          />
        </Tooltip>
      ))}
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
  usageBars,
  stats,
  segments,
  onShare,
  expandContent,
}: StatusCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="status-card">
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
        <UsageGauge filled={usageBars} />
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
