import { fetcherWithParams } from "../../../../api/fetchers";
import { useState, useCallback } from "react"

type History = {
    clickId: string;
    staticLink: object;
    staticLinkId: string;
    createdAt: string;
}
const useAnalytics = () => {
    const monthNames = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'];
    const emptyMonthlyData = monthNames.map(month => ({ month, value: 0, highlight: false }));
    
    // Empty weekly data
    const emptyWeeklyData = [
        { day: 'T2', value: 0 },
        { day: 'T3', value: 0 },
        { day: 'T4', value: 0 },
        { day: 'T5', value: 0 },
        { day: 'T6', value: 0 },
        { day: 'T7', value: 0 },
        { day: 'CN', value: 0 },
    ];
    
    const newViewsSeries: number[] = [12, 22, 15, 26, 20, 30, 18, 24];
    const viewThisMonthSeries: number[] = [48, 40, 56, 36, 64, 20];
    const interactionsSeries: number[] = [32, 24, 26, 18, 20, 30, 14, 22, 36, 30];
    const interactionsData = interactionsSeries.map((value, idx) => ({ idx, value }));
    const avatar = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
    const [totalAnalytics, setTotalAnalytics] = useState(0);
    const [analyticsHistory, setAnalyticsHistory] = useState<History[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const groupAnalyticsByMonth = useCallback((data?: History[]) => {
        const dataToGroup = data || analyticsHistory;
        const grouped: { [key: string]: History[] } = {};
        
        const monthNames = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'];
        
        dataToGroup.forEach((item) => {
            if (item.createdAt) {
                const date = new Date(item.createdAt);
                const monthKey = monthNames[date.getMonth()];
                
                if (!grouped[monthKey]) {
                    grouped[monthKey] = [];
                }
                grouped[monthKey].push(item);
            }
        });
        
        // Convert to format similar to monthlyBars - return object with month names and count
        const result: { [key: string]: number } = {};
        monthNames.forEach(month => {
            result[month] = grouped[month]?.length || 0;
        });
        
        return result;
    }, [analyticsHistory])

    const getMonthlyDataFromHistory = useCallback((data?: History[]) => {
        const grouped = groupAnalyticsByMonth(data);
        const monthNames = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'];
        
        // Convert grouped data to monthlyBarsData format
        return monthNames.map((month, index) => ({
            month,
            value: grouped[month] || 0,
            highlight: false
        }));
    }, [groupAnalyticsByMonth])

    const getWeeklyDataFromHistory = useCallback((data?: History[]) => {
        const dataToGroup = data || analyticsHistory;
        const dayNamesVi = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        
        // Get current week (last 7 days)
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - 6); // Last 7 days including today
        
        // Group by day of week
        const grouped: { [key: string]: number } = {
            'CN': 0,
            'T2': 0,
            'T3': 0,
            'T4': 0,
            'T5': 0,
            'T6': 0,
            'T7': 0
        };
        
        dataToGroup.forEach((item) => {
            if (item.createdAt) {
                const date = new Date(item.createdAt);
                // Check if date is within last 7 days
                if (date >= startOfWeek && date <= now) {
                    const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
                    const dayName = dayNamesVi[dayIndex];
                    grouped[dayName] = (grouped[dayName] || 0) + 1;
                }
            }
        });
        
        // Convert to weeklyViewsSeries format, order: T2 to CN
        const dayOrder = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
        return dayOrder.map(day => ({
            day,
            value: grouped[day] || 0
        }));
    }, [analyticsHistory])


    const getTopLinks = useCallback((data?: History[]) => {
        const dataToProcess = data || analyticsHistory;
        
        // Group by staticLinkId and count
        const linkCounts: { [key: string]: { count: number; linkData: any; latestClick: string } } = {};
        
        dataToProcess.forEach((item) => {
            const linkId = item.staticLinkId;
            if (linkId) {
                if (!linkCounts[linkId]) {
                    linkCounts[linkId] = {
                        count: 0,
                        linkData: item.staticLink,
                        latestClick: item.createdAt
                    };
                }
                linkCounts[linkId].count++;
                
                // Update latest click if this is more recent
                if (new Date(item.createdAt) > new Date(linkCounts[linkId].latestClick)) {
                    linkCounts[linkId].latestClick = item.createdAt;
                }
            }
        });
        
        // Convert to array and sort by count descending
        const sortedLinks = Object.entries(linkCounts)
            .map(([linkId, data]) => ({
                linkId,
                ...data
            }))
            .sort((a, b) => b.count - a.count);
        
        return sortedLinks;
    }, [analyticsHistory])

    const getWeeklyDataForLink = useCallback((linkId: string, data?: History[]) => {
        const dataToGroup = data || analyticsHistory;
        const dayNamesVi = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        
        // Get current week (last 7 days)
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - 6);
        
        // Group by day for this specific link
        const grouped: { [key: string]: number } = {
            'CN': 0,
            'T2': 0,
            'T3': 0,
            'T4': 0,
            'T5': 0,
            'T6': 0,
            'T7': 0
        };
        
        dataToGroup.forEach((item) => {
            if (item.createdAt && item.staticLinkId === linkId) {
                const date = new Date(item.createdAt);
                if (date >= startOfWeek && date <= now) {
                    const dayIndex = date.getDay();
                    const dayName = dayNamesVi[dayIndex];
                    grouped[dayName] = (grouped[dayName] || 0) + 1;
                }
            }
        });
        
        // Convert to format, order: T2 to CN
        const dayOrder = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
        return dayOrder.map(day => ({
            day,
            value: grouped[day] || 0
        }));
    }, [analyticsHistory])

    const getLinkTimelineData = useCallback((linkId: string, data?: History[]) => {
        const dataToGroup = data || analyticsHistory;
        
        // Get all clicks for this link, sorted by date
        const linkClicks = dataToGroup
            .filter(item => item.staticLinkId === linkId && item.createdAt)
            .map(item => ({
                date: new Date(item.createdAt),
                value: 1
            }))
            .sort((a, b) => a.date.getTime() - b.date.getTime());
        
        // Group by date (YYYY-MM-DD)
        const groupedByDate: { [key: string]: number } = {};
        
        linkClicks.forEach(({ date }) => {
            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            groupedByDate[dateStr] = (groupedByDate[dateStr] || 0) + 1;
        });
        
        // Convert to array format for chart
        const timelineData = Object.entries(groupedByDate)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .slice(-10) // Take last 10 days for chart
            .map(([dateStr, value]) => {
                const [year, month, day] = dateStr.split('-');
                return {
                    date: `${day}/${month}`, // Format: dd/MM
                    value
                };
            });
        
        return timelineData;
    }, [analyticsHistory])

    const getWeeklyComparison = useCallback((data?: History[]) => {
        const dataToGroup = data || analyticsHistory;
        
        const now = new Date();
        now.setHours(23, 59, 59, 999);
        
        // Current week: last 7 days (from 6 days ago to today)
        const startOfThisWeek = new Date(now);
        startOfThisWeek.setHours(0, 0, 0, 0);
        startOfThisWeek.setDate(startOfThisWeek.getDate() - 6);
        
        // Previous week: the 7 days before current week (from 13 days ago to 7 days ago)
        const endOfLastWeek = new Date(startOfThisWeek);
        endOfLastWeek.setHours(0, 0, 0, 0);
        endOfLastWeek.setDate(endOfLastWeek.getDate() - 1); // 1 day before startOfThisWeek
        
        const startOfLastWeek = new Date(endOfLastWeek);
        startOfLastWeek.setDate(startOfLastWeek.getDate() - 6); // 7 days including endOfLastWeek
        
        let thisWeekCount = 0;
        let lastWeekCount = 0;
        
        dataToGroup.forEach((item) => {
            if (item.createdAt) {
                const date = new Date(item.createdAt);
                
                if (date >= startOfThisWeek && date <= now) {
                    thisWeekCount++;
                } else if (date >= startOfLastWeek && date < startOfThisWeek) {
                    lastWeekCount++;
                }
            }
        });
        
        // Calculate percentage change
        let percentageChange = 0;
        if (lastWeekCount > 0) {
            percentageChange = ((thisWeekCount - lastWeekCount) / lastWeekCount) * 100;
        } else if (thisWeekCount > 0) {
            percentageChange = 100; // Infinite growth
        }
        
        // console.log('Weekly Comparison:', {
        //     thisWeekCount,
        //     lastWeekCount,
        //     percentageChange,
        //     startOfThisWeek: startOfThisWeek.toISOString(),
        //     endOfThisWeek: now.toISOString(),
        //     startOfLastWeek: startOfLastWeek.toISOString(),
        //     endOfLastWeek: endOfLastWeek.toISOString()
        // });
        
        return {
            thisWeekCount,
            lastWeekCount,
            percentageChange,
            isIncrease: percentageChange >= 0
        };
    }, [analyticsHistory])

    const getAnalyticsHistory = useCallback(async () => {
        try {
            const userId = localStorage.getItem("userId");
            const user = await fetcherWithParams(`Auth/${userId}`, { userId: userId });
            console.log('user', user);
            setUser(user);
            const response = await fetcherWithParams(`AnalyticLink/user/${userId}/click-history`, {
                userId: userId
            });
            if(response.length > 0){
                setTotalAnalytics(response.length);
                setAnalyticsHistory(response);
            }
        } catch (error) {
            console.log(error);
        }
    }, [groupAnalyticsByMonth]);


    return {
        emptyMonthlyData,
        emptyWeeklyData,
        newViewsSeries,
        viewThisMonthSeries,
        interactionsData,
        avatar,
        getAnalyticsHistory,
        totalAnalytics,
        groupAnalyticsByMonth,
        analyticsHistory,
        getMonthlyDataFromHistory,
        getWeeklyDataFromHistory,
        getWeeklyComparison,
        getTopLinks,
        getWeeklyDataForLink,
        getLinkTimelineData,
        user,
        loading
    }


}

export default useAnalytics