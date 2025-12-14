
"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Bug, Lightbulb, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChartDataPoint {
    date: number;
    label: string;
    count: number;
    general: number;
    bug: number;
    feature: number;
    question: number;
}

interface OverviewGraphProps {
    data: ChartDataPoint[];
    range: string;
    onRangeChange: (range: string) => void;
    loading?: boolean;
}

// Category colors - consistent across both themes
const CATEGORY_COLORS = {
    general: "#3b82f6",   // Blue
    bug: "#ef4444",       // Red
    feature: "#f59e0b",   // Amber
    question: "#06b6d4",  // Cyan
};

// Theme-aware colors for the graph
const useChartColors = () => {
    const [colors, setColors] = useState({
        primary: "#8b5cf6",  // Purple - neutral for total
        axis: "#a1a1aa",
    });

    useEffect(() => {
        const updateColors = () => {
            const isDark = document.documentElement.classList.contains("dark");
            setColors({
                primary: "#8b5cf6", // Purple - visible in both themes
                axis: isDark ? "#a1a1aa" : "#71717a", // zinc-400 / zinc-500
            });
        };

        updateColors();

        // Watch for theme changes
        const observer = new MutationObserver(updateColors);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    return colors;
};

// Skeleton loader component
const GraphSkeleton = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-[250px] md:h-[300px] w-full flex items-end justify-around gap-2 px-4 pb-8"
        >
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="bg-muted rounded-t-md w-full"
                    style={{ height: `${Math.random() * 60 + 20}%` }}
                    initial={{ scaleY: 0, opacity: 0.3 }}
                    animate={{
                        scaleY: 1,
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        scaleY: {
                            duration: 0.5,
                            delay: i * 0.05,
                            ease: "easeOut"
                        },
                        opacity: {
                            duration: 1.5,
                            delay: i * 0.05,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                />
            ))}
        </motion.div>
    );
};

// Custom tooltip component with category breakdown
const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload as ChartDataPoint;
    const totalCount = data.count;

    const categories = [
        { key: "general", label: "General", icon: MessageSquare, color: CATEGORY_COLORS.general, count: data.general },
        { key: "bug", label: "Bug Report", icon: Bug, color: CATEGORY_COLORS.bug, count: data.bug },
        { key: "feature", label: "Feature Request", icon: Lightbulb, color: CATEGORY_COLORS.feature, count: data.feature },
        { key: "question", label: "Question", icon: HelpCircle, color: CATEGORY_COLORS.question, count: data.question },
    ];

    return (
        <div className="rounded-lg border bg-popover p-3 shadow-lg min-w-[180px]">
            <p className="text-sm font-semibold text-popover-foreground mb-2">{label}</p>
            <div className="space-y-1.5">
                {categories.map(({ key, label, icon: Icon, color, count }) => (
                    count > 0 && (
                        <div key={key} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <Icon className="h-3.5 w-3.5" style={{ color }} />
                                <span className="text-xs text-muted-foreground">{label}</span>
                            </div>
                            <span className="text-xs font-medium text-popover-foreground">{count}</span>
                        </div>
                    )
                ))}
            </div>
            <div className="mt-2 pt-2 border-t border-border flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Total</span>
                <span className="text-sm font-bold text-popover-foreground">{totalCount}</span>
            </div>
        </div>
    );
};

export function OverviewGraph({ data, range, onRangeChange, loading = false }: OverviewGraphProps) {
    const colors = useChartColors();

    return (
        <Card className="col-span-4">
            <CardHeader className="pb-2 md:pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <CardTitle className="text-base md:text-lg">Feedback Overview</CardTitle>
                    <Tabs value={range} onValueChange={onRangeChange} className="w-full sm:w-auto">
                        <TabsList className="grid w-full grid-cols-3 sm:w-[280px] md:w-[320px]">
                            <TabsTrigger value="today" disabled={loading} className="text-xs md:text-sm">Today</TabsTrigger>
                            <TabsTrigger value="7d" disabled={loading} className="text-xs md:text-sm">7 Days</TabsTrigger>
                            <TabsTrigger value="30d" disabled={loading} className="text-xs md:text-sm">30 Days</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </CardHeader>
            <CardContent className="pl-0 md:pl-2">
                <div className="h-[250px] md:h-[300px] w-full relative">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <GraphSkeleton key="skeleton" />
                        ) : (
                            <motion.div
                                key="chart"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="h-full w-full"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data}>
                                        <defs>
                                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.4} />
                                                <stop offset="95%" stopColor={colors.primary} stopOpacity={0.05} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis
                                            dataKey="label"
                                            stroke={colors.axis}
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke={colors.axis}
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `${value}`}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="count"
                                            stroke={colors.primary}
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorCount)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </CardContent>
        </Card>
    );
}

