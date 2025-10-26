import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, ReferenceLine, Cell } from "recharts";
import useAnalytics from "./useAnalytics";
import { PLATFORM_ICONS } from "../../../../constants/platformIcons";
import { useNavigate } from "react-router-dom";
import NotificationOverlay from "../../../../components/ui/noti";

const Analytics = () => {
    const { 
        emptyMonthlyData,
        emptyWeeklyData,
        avatar, 
        getAnalyticsHistory,
        totalAnalytics,
        analyticsHistory,
        getMonthlyDataFromHistory,
        getWeeklyDataFromHistory,
        getWeeklyComparison,
        getTopLinks,
        getWeeklyDataForLink,
        getLinkTimelineData,
        user,
        loading
    } = useAnalytics()

    const [realMonthlyData, setRealMonthlyData] = useState(emptyMonthlyData);
    const [realWeeklyData, setRealWeeklyData] = useState(emptyWeeklyData);
    const [topLinkTimelineData, setTopLinkTimelineData] = useState<any[]>([]);
    const [top3Links, setTop3Links] = useState<any[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [isUserInteracted, setIsUserInteracted] = useState(false);
    const [weeklyComparison, setWeeklyComparison] = useState<{thisWeekCount: number, lastWeekCount: number, percentageChange: number, isIncrease: boolean} | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        getAnalyticsHistory();
        if (analyticsHistory.length > 0) {
            const monthlyData = getMonthlyDataFromHistory();
            const weeklyData = getWeeklyDataFromHistory();
            const comparison = getWeeklyComparison();
            const links = getTopLinks();
            setRealMonthlyData(monthlyData);
            setRealWeeklyData(weeklyData);
            setWeeklyComparison(comparison);
            setTop3Links(links);
            
            // Get timeline data for top link
            if (links.length > 0) {
                const topLinkId = links[0].linkId;
                const timelineData = getLinkTimelineData(topLinkId);
                setTopLinkTimelineData(timelineData);
            }
            
            // Chỉ auto-select cột cao nhất khi user chưa tương tác
            if (!isUserInteracted) {
                // Find the month with highest value to highlight
                const maxValue = Math.max(...monthlyData.map(d => d.value));
                const maxValueMonth = monthlyData.find(d => d.value === maxValue);
                
                if (maxValueMonth && maxValueMonth.value > 0) {
                    setSelectedMonth(maxValueMonth.month);
                }
            }
        }
    }, [analyticsHistory, getMonthlyDataFromHistory, getWeeklyDataFromHistory, getWeeklyComparison, getTopLinks, getWeeklyDataForLink, getLinkTimelineData, isUserInteracted]);
    
    const computeBarHeights = (values: number[], maxPixelHeight: number): number[] => {
        if (values.length === 0) return [];
        const maxValue = Math.max(...values);
        if (maxValue === 0) return values.map(() => 0);
        return values.map(v => Math.max(2, Math.round((v / maxValue) * maxPixelHeight)));
    };
    return (
        <div className="w-full px-10 py-2">
            <NotificationOverlay visible={user?.currentPlanId ==="FREE-PLAN"} message="Yêu cầu nâng cấp gói để trải nghiệm chức năng này" onClose={() => {navigate('/dashboard')}} />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 ">
                {/* View this month */}
                {/* <button className="relative overflow-hidden bg-white rounded-[24px] shadow-lg border border-slate-100 p-6 flex items-center justify-between transition-colors 
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
                </button> */}

                {/* New Views */}
                {/* <button className=" relative overflow-hidden bg-white rounded-[24px] shadow-xl border border-slate-100 py-6 px-2 flex justify-around gap-2
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
                    <div className="relative z-10 h-14 w-20 flex items-end gap-1">
                        {computeBarHeights(newViewsSeries, 40).map((h, idx) => (
                            <span key={idx} className="w-1.5 rounded-sm bg-emerald-500/80" style={{ height: `${h}px` }} />
                        ))}
                    </div>
                </button> */}

                {/* Like */}
                {/* <button className=" relative overflow-hidden bg-white rounded-[24px] shadow-xl border border-slate-100 p-6 flex items-center gap-4
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
                </button> */}

                {/* Followers */}
                {/* <div className="relative overflow-hidden rounded-[24px] p-6 bg-gradient-to-r from-emerald-500 to-emerald-300 text-white flex items-center justify-between">
                    <div>
                        <p className="text-white/90 font-medium">Followers</p>
                        <p className="text-3xl font-extrabold">3k</p>
                    </div>
                    <svg viewBox="0 0 100 40" className="w-28 h-12 opacity-90" aria-hidden>
                        <path d="M0 30 C 15 5, 35 35, 50 18 S 85 10, 100 28" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
                    </svg>
                </div> */}
            </div>
            {/* Big cards row */}
            <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Total Views Chart */}
                <div className="xl:col-span-2 bg-white rounded-[24px] shadow-sm border border-slate-100 p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-slate-400 font-medium">Tổng lượng truy cập link</p>
                            <p className="mt-2 text-3xl sm:text-3xl font-extrabold text-slate-900">{totalAnalytics} lượt truy cập</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-500" fill="currentColor" aria-hidden>
                                <path d="M3 17h2v-7H3v7zm4 0h2V7H7v10zm4 0h2v-4h-2v4zm4 0h2V4h-2v13zm4 0h2v-9h-2v9z" />
                            </svg>
                        </div>
                    </div>

                    {/* Bars by month (Recharts) */}
                    <div className=" mt-2 h-[80%]">
                        <ResponsiveContainer width="100%" height="100%" style={{ outline: 'none' }}>
                            <BarChart 
                                style={{ outline: 'none' }} 
                                data={realMonthlyData} 
                                margin={{ top: 18, right: 16, left: 0, bottom: 0 }}
                                tabIndex={-1}
                            >
                                <YAxis hide domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.2)]} />
                                <defs>
                                    <style>{`
                                        .recharts-bar {
                                            outline: none !important;
                                        }
                                        .recharts-bar-rectangle {
                                            outline: none !important;
                                        }
                                        .recharts-wrapper {
                                            outline: none !important;
                                        }
                                        .recharts-wrapper:focus {
                                            outline: none !important;
                                        }
                                        .recharts-layer {
                                            outline: none !important;
                                        }
                                        svg {
                                            outline: none !important;
                                        }
                                        svg:focus {
                                            outline: none !important;
                                        }
                                    `}</style>
                                </defs>
                                {selectedMonth && (() => {
                                    const selectedData = realMonthlyData.find(d => d.month === selectedMonth);
                                    if (selectedData) {
                                        return (
                                            <ReferenceLine
                                                y={selectedData.value}
                                                stroke="#10b981"
                                                strokeDasharray="6 6"
                                                strokeWidth={2}
                                                ifOverflow="extendDomain"
                                                label={{ value: `${selectedData.value}`, position: 'right', fill: '#10b981', fontSize: 20, dy: -20, dx:-50, fontWeight: 'bold' }}
                                            />
                                        );
                                    }
                                    return null;
                                })()}
                                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} interval={0} />
                                <Bar 
                                    dataKey="value" 
                                    radius={[12, 12, 12, 12]}
                                    onClick={(data: any, index: number) => {
                                        console.log('Bar clicked:', data, index, realMonthlyData[index], 'Setting to:', realMonthlyData[index]?.month);
                                        if (realMonthlyData[index]?.month) {
                                            setIsUserInteracted(true);
                                            setSelectedMonth(realMonthlyData[index].month);
                                            console.log('Set selectedMonth to:', realMonthlyData[index].month);
                                        }
                                    }}
                                    tabIndex={-1}
                                >
                                    {realMonthlyData.map((entry, index) => {
                                        const maxValue = Math.max(...realMonthlyData.map(d => d.value));
                                        const isHighest = entry.value === maxValue && entry.value > 0;
                                        const isSelected = entry.month === selectedMonth;
                                        
                                        // Mặc định: highlight cột cao nhất. Khi user click: chỉ highlight cột được chọn
                                        const shouldHighlight = isUserInteracted ? isSelected : isHighest;
                                        
                                        return (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={shouldHighlight ? '#10b981' : '#e2e8f0'}
                                            />
                                        );
                                    })}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Profile Summary */}
                <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-6">
                    <div className="flex flex-col items-center text-center">
                        <img
                            src={user?.userImage|| avatar}
                            alt="avatar"
                            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow"
                        />
                        <h3 className="mt-6 text-3xl font-extrabold text-slate-900">{user?.fullName || ''}</h3>
                        <div className="mt-2 flex items-center gap-2 text-slate-500">
                            {/* <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                            </svg> */}
                            <span>Email: {user?.email || ''}</span>
                        </div>

                        <div className="mt-8 w-full grid grid-cols-3 gap-4">
                            <div className="flex flex-col">
                                <span className="text-slate-400">Links</span>
                                <span className="text-3xl font-extrabold text-slate-900">{top3Links.length}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-slate-400">Lượt truy cập</span>
                            <span className="text-3xl font-extrabold text-slate-900">{totalAnalytics}</span>
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
                            <p className="text-slate-400 font-medium">Lượt truy cập link trong tuần</p>
                            <p className="mt-2 text-4xl font-extrabold text-slate-900">{realWeeklyData.reduce((sum: number, day: { day: string; value: number }) => sum + day.value, 0)}</p>
                            <div className="mt-4 inline-flex items-center gap-2 text-emerald-500 font-semibold">
                                <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M9 21H7V9H3l9-8 9 8h-4v12h-2V7.83L12 4.69 9 7.83V21z"/></svg>
                                </span>
                            <span>Đang theo dõi</span>
                        </div>
                    </div>
                    {weeklyComparison && (
                        <div className={`font-semibold ${weeklyComparison.isIncrease ? 'text-emerald-500' : 'text-red-500'}`}>
                            {weeklyComparison.isIncrease ? '+' : ''}{weeklyComparison.percentageChange.toFixed(1)}%
                        </div>
                    )}
                </div>
                    <div className="mt-8 h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={realWeeklyData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
                            <p className="text-slate-400 font-medium">Link có lượt truy cập cao nhất: </p>
                            <p className="mt-2 text-3xl font-extrabold text-slate-900">{top3Links.length > 0 ? top3Links[0].linkData?.title : ''}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-500" fill="currentColor"><path d="M3 17h2v-7H3v7zm4 0h2V7H7v10zm4 0h2v-4h-2v4zm4 0h2V4h-2v13zm4 0h2v-9h-2v9z"/></svg>
                        </div>
                    </div>
                    {top3Links.length > 0 && (
                        <div className="mt-4 inline-flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-semibold">
                                Lượt tương tác: {top3Links[0].count}
                            </span>
                        </div>
                    )}
                    <div className="mt-8 h-56 rounded-2xl overflow-hidden">
                        <ResponsiveContainer width="100%" height="80%">
                            <AreaChart data={topLinkTimelineData} margin={{ top: 8, right: 12, left: 12, bottom: 8 }}>
                                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
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
                    <h3 className="text-2xl font-extrabold text-slate-900">Link có lượt truy cập cao nhất</h3>
                    <div className="mt-6 space-y-6">
                        {top3Links.slice(0, 3).map((link, index) => (
                            <div key={link.linkId} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <span className="text-emerald-600 font-bold">{PLATFORM_ICONS[link.linkData?.platform] || PLATFORM_ICONS['Link']}</span>
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-slate-900">{link.linkData?.title || 'Link ' + (index + 1)}</p>
                                        <p className="text-slate-400 text-sm">{link.count} tương tác</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex items-center justify-end text-emerald-600 font-semibold">
                        <button className="inline-flex items-center gap-2 hover:text-emerald-700"
                        onClick={() => navigate('/account')}>
                            <span>Xem tất cả</span>
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M10 17l5-5-5-5v10z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Analytics;