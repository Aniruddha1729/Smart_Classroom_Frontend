import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaDoorOpen, FaUsers, FaBook, FaCog, FaCalendarAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();

  const handleSectionClick = (sectionKey) => {
    if (sectionKey === "classrooms") {
      // Navigate to classroom page
      navigate("/classroom");
    } else {
      // Set active section for other items
      setActiveSection(sectionKey);
    }
  };

  const sections = [
    { key: "teachers", label: "Manage Faculty", desc: "Add, edit and organize faculty", icon: FaChalkboardTeacher, color: "from-indigo-500 to-indigo-600" },
    { key: "classrooms", label: "Manage Classrooms", desc: "Create rooms and capacities", icon: FaDoorOpen, color: "from-blue-500 to-blue-600" },
    { key: "divisions", label: "Manage Divisions", desc: "Setup batches and divisions", icon: FaUsers, color: "from-purple-500 to-purple-600" },
    { key: "subjects", label: "Manage Subjects", desc: "Map subjects to faculty", icon: FaBook, color: "from-teal-500 to-teal-600" },
    { key: "settings", label: "Timetable Settings", desc: "Constraints and preferences", icon: FaCog, color: "from-amber-500 to-amber-600" },
    { key: "generate", label: "Generate Timetable", desc: "Create conflict-free schedules", icon: FaCalendarAlt, color: "from-emerald-500 to-emerald-600" },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "teachers":
        return <h2 className="text-2xl font-semibold">Manage Faculty</h2>;
      case "classrooms":
        return <h2 className="text-2xl font-semibold">Manage Classrooms</h2>;
      case "divisions":
        return <h2 className="text-2xl font-semibold">Manage Divisions</h2>;
      case "subjects":
        return <h2 className="text-2xl font-semibold">Manage Subjects</h2>;
      case "settings":
        return <h2 className="text-2xl font-semibold">Timetable Settings</h2>;
      case "generate":
        return <h2 className="text-2xl font-semibold">Generate Timetable</h2>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-gradient-to-b from-indigo-700 to-indigo-800 text-white flex-col shadow-xl">
        <div className="p-5 font-bold text-xl border-b border-indigo-600">
          SmartStacks Admin
        </div>
        <nav className="flex-1 p-4 space-y-5">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => handleSectionClick(s.key)}
              className={`flex items-center w-full px-3 py-2 rounded transition-colors ${
                activeSection === s.key ? "bg-indigo-600" : "hover:bg-indigo-600/60"
              }`}
            >
              <s.icon className="mr-2" /> {s.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-indigo-600">
          <button className="bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded w-full">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-[1600px] mx-auto w-full">
        {/* Top header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Institute Control Center</h1>
            <p className="text-gray-500">Configure faculty, rooms, divisions and schedules</p>
          </div>
          <div className="flex items-center gap-3">
            <input placeholder="Search..." className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">Quick Action</button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => handleSectionClick(s.key)}
              className="group text-left"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg transition-shadow">
                <div className={`absolute inset-0 opacity-10 bg-gradient-to-r ${s.color}`}></div>
                <div className="p-6 relative">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-white bg-gradient-to-r ${s.color} shadow`}> 
                    <s.icon className="text-xl" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-800">{s.label}</h3>
                  <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
                  <div className="mt-4 flex items-center text-indigo-600 font-medium">
                    Go to {s.label}
                    <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {activeSection && (
          <div className="mt-8 bg-white shadow rounded-2xl p-6 w-full">
            {renderSection()}
            <p className="mt-2 text-gray-600">Forms, tables or content for <span className="font-medium">{sections.find(s => s.key === activeSection)?.label}</span> will appear here.</p>
          </div>
        )}
      </main>
    </div>
  );
};  

export default AdminDashboard;
