import React, { useCallback, useEffect, useState } from 'react';
import { getClassrooms, createClassroom, updateClassroom, deleteClassroom } from '../services/api';

const ManageClassroom = () => {
  const [classroomNumber, setClassroomNumber] = useState('');
  const [classroomType, setClassroomType] = useState('');
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingId, setEditingId] = useState(null);
  const [editNumber, setEditNumber] = useState('');
  const [editType, setEditType] = useState('');

  const clearMessageSoon = useCallback(() => {
    window.clearTimeout((clearMessageSoon)._t);
    (clearMessageSoon)._t = window.setTimeout(() => setMessage({ type: '', text: '' }), 2500);
  }, []);

  // Load classrooms on mount
  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        setLoading(true);
        const res = await getClassrooms();
        setClassrooms(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error loading classrooms' });
        clearMessageSoon();
      } finally {
        setLoading(false);
      }
    };
    fetchClassrooms();
  }, [clearMessageSoon]);

  // Create
  const handleAddClassroom = async (e) => {
    e.preventDefault();
    if (!classroomNumber.trim() || !classroomType) {
      setMessage({ type: 'error', text: 'Classroom number and type are required' });
      clearMessageSoon();
      return;
    }
    try {
      setLoading(true);
      const res = await createClassroom({ 
        number: classroomNumber.trim(), 
        type: classroomType 
      });
      setClassrooms(prev => [...prev, res.data]);
      setClassroomNumber('');
      setClassroomType('');
      setMessage({ type: 'success', text: 'Classroom added successfully' });
      clearMessageSoon();
    } catch (e) {
      setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error adding classroom' });
      clearMessageSoon();
    } finally {
      setLoading(false);
    }
  };

  // Update
  const handleUpdateClassroom = async (id) => {
    if (!editNumber.trim() || !editType) {
      setMessage({ type: 'error', text: 'Classroom number and type are required' });
      clearMessageSoon();
      return;
    }
    try {
      setLoading(true);
      const res = await updateClassroom(id, { 
        number: editNumber.trim(), 
        type: editType 
      });
      setClassrooms(prev => prev.map(c => c.id === id ? res.data : c));
      setEditingId(null);
      setEditNumber('');
      setEditType('');
      setMessage({ type: 'success', text: 'Classroom updated successfully' });
      clearMessageSoon();
    } catch (e) {
      setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error updating classroom' });
      clearMessageSoon();
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDeleteClassroom = async (id) => {
    if (!window.confirm('Are you sure you want to delete this classroom?')) return;
    try {
      setLoading(true);
      await deleteClassroom(id);
      setClassrooms(prev => prev.filter(c => c.id !== id));
      setMessage({ type: 'success', text: 'Classroom deleted successfully' });
      clearMessageSoon();
    } catch (e) {
      setMessage({ type: 'error', text: e?.response?.data?.message || e?.message || 'Error deleting classroom' });
      clearMessageSoon();
    } finally {
      setLoading(false);
    }
  };

  // Start editing
  const startEdit = (classroom) => {
    setEditingId(classroom.id);
    setEditNumber(classroom.number);
    setEditType(classroom.type);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditNumber('');
    setEditType('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Classrooms</h1>
          
          {/* Message */}
          {message.text && (
            <div className={`mb-4 p-3 rounded ${
              message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {message.text}
            </div>
          )}

          {/* Add Classroom Form */}
          <form onSubmit={handleAddClassroom} className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Classroom</h2>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-48">
                <label htmlFor="classroomNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Classroom Number
                </label>
                <input 
                  id="classroomNumber"
                  type="text" 
                  minLength={1}
                  maxLength={10}
                  value={classroomNumber}
                  onChange={(e) => setClassroomNumber(e.target.value)}
                  placeholder="e.g., 9101, 6201" 
                  className="border border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:outline-none" 
                  required
                />
              </div>

              <div className="flex-1 min-w-48">
                <label htmlFor="classroomType" className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Classroom
                </label>
                <select 
                  id="classroomType"
                  value={classroomType}
                  onChange={(e) => setClassroomType(e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:outline-none bg-white"
                  required
                >
                  <option value="" disabled>Select from dropdown</option>
                  <option value="classroom">Classroom</option>
                  <option value="lab">Lab</option>
                </select>
              </div>

              <div className="flex-shrink-0">
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors h-12 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Classroom'}
                </button>
              </div>
            </div>
          </form>

          {/* Classrooms Table */}
          <div className="bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Existing Classrooms</h2>
            {loading && classrooms.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Loading classrooms...</div>
            ) : classrooms.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No classrooms found. Add one above.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classroom Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {classrooms.map((classroom) => (
                      <tr key={classroom.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === classroom.id ? (
                            <input
                              type="text"
                              value={editNumber}
                              onChange={(e) => setEditNumber(e.target.value)}
                              className="border border-gray-300 p-2 rounded w-full"
                            />
                          ) : (
                            <div className="text-sm font-medium text-gray-900">{classroom.number}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === classroom.id ? (
                            <select
                              value={editType}
                              onChange={(e) => setEditType(e.target.value)}
                              className="border border-gray-300 p-2 rounded w-full"
                            >
                              <option value="classroom">Classroom</option>
                              <option value="lab">Lab</option>
                            </select>
                          ) : (
                            <div className="text-sm text-gray-900 capitalize">{classroom.type}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {editingId === classroom.id ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleUpdateClassroom(classroom.id)}
                                disabled={loading}
                                className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                              >
                                Save
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => startEdit(classroom)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteClassroom(classroom.id)}
                                disabled={loading}
                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageClassroom;
