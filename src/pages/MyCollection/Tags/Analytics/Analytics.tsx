import { useState } from "react";
// If not installed yet, run: npm i recharts
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, ReferenceLine, Cell } from "recharts";

const Analytics = () => {
    const avatar = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
    const [isHovered, setIsHovered] = useState(false);
    // Monthly bars data reused to compute highlighted bar height
    type MonthlyBar = { m: string; value: number; highlight?: boolean };
    const monthlyBars: MonthlyBar[] = [
        { m: 'Jan', value: 52 },
        { m: 'Feb', value: 200 },
        { m: 'Mar', value: 140 },
        { m: 'Apr', value: 180 },
        { m: 'May', value: 120 },
        { m: 'Jun', value: 220, highlight: true },
        { m: 'Jul', value: 110 },
        { m: 'Aug', value: 210 },
        { m: 'Sep', value: 70 },
        { m: 'Oct', value: 170 },
        { m: 'Nov', value: 110 },
        { m: 'Dec', value: 180 },
    ];
    const weeklyViewsSeries: { day: string; value: number }[] = [
        { day: 'Mon', value: 90 },
        { day: 'Tue', value: 30 },
        { day: 'Wed', value: 120 },
        { day: 'Thu', value: 60 },
        { day: 'Fri', value: 110 },
        { day: 'Sat', value: 140 },
        { day: 'Sun', value: 20 },
    ];
    const clampBarHeight = (value: number) => Math.max(24, Math.min(220, value));
    const highlightedBar = monthlyBars.find(b => b.highlight);
    const monthlyBarsData = monthlyBars.map(b => ({ month: b.m, value: b.value, highlight: !!b.highlight }));
    const linkList = [                            { name: 'Facebook', 
        date: '01 Junly 2025', 
        color: 'bg-emerald-100', 
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-500" fill="currentColor">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56V12h2.76l-.44 2.89h-2.32v6.99C18.34 21.13 22 17 22 12z"/>
          </svg>
      )},
      { name: 'Instagram', 
        date: '01 Junly 2025', 
        color: 'bg-rose-100', 
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-rose-500" fill="currentColor">
              <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.51 5.51 0 0 0 12 7.5zm6-1.75a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 18 5.75z"/>
          </svg>
      )},
      { name: 'Tiktok', 
        date: '01 Junly 2025', 
        color: 'bg-emerald-100', 
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-500" fill="currentColor">
              <path d="M16 3h2a6 6 0 0 0 6 6v2a7.99 7.99 0 0 1-6-2v7a6 6 0 1 1-6-6h2a4 4 0 1 0 4 4V3z"/>
          </svg>
      )},
    ];
    // Series data for cards (value-driven)
    const newViewsSeries: number[] = [12, 22, 15, 26, 20, 30, 18, 24];
    const viewThisMonthSeries: number[] = [48, 40, 56, 36, 64, 20];
    const interactionsSeries: number[] = [32, 24, 26, 18, 20, 30, 14, 22, 36, 30];
    const interactionsData = interactionsSeries.map((value, idx) => ({ idx, value }));

    const computeBarHeights = (values: number[], maxPixelHeight: number): number[] => {
        if (values.length === 0) return [];
        const maxValue = Math.max(...values);
        if (maxValue === 0) return values.map(() => 0);
        return values.map(v => Math.max(2, Math.round((v / maxValue) * maxPixelHeight)));
    };
    return (
        <div className="w-full px-10 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 ">
                {/* View this month */}
                <button className="relative overflow-hidden bg-white rounded-[24px] shadow-lg border border-slate-100 p-6 flex items-center justify-between transition-colors 
                                hover:text-white before:content-['']
                                hover:shadow-emerald-500/50
                                hover:before:translate-y-[40%]
                                before:absolute before:inset-0 
                                before:bg-emerald-500 
                                before:translate-y-full 
                                before:transition-transform 
                                before:duration-1000 
                                hover:after:translate-y-0 
                                after:absolute 
                                after:left-0 
                                after:bottom-0 
                                after:w-[200%] 
                                after:h-[100%] 
                                after:bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 120 60\' preserveAspectRatio=\'none\'><path d=\'M0 40 C 20 20, 40 60, 60 40 S 100 20, 120 40 V60 H0 Z\' fill=\'%2310b981\'/></svg>')] 
                                after:bg-repeat-x after:bg-[length:200%_120px] 
                                after:translate-y-full 
                                after:transition-transform
                                after:duration-10000"
                >
                    <div className="relative z-10 space-y-2 ">
                        <p className="text-slate-400 font-medium ">View this month</p>
                        <p className="text-xl font-extrabold  text-slate-900 text-start">1.4k</p>
                    </div>
                    <div className="relative z-10 flex items-end gap-2 h-16">
                        {computeBarHeights(viewThisMonthSeries, 64).map((h, idx) => (
                            <span key={idx} className={`w-2 rounded-full ${idx % 2 === 0 ? 'bg-emerald-500/80' : 'bg-emerald-300'}`} style={{ height: `${h}px` }} />
                        ))}
                    </div>
                </button>

                {/* New Views */}
                <button className=" relative overflow-hidden bg-white rounded-[24px] shadow-xl border border-slate-100 p-6 flex items-center gap-4
                                hover:text-white before:content-['']
                                hover:shadow-emerald-500/50
                                hover:before:translate-y-[40%]
                                before:absolute before:inset-0 
                                before:bg-emerald-500 
                                before:translate-y-full 
                                before:transition-transform 
                                before:duration-1000 
                                hover:after:translate-y-0 
                                after:absolute 
                                after:left-0 
                                after:bottom-0 
                                after:w-[200%] 
                                after:h-[100%] 
                                after:bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 120 60\' preserveAspectRatio=\'none\'><path d=\'M0 40 C 20 20, 40 60, 60 40 S 100 20, 120 40 V60 H0 Z\' fill=\'%2310b981\'/></svg>')] 
                                after:bg-repeat-x after:bg-[length:200%_120px] 
                                after:translate-y-full 
                                after:transition-transform
                                after:duration-10000">
                    <div className="relative z-10 w-14 h-14 rounded-full bg-emerald-400/80 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor" aria-hidden>
                            <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5z" />
                        </svg>
                    </div>
                    <div className="relative z-10 flex-1">
                        <p className="text-slate-400 font-medium text-start">New Views</p>
                        <p className="text-xl font-extrabold text-start text-slate-900">111</p>
                    </div>
                    <div className="relative z-10 h-10 w-24 flex items-end gap-1">
                        {computeBarHeights(newViewsSeries, 40).map((h, idx) => (
                            <span key={idx} className="w-1.5 rounded-sm bg-white/80" style={{ height: `${h}px` }} />
                        ))}
                    </div>
                </button>

                {/* Like */}
                <button className=" relative overflow-hidden bg-white rounded-[24px] shadow-xl border border-slate-100 p-6 flex items-center gap-4
                                hover:text-white before:content-['']
                                hover:shadow-emerald-500/50
                                hover:before:translate-y-[40%]
                                before:absolute before:inset-0 
                                before:bg-emerald-500 
                                before:translate-y-full 
                                before:transition-transform 
                                before:duration-1000 
                                hover:after:translate-y-0 
                                after:absolute 
                                after:left-0 
                                after:bottom-0 
                                after:w-[200%] 
                                after:h-[100%] 
                                after:bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 120 60\' preserveAspectRatio=\'none\'><path d=\'M0 40 C 20 20, 40 60, 60 40 S 100 20, 120 40 V60 H0 Z\' fill=\'%2310b981\'/></svg>')] 
                                after:bg-repeat-x after:bg-[length:200%_120px] 
                                after:translate-y-full 
                                after:transition-transform
                                after:duration-10000">
                    <div className="relative w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-7 h-7 text-emerald-500" fill="currentColor" aria-hidden>
                            <path d="M9 22h9a2 2 0 0 0 2-2v-7.5a2 2 0 0 0-2-2h-4.31l.95-4.57.02-.18a1.5 1.5 0 0 0-1.5-1.5h-.5L9 8v14zM7 22H4a2 2 0 0 1-2-2v-7h5v9z" />
                        </svg>
                    </div>
                    <div className="relative z-10 flex-1 text-start">
                        <p className="text-slate-400 font-medium">Like</p>
                        <p className="text-xl font-extrabold text-slate-900">100</p>
                    </div>
                </button>

                {/* Followers */}
                <div className="relative overflow-hidden rounded-[24px] p-6 bg-gradient-to-r from-emerald-500 to-emerald-300 text-white flex items-center justify-between">
                    <div>
                        <p className="text-white/90 font-medium">Followers</p>
                        <p className="text-3xl font-extrabold">3k</p>
                    </div>
                    <svg viewBox="0 0 100 40" className="w-28 h-12 opacity-90" aria-hidden>
                        <path d="M0 30 C 15 5, 35 35, 50 18 S 85 10, 100 28" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
                    </svg>
                </div>
            </div>
            {/* Big cards row */}
            <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Total Views Chart */}
                <div className="xl:col-span-2 bg-white rounded-[24px] shadow-sm border border-slate-100 p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-slate-400 font-medium">Total Views</p>
                            <p className="mt-2 text-3xl sm:text-3xl font-extrabold text-slate-900">17.400 Views</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-500" fill="currentColor" aria-hidden>
                                <path d="M3 17h2v-7H3v7zm4 0h2V7H7v10zm4 0h2v-4h-2v4zm4 0h2V4h-2v13zm4 0h2v-9h-2v9z" />
                            </svg>
                        </div>
                    </div>

                    {/* Bars by month (Recharts) */}
                    <div className=" mt-2 h-[80%]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyBarsData} margin={{ top: 18, right: 16, left: 0, bottom: 0 }}>
                                <YAxis hide domain={[0, 'dataMax + 30']} />
                                {highlightedBar && (
                                    <ReferenceLine
                                        y={highlightedBar.value}
                                        stroke="#10b981"
                                        strokeDasharray="6 6"
                                        strokeWidth={2}
                                        ifOverflow="extendDomain"
                                        label={{ value: `${highlightedBar.value}`, position: 'right', fill: '#10b981', fontSize: 20, dy: -20, dx:-50, fontWeight: 'bold' }}
                                    />
                                )}
                                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} interval={0} />
                                <Bar dataKey="value"  radius={[12, 12, 12, 12]}>
                                    {monthlyBarsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.highlight ? '#10b981' : '#e2e8f0'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Profile Summary */}
                <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-6">
                    <div className="flex flex-col items-center text-center">
                        <img
                            src={avatar}
                            alt="avatar"
                            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow"
                        />
                        <h3 className="mt-6 text-3xl font-extrabold text-slate-900">Thanh Phong</h3>
                        <div className="mt-2 flex items-center gap-2 text-slate-500">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                            </svg>
                            <span>Ho Chi Minh, VietNam</span>
                        </div>

                        <div className="mt-8 w-full grid grid-cols-3 gap-4">
                            <div className="flex flex-col">
                                <span className="text-slate-400">Projects</span>
                                <span className="text-3xl font-extrabold text-slate-900">28</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-slate-400">Followers</span>
                                <span className="text-3xl font-extrabold text-slate-900">3000</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-slate-400">Following</span>
                                <span className="text-3xl font-extrabold text-slate-900">76</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trio cards row */}
            <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Views this week */}
                <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-slate-400 font-medium">Views this week</p>
                            <p className="mt-2 text-4xl font-extrabold text-slate-900">430</p>
                            <div className="mt-4 inline-flex items-center gap-2 text-emerald-500 font-semibold">
                                <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M9 21H7V9H3l9-8 9 8h-4v12h-2V7.83L12 4.69 9 7.83V21z"/></svg>
                                </span>
                                <span>On track</span>
                            </div>
                        </div>
                        <div className="text-emerald-500 font-semibold">+2.45%</div>
                    </div>
                    <div className="mt-8 h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyViewsSeries} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Bar dataKey="value" radius={[12, 12, 12, 12]} fill="#34d399" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Interactions this week */}
                <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-slate-400 font-medium">Interactions this week</p>
                            <p className="mt-2 text-4xl font-extrabold text-slate-900">34%</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-500" fill="currentColor"><path d="M3 17h2v-7H3v7zm4 0h2V7H7v10zm4 0h2v-4h-2v4zm4 0h2V4h-2v13zm4 0h2v-9h-2v9z"/></svg>
                        </div>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-semibold">+2.45%</span>
                    </div>
                    <div className="mt-8 h-56 rounded-2xl overflow-hidden">
                        <ResponsiveContainer width="100%" height="80%">
                            <AreaChart data={interactionsData} margin={{ top: 8, right: 12, left: 12, bottom: 8 }}>
                                <defs>
                                    <linearGradient id="interactionsGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.18} />
                                        <stop offset="50%" stopColor="#10b981" stopOpacity={0.10} />
                                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                                    </linearGradient>
                                </defs>
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#10b981"
                                    strokeWidth={4}
                                    fill="url(#interactionsGradient)"
                                    fillOpacity={1}
                                    dot={false}
                                    isAnimationActive={true}
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Your links */}
                <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-6">
                    <h3 className="text-2xl font-extrabold text-slate-900">Your links</h3>
                    <div className="mt-6 space-y-6">
                        {linkList.map(({ name, date, color, icon }) => (
                            <div key={name} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>{icon}</div>
                                    <div>
                                        <p className="text-lg font-semibold text-slate-900">{name}</p>
                                        <p className="text-slate-400 text-sm">{date}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex items-center justify-end text-emerald-600 font-semibold">
                        <button className="inline-flex items-center gap-2 hover:text-emerald-700">
                            <span>View all</span>
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M10 17l5-5-5-5v10z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Analytics;