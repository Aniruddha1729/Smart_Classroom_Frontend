import React, { useCallback, useEffect, useState } from 'react';
import { getSubjects, createSubject, updateSubject, deleteSubject } from '../services/api';

const ManageSubjects = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Lecture');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState('Lecture');

  const clearMessageSoon = useCallback(() => {
    window.clearTimeout((clearMessageSoon)._t);
    (clearMessageSoon)._t = window.setTimeout(() => setMessage({ type: '', text: '' }), 2500);
  }, []);

  // Load subjects on mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const res = await getSubjects();
        setSubjects(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error loading subjects' });
        clearMessageSoon();
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, [clearMessageSoon]);

  // Create
  const handleAddSubject = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage({ type: 'error', text: 'Subject name is required' });
      clearMessageSoon();
      return;
    }
    try {
      setLoading(true);
      const res = await createSubject({ name: name.trim(), type });
      setSubjects(prev => [res.data, ...prev]);
      setName('');
      setType('Lecture');
      setMessage({ type: 'success', text: 'Subject added' });
      clearMessageSoon();
    } catch (e) {
      setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error adding subject' });
      clearMessageSoon();
    } finally {
      setLoading(false);
    }
  };

  // Begin edit
  const beginEdit = (row) => {
    setEditingId(row.id);
    setEditName(row.name || '');
    setEditType(row.type || 'Lecture');
  };

  // Save edit
  const saveEdit = async (id) => {
    try {
      setLoading(true);
      const res = await updateSubject(id, { name: editName.trim(), type: editType });
      setSubjects(prev => prev.map(s => (s.id === id ? res.data : s)));
      setEditingId(null);
      setEditName('');
      setEditType('Lecture');
      setMessage({ type: 'success', text: 'Subject updated' });
      clearMessageSoon();
    } catch (e) {
      setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error updating subject' });
      clearMessageSoon();
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditType('Lecture');
  };

  // Delete
  const handleDeleteSubject = async (id) => {
    const confirm = window.confirm('Delete this subject?');
    if (!confirm) return;
    try {
      setLoading(true);
      await deleteSubject(id);
      setSubjects(prev => prev.filter(s => s.id !== id));
      setMessage({ type: 'success', text: 'Subject deleted' });
      clearMessageSoon();
    } catch (e) {
      setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error deleting subject' });
      clearMessageSoon();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Subjects</h1>
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

      {/* Add Subject */}
      <form onSubmit={handleAddSubject} className="bg-white shadow rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. DSA, MA, DSL"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>Lecture</option>
            <option>Lab</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition disabled:opacity-60"
          >
            Add Subject
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {subjects.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-gray-500">No subjects yet</td>
                </tr>
              )}

              {subjects.map((row) => (
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
                  <td className="px-6 py-4 whitespace-nowrap align-top">
                    {editingId === row.id ? (
                      <select
                        value={editType}
                        onChange={(e) => setEditType(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded bg-white"
                      >
                        <option>Lecture</option>
                        <option>Lab</option>
                      </select>
                    ) : (
                      <span className="text-gray-700">{row.type}</span>
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
                          onClick={() => handleDeleteSubject(row.id)}
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

export default ManageSubjects;


