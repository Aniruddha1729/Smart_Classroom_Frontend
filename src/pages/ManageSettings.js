import React, { useCallback, useEffect, useState } from 'react';
import { getSettings, updateSettings } from '../services/api';

const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ManageSettings = () => {
  const [days, setDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri"]);
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(17);
  const [lunchStartHour, setLunchStartHour] = useState(12);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [hasExisting, setHasExisting] = useState(false);

  const clearMessageSoon = useCallback(() => {
    window.clearTimeout((clearMessageSoon)._t);
    (clearMessageSoon)._t = window.setTimeout(() => setMessage({ type: '', text: '' }), 2500);
  }, []);

  // Load existing settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await getSettings();
        const data = res.data;
        if (data) {
          setHasExisting(true);
          if (Array.isArray(data.days)) setDays(data.days);
          if (typeof data.start_hour === 'number') setStartHour(data.start_hour);
          if (typeof data.end_hour === 'number') setEndHour(data.end_hour);
          if (typeof data.lunch_start_hour === 'number') setLunchStartHour(data.lunch_start_hour);
        }
      } catch (e) {
        setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error loading settings' });
        clearMessageSoon();
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [clearMessageSoon]);

  // Toggle a day selection
  const toggleDay = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Submit (create or update one-and-only settings doc)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (days.length === 0) {
      setMessage({ type: 'error', text: 'Select at least one day' });
      clearMessageSoon();
      return;
    }
    if (startHour >= endHour) {
      setMessage({ type: 'error', text: 'Start hour should be less than end hour' });
      clearMessageSoon();
      return;
    }
    try {
      setLoading(true);
      const payload = {
        days: [...days].sort((a, b) => ALL_DAYS.indexOf(a) - ALL_DAYS.indexOf(b)),
        start_hour: Number(startHour),
        end_hour: Number(endHour),
        lunch_start_hour: Number(lunchStartHour),
      };
      await updateSettings(payload);
      setHasExisting(true);
      setMessage({ type: 'success', text: 'Settings updated' });
      clearMessageSoon();
    } catch (e) {
      setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error updating settings' });
      clearMessageSoon();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Settings</h1>
        {loading && <span className="text-sm text-gray-500">Saving...</span>}
      </div>

      {message.text && (
        <div className={`rounded-lg px-4 py-3 text-sm ${
          message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
          message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
          'bg-slate-50 text-slate-700 border border-slate-200'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-5 space-y-6">
        {/* Days */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Days</label>
          <div className="flex flex-wrap gap-3">
            {ALL_DAYS.map((day) => (
              <label key={day} className="inline-flex items-center gap-2 select-none">
                <input
                  type="checkbox"
                  checked={days.includes(day)}
                  onChange={() => toggleDay(day)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="text-gray-700">{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Hour</label>
            <input
              type="number"
              min={0}
              max={23}
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Hour</label>
            <input
              type="number"
              min={0}
              max={23}
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lunch Start Hour</label>
            <input
              type="number"
              min={0}
              max={23}
              value={lunchStartHour}
              onChange={(e) => setLunchStartHour(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg transition disabled:opacity-60"
          >
            Update Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageSettings;


