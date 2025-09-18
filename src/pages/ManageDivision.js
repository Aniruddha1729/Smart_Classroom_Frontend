import React, { useCallback, useEffect, useState } from 'react';
import { getDivisions, createDivision, updateDivision, deleteDivision } from '../services/api';

const ManageDivision = () => {
  const [divisionName, setDivisionName] = useState('');
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const clearMessageSoon = useCallback(() => {
    window.clearTimeout((clearMessageSoon)._t);
    (clearMessageSoon)._t = window.setTimeout(() => setMessage({ type: '', text: '' }), 2500);
  }, []);

  // Load divisions on mount
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        setLoading(true);
        const res = await getDivisions();
        setDivisions(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error loading divisions' });
        clearMessageSoon();
      } finally {
        setLoading(false);
      }
    };
    fetchDivisions();
  }, [clearMessageSoon]);

  // Create
  const handleAddDivision = async (e) => {
    e.preventDefault();
    if (!divisionName.trim()) {
      setMessage({ type: 'error', text: 'Division name is required' });
      clearMessageSoon();
      return;
    }
    try {
      setLoading(true);
      const res = await createDivision({ name: divisionName.trim() });
      setDivisions(prev => [res.data, ...prev]);
      setDivisionName('');
      setMessage({ type: 'success', text: 'Division added' });
      clearMessageSoon();
    } catch (e) {
      setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error adding division' });
      clearMessageSoon();
    } finally {
      setLoading(false);
    }
  };

  // Begin edit
  const beginEdit = (row) => {
    setEditingId(row.id);
    setEditName(row.name || '');
  };

  // Save edit
  const saveEdit = async (id) => {
    try {
      setLoading(true);
      const res = await updateDivision(id, { name: editName.trim() });
      setDivisions(prev => prev.map(d => (d.id === id ? res.data : d)));
      setEditingId(null);
      setEditName('');
      setMessage({ type: 'success', text: 'Division updated' });
      clearMessageSoon();
    } catch (e) {
      setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error updating division' });
      clearMessageSoon();
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  // Delete
  const handleDeleteDivision = async (id) => {
    const confirm = window.confirm('Delete this division?');
    if (!confirm) return;
    try {
      setLoading(true);
      await deleteDivision(id);
      setDivisions(prev => prev.filter(d => d.id !== id));
      setMessage({ type: 'success', text: 'Division deleted' });
      clearMessageSoon();
    } catch (e) {
      setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error deleting division' });
      clearMessageSoon();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Divisions</h1>
        {loading && <span className="text-sm text-gray-500">Loading...</span>}
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

      {/* Add Division */}
      <form onSubmit={handleAddDivision} className="bg-white shadow rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Division Name</label>
          <input
            type="text"
            value={divisionName}
            onChange={(e) => setDivisionName(e.target.value)}
            placeholder="e.g. DivA, DivB"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition disabled:opacity-60"
          >
            Add Division
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Division Name</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {divisions.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-6 py-10 text-center text-gray-500">No divisions yet</td>
                </tr>
              )}

              {divisions.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap align-top">
                    {editingId === row.id ? (
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      <span className="text-gray-800 font-medium">{row.name}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {editingId === row.id ? (
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => saveEdit(row.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded"
                          disabled={loading}
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1.5 rounded"
                          disabled={loading}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => beginEdit(row)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteDivision(row.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded"
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageDivision;


