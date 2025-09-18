import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getTeachers, createTeacher, updateTeacher, deleteTeacher } from '../services/api';

// Admin-only page component: Manage Faculty
const ManageFaculty = () => {
  const [facultyName, setFacultyName] = useState('');
  const [subjectsInput, setSubjectsInput] = useState('');
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editSubjectsInput, setEditSubjectsInput] = useState('');

  // Helpers
  const clearMessageSoon = useCallback(() => {
    window.clearTimeout((clearMessageSoon)._t);
    (clearMessageSoon)._t = window.setTimeout(() => setMessage({ type: '', text: '' }), 2500);
  }, []);

  const parsedSubjects = useMemo(() => {
    return subjectsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }, [subjectsInput]);

  const parseSubjects = (value) => {
    return value
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  };

  // Fetch existing faculty
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true);
        const res = await getTeachers();
        setFaculty(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error loading faculty' });
        clearMessageSoon();
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, [clearMessageSoon]);

  // Create
  const handleAddFaculty = async (e) => {
    e.preventDefault();
    if (!facultyName.trim()) {
      setMessage({ type: 'error', text: 'Faculty name is required' });
      clearMessageSoon();
      return;
    }
    try {
      setLoading(true);
      const res = await createTeacher({ 
        name: facultyName.trim(), 
        subjects: parsedSubjects 
      });
      setFaculty(prev => [res.data, ...prev]);
      setFacultyName('');
      setSubjectsInput('');
      setMessage({ type: 'success', text: 'Faculty added' });
      clearMessageSoon();
    } catch (e) {
      setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error adding faculty' });
      clearMessageSoon();
    } finally {
      setLoading(false);
    }
  };

  // Start edit
  const beginEdit = (row) => {
    setEditingId(row.id);
    setEditName(row.name || '');
    setEditSubjectsInput(Array.isArray(row.subjects) ? row.subjects.join(', ') : (row.subjects || ''));
  };

  // Save edit
  const saveEdit = async (id) => {
    try {
      setLoading(true);
      const res = await updateTeacher(id, { 
        name: editName.trim(), 
        subjects: parseSubjects(editSubjectsInput) 
      });
      setFaculty(prev => prev.map(f => (f.id === id ? res.data : f)));
      setEditingId(null);
      setEditName('');
      setEditSubjectsInput('');
      setMessage({ type: 'success', text: 'Faculty updated' });
      clearMessageSoon();
    } catch (e) {
      setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error updating faculty' });
      clearMessageSoon();
    } finally {
      setLoading(false);
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditSubjectsInput('');
  };

  // Delete
  const deleteFaculty = async (id) => {
    const confirm = window.confirm('Delete this faculty?');
    if (!confirm) return;
    try {
      setLoading(true);
      await deleteTeacher(id);
      setFaculty(prev => prev.filter(f => f.id !== id));
      setMessage({ type: 'success', text: 'Faculty deleted' });
      clearMessageSoon();
    } catch (e) {
      setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error deleting faculty' });
      clearMessageSoon();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Faculty</h1>
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

      {/* Add form */}
      <form onSubmit={handleAddFaculty} className="bg-white shadow rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Faculty Name</label>
          <input
            type="text"
            value={facultyName}
            onChange={(e) => setFacultyName(e.target.value)}
            placeholder="e.g. Dr. A. Sharma"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subjects (comma separated)</label>
          <input
            type="text"
            value={subjectsInput}
            onChange={(e) => setSubjectsInput(e.target.value)}
            placeholder="e.g. Math, Physics"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition disabled:opacity-60"
          >
            Add Faculty
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjects</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {faculty.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-gray-500">No faculty yet</td>
                </tr>
              )}

              {faculty.map((row) => (
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
                  <td className="px-6 py-4 whitespace-pre-wrap align-top">
                    {editingId === row.id ? (
                      <input
                        value={editSubjectsInput}
                        onChange={(e) => setEditSubjectsInput(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      <span className="text-gray-700">{Array.isArray(row.subjects) ? row.subjects.join(', ') : (row.subjects || '')}</span>
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
                          onClick={() => deleteFaculty(row.id)}
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

export default ManageFaculty;


