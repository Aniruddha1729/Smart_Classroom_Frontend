import { useEffect, useState } from "react";
import axios from "axios";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState("");
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch teachers from backend
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/teachers");
      setTeachers(res.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  // ✅ Add or Update teacher
  const handleSubmit = async (e) => {
    e.preventDefault();
    const teacherData = { 
      name, 
      subjects: subjects.split(",").map((s) => s.trim()) 
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/teachers/${editingId}`, teacherData);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/teachers", teacherData);
      }
      setName("");
      setSubjects("");
      fetchTeachers();
    } catch (error) {
      console.error("Error saving teacher:", error);
    }
  };

  // ✅ Delete teacher
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`);
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  // ✅ Edit teacher (populate form)
  const handleEdit = (teacher) => {
    setName(teacher.name);
    setSubjects(teacher.subjects.join(", "));
    setEditingId(teacher._id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">👨‍🏫 Manage Teachers</h2>

      {/* Teacher Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded mb-8">
        <div className="mb-4">
          <label className="block mb-2 font-medium">Teacher Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Prof. John"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Subjects (comma separated)</label>
          <input
            type="text"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
            placeholder="e.g. DSA, DSL"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          {editingId ? "Update Teacher" : "Add Teacher"}
        </button>
      </form>

      {/* Teacher List */}
      <div className="bg-white shadow rounded p-6">
        <h3 className="text-xl font-semibold mb-4">All Teachers</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Subjects</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id} className="text-center">
                <td className="p-2 border">{teacher.name}</td>
                <td className="p-2 border">{teacher.subjects.join(", ")}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(teacher._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {teachers.length === 0 && (
              <tr>
                <td colSpan="3" className="p-4 text-gray-500">
                  No teachers added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teachers;
