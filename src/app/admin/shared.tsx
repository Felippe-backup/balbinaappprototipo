import { COLORS } from "./adminData";

const C = COLORS;

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
      <div style={{ width: 3, height: 18, background: C.green, borderRadius: 2, flexShrink: 0 }} />
      <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.9rem", color: C.text }}>
        {children}
      </span>
    </div>
  );
}

export function KpiCard({
  label, value, sub, trend, icon: Icon, accent,
}: {
  label: string; value: string; sub: string; trend?: number;
  icon: React.ElementType; accent: string;
}) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "18px 18px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.68rem", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {label}
        </span>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: `${accent}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={14} style={{ color: accent }} />
        </div>
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: "1.3rem", color: C.text, lineHeight: 1.1 }}>
        {value}
      </div>
      <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
        {trend !== undefined && (
          <span style={{
            fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", fontWeight: 700,
            color: trend >= 0 ? C.green : C.red,
          }}>
            {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%
          </span>
        )}
        <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", color: C.muted }}>{sub}</span>
      </div>
    </div>
  );
}

export function PageHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.5rem", color: C.text, margin: 0 }}>
        {title}
      </h1>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: C.muted, marginTop: 4 }}>{sub}</p>
    </div>
  );
}

export function Grid({
  children, cols = 2, gap = 16, isMobile,
}: {
  children: React.ReactNode; cols?: number; gap?: number; isMobile: boolean;
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : `repeat(${cols}, 1fr)`,
      gap,
      marginBottom: gap,
    }}>
      {children}
    </div>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: COLORS.card,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 16,
      padding: 20,
      ...style,
    }}>
      {children}
    </div>
  );
}

export const tooltipStyle = {
  background: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 10,
  fontFamily: "'Nunito', sans-serif",
  fontSize: 12,
  color: COLORS.text,
};

export const axisStyle = (mono = false) => ({
  fontSize: 10,
  fontFamily: mono ? "'DM Mono', monospace" : "'Nunito', sans-serif",
  fill: COLORS.muted,
});
