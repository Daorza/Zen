import { useState, useEffect, useMemo } from "react";
import api from "../services/api";

export function useSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/schedules");
      setSchedules(res.data.data ?? []);
    } catch (err) {
      setError(err?.response?.data?.message ?? "Gagal memuat jadwal.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const schedulesForSelectedDate = useMemo(() => {
    const dateStr = selectedDate.toISOString().split("T")[0];
    return schedules
      .filter((s) => s.date.startsWith(dateStr))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [schedules, selectedDate]);

  const scheduledDates = useMemo(() => {
    return new Set(schedules.map((s) => s.date.split("T")[0]));
  }, [schedules]);

  const dayStats = useMemo(() => {
    const list = schedulesForSelectedDate;
    const total = list.length;
    const done = list.filter((s) => s.status === "done").length;
    const active = list.filter((s) => s.status === "in_progress").length;
    const pending = list.filter((s) => s.status === "pending").length;
    const totalMinutes = list.reduce((acc, s) => {
      const [sh, sm] = s.startTime.split(":").map(Number);
      const [eh, em] = s.endTime.split(":").map(Number);
      return acc + (eh * 60 + em) - (sh * 60 + sm);
    }, 0);
    const hours = `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
    const progress = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, active, pending, hours, progress };
  }, [schedulesForSelectedDate]);

  const addSchedule = async (payload) => {
    const res = await api.post("/schedules", {
      title: payload.title.trim(),
      description: payload.description?.trim() || null,
      date: payload.date,
      startTime: payload.startTime,
      endTime: payload.endTime,
      priority: payload.priority,
      type: "schedule",
      source: "manual",
    });
    setSchedules((prev) => [...prev, res.data.data]);
    return res.data.data;
  };

  return {
    schedules,
    schedulesForSelectedDate,
    scheduledDates,
    dayStats,
    loading,
    error,
    selectedDate,
    setSelectedDate,
    addSchedule,
    refetch: fetchSchedules,
  };
}
