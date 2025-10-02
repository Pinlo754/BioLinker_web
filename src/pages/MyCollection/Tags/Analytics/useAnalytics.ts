import { useState } from "react"
type MonthlyBar = { m: string; value: number; highlight?: boolean };
const useAnalytics = () => {
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
    return {
        monthlyBars,
    }
}

export default useAnalytics