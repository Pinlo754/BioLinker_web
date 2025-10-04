import { useState } from "react";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, ReferenceLine, Cell } from "recharts";
import useAnalytics from "./useAnalytics";

const Analytics = () => {
    const { highlightedBar, monthlyBarsData, newViewsSeries, viewThisMonthSeries, interactionsData, avatar, weeklyViewsSeries } = useAnalytics()

    const linkList = [                            
        { name: 'Facebook', 
        date: '01 Junly 2025', 
        color: 'bg-emerald-100', 
        icon: (
            <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.7811 20.1625C36.7811 10.9993 29.3443 3.5625 20.1811 3.5625C11.0179 3.5625 3.58105 10.9993 3.58105 20.1625C3.58105 28.1969 9.29146 34.8867 16.8611 36.4305V25.1425H13.5411V20.1625H16.8611V16.0125C16.8611 12.8087 19.4673 10.2025 22.6711 10.2025H26.8211V15.1825H23.5011C22.5881 15.1825 21.8411 15.9295 21.8411 16.8425V20.1625H26.8211V25.1425H21.8411V36.6795C30.2241 35.8495 36.7811 28.7779 36.7811 20.1625Z" fill="url(#paint0_linear_940_12825)"/>
                <defs>
                    <linearGradient id="paint0_linear_940_12825" x1="3.58105" y1="20.121" x2="37.7258" y2="20.121" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#16C875"/>
                        <stop offset="1" stop-color="#6CDFAB"/>
                    </linearGradient>
                </defs>
            </svg>
      )},
      { name: 'Instagram', 
        date: '01 Junly 2025', 
        color: 'bg-rose-100', 
        icon: (
            <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.24121 18.9812C5.24121 12.7213 5.24121 9.59055 7.18673 7.64669C9.13225 5.70283 12.2614 5.70117 18.5212 5.70117H21.8412C28.1011 5.70117 31.2318 5.70117 33.1757 7.64669C35.1196 9.59221 35.1212 12.7213 35.1212 18.9812V22.3012C35.1212 28.561 35.1212 31.6918 33.1757 33.6357C31.2302 35.5795 28.1011 35.5812 21.8412 35.5812H18.5212C12.2614 35.5812 9.13059 35.5812 7.18673 33.6357C5.24287 31.6901 5.24121 28.561 5.24121 22.3012V18.9812Z" stroke="url(#paint0_linear_940_12824)" strokeWidth="3.32"/>
                <path d="M27.6511 15.6616C29.0263 15.6616 30.1411 14.5468 30.1411 13.1716C30.1411 11.7965 29.0263 10.6816 27.6511 10.6816C26.2759 10.6816 25.1611 11.7965 25.1611 13.1716C25.1611 14.5468 26.2759 15.6616 27.6511 15.6616Z" fill="url(#paint1_linear_940_12824)"/>
                <path d="M20.1812 25.6202C22.9316 25.6202 25.1612 23.3905 25.1612 20.6402C25.1612 17.8898 22.9316 15.6602 20.1812 15.6602C17.4308 15.6602 15.2012 17.8898 15.2012 20.6402C15.2012 23.3905 17.4308 25.6202 20.1812 25.6202Z" stroke="url(#paint2_linear_940_12824)" strokeWidth="3.32"/>
                <defs>
                    <linearGradient id="paint0_linear_940_12824" x1="5.24121" y1="20.6412" x2="35.9715" y2="20.6412" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#16C875"/>
                        <stop offset="1" stop-color="#6CDFAB"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_940_12824" x1="25.1611" y1="13.1716" x2="30.2828" y2="13.1716" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#16C875"/>
                        <stop offset="1" stop-color="#6CDFAB"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear_940_12824" x1="15.2012" y1="20.6402" x2="25.4446" y2="20.6402" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#16C875"/>
                        <stop offset="1" stop-color="#6CDFAB"/>
                    </linearGradient>
                </defs>
            </svg>
        )},
      { name: 'Tiktok', 
        date: '01 Junly 2025', 
        color: 'bg-emerald-100', 
        icon: (
            <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.8174 10.1832C26.6829 8.88757 26.0576 7.22404 26.0578 5.50195H20.9284V26.086C20.8897 27.2001 20.4196 28.2557 19.6175 29.03C18.8154 29.8042 17.7438 30.2366 16.629 30.236C14.2718 30.236 12.313 28.3104 12.313 25.92C12.313 23.0648 15.0686 20.9234 17.9072 21.8032V16.5576C12.1802 15.794 7.16699 20.2428 7.16699 25.92C7.16699 31.4478 11.7486 35.382 16.6124 35.382C21.8248 35.382 26.0578 31.149 26.0578 25.92V15.4786C28.1378 16.9723 30.635 17.7737 33.1958 17.7694V12.64C33.1958 12.64 30.075 12.7894 27.8174 10.1832Z" fill="url(#paint0_linear_940_12823)"/>
                <defs>
                    <linearGradient id="paint0_linear_940_12823" x1="7.16699" y1="20.442" x2="33.9365" y2="20.442" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#16C875"/>
                        <stop offset="1" stop-color="#6CDFAB"/>
                    </linearGradient>
                </defs>
            </svg>
        )},
    ];
    
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
                                before:bg-emerald-500/50 
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
                <button className=" relative overflow-hidden bg-white rounded-[24px] shadow-xl border border-slate-100 py-6 px-2 flex justify-around gap-2
                                hover:text-white before:content-['']
                                hover:shadow-emerald-500/50
                                hover:before:translate-y-[40%]
                                before:absolute before:inset-0 
                                before:bg-emerald-500/50 
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
                    <div className="relative z-10 flex-[2/3]">
                        <p className="text-slate-400 font-medium text-base text-start">New Views</p>
                        <p className="text-xl font-extrabold text-start text-slate-900">111</p>
                    </div>
                    <div className="relative z-10 h-10 w-20 flex items-end gap-1">
                        {computeBarHeights(newViewsSeries, 40).map((h, idx) => (
                            <span key={idx} className="w-1.5 rounded-sm bg-emerald-500/80" style={{ height: `${h}px` }} />
                        ))}
                    </div>
                </button>

                {/* Like */}
                <button className=" relative overflow-hidden bg-white rounded-[24px] shadow-xl border border-slate-100 p-6 flex items-center gap-4
                                hover:text-white before:content-['']
                                hover:shadow-emerald-500/50
                                hover:before:translate-y-[40%]
                                before:absolute before:inset-0 
                                before:bg-emerald-500/50 
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