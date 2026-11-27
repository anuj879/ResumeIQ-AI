
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";

import { Card } from "./ui";

const COL = ["#A78BFA", "#67E8F9", "#F0ABFC", "#818CF8"];

const n = (a) => (Array.isArray(a) ? a.length : 0);

const lbl = (k) =>
  k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

const tooltipStyle = {
  backgroundColor: "#111827",
  border: "1px solid rgba(167,139,250,0.25)",
  borderRadius: "12px",
  color: "#F8FAFC",
  fontSize: "12px",
  boxShadow: "0 12px 35px rgba(0,0,0,0.3)",
};

const axisStyle = {
  fill: "#929BAD",
  fontSize: 11,
};

export function Gauge({ value, title, note = "out of 100" }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));

  return (
    <Card>
      <div className="mb-2 flex items-center justify-between gap-2">
        <h4 className="font-semibold">{title}</h4>
        <span className="rounded-full border border-violet-300/15 bg-violet-400/[0.07] px-2.5 py-1 text-[10px] font-medium text-violet-200">
          Estimate
        </span>
      </div>

      <div
        className="relative h-44"
        role="img"
        aria-label={`${title}: ${v} ${note}`}
      >
        <ResponsiveContainer>
          <RadialBarChart
            innerRadius="72%"
            outerRadius="100%"
            data={[{ v }]}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              tick={false}
            />
            <RadialBar
              dataKey="v"
              background={{ fill: "rgba(255,255,255,0.07)" }}
              fill="#A78BFA"
              cornerRadius={10}
              isAnimationActive={false}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="bg-gradient-to-r from-violet-200 via-blue-200 to-cyan-200 bg-clip-text font-heading text-4xl font-extrabold text-transparent">
              {v}
            </div>
            <div className="mt-1 text-xs text-muted">{note}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function Bars({ title, data, max }) {
  return (
    <Card>
      <h4 className="mb-4 font-semibold">{title}</h4>

      <div className="h-44">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ left: -20, right: 4, top: 5, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,0.07)"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="name"
              tick={axisStyle}
              interval={0}
              axisLine={{ stroke: "rgba(255,255,255,0.10)" }}
              tickLine={false}
            />

            <YAxis
              domain={max ? [0, max] : [0, "auto"]}
              allowDecimals={false}
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "rgba(167,139,250,0.07)" }}
              contentStyle={tooltipStyle}
              itemStyle={{ color: "#C4B5FD" }}
              labelStyle={{ color: "#F8FAFC", marginBottom: 4 }}
            />

            <Bar
              dataKey="value"
              fill="#A78BFA"
              radius={[7, 7, 0, 0]}
              isAnimationActive={false}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function Donut({ title, data }) {
  const d = data.filter((x) => x.value > 0);

  return (
    <Card>
      <h4 className="mb-4 font-semibold">{title}</h4>

      <div className="h-44">
        {d.length ? (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={d}
                dataKey="value"
                nameKey="name"
                innerRadius="55%"
                outerRadius="85%"
                paddingAngle={3}
                isAnimationActive={false}
              >
                {d.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COL[i % COL.length]}
                    stroke="rgba(15,23,42,0.8)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={tooltipStyle}
                itemStyle={{ color: "#E2E8F0" }}
                labelStyle={{ color: "#F8FAFC" }}
              />

              <Legend
                iconType="circle"
                wrapperStyle={{
                  fontSize: 11,
                  color: "#AAB3C2",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="grid h-full place-items-center">
            <p className="text-sm text-muted">No data to chart.</p>
          </div>
        )}
      </div>
    </Card>
  );
}

export function ToolCharts({ id, res }) {
  if (!res) return null;

  let c = null;

  if (id === "analysis")
    c = (
      <>
        <Gauge
          value={res.atsScoreEstimate}
          title="ATS score (estimate)"
        />

        <Bars
          title="Evaluation summary"
          data={[
            { name: "Strengths", value: n(res.strengths) },
            { name: "Weaknesses", value: n(res.weaknesses) },
            { name: "Missing", value: n(res.missingInformation) },
            { name: "Fixes", value: n(res.suggestions) },
          ]}
        />
      </>
    );

  if (id === "ats")
    c = (
      <>
        <Gauge
          value={res.atsScore}
          title="ATS score (estimate)"
        />

        <Bars
          title="Score breakdown"
          max={100}
          data={Object.entries(res.breakdown || {}).map(([k, v]) => ({
            name: lbl(k).split(" ")[0],
            value: Number(v) || 0,
          }))}
        />
      </>
    );

  if (id === "match")
    c = (
      <>
        <Gauge
          value={res.matchPercent}
          title="Job match"
          note="percent"
        />

        <Donut
          title="Skill coverage"
          data={[
            { name: "Matching", value: n(res.matchingSkills) },
            { name: "Missing", value: n(res.missingSkills) },
          ]}
        />
      </>
    );

  if (id === "skills")
    c = (
      <>
        <Donut
          title="Skill distribution"
          data={[
            { name: "On your resume", value: n(res.resumeSkills) },
            { name: "Missing for the job", value: n(res.missingSkills) },
          ]}
        />

        <Bars
          title="Learning priorities"
          data={["High", "Medium", "Low"].map((p) => ({
            name: p,
            value: (res.skillsToLearn || []).filter(
              (s) => s.priority === p
            ).length,
          }))}
        />
      </>
    );

  if (id === "interview")
    c = (
      <Bars
        title="Questions by category"
        data={[
          ["Technical", "technical"],
          ["HR", "hr"],
          ["Project", "project"],
          ["Resume", "resumeBased"],
        ].map(([name, k]) => ({
          name,
          value: n(res[k]),
        }))}
      />
    );

  return c ? (
    <div className="mt-4 grid gap-4 sm:grid-cols-2">{c}</div>
  ) : null;
}
