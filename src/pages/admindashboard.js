import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaDoorOpen, FaUsers, FaBook, FaCog, FaCalendarAlt } from "react-icons/fa";
import ManageFaculty from "./ManageFaculty";
import ManageDivision from "./ManageDivision";
import ManageSubjects from "./ManageSubjects";
import ManageSettings from "./ManageSettings";
import ManageClassroom from "./ManageClassroom";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();

  const handleSectionClick = (sectionKey) => {
    setActiveSection(sectionKey);
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
        return <ManageFaculty />;
      case "classrooms":
        return <ManageClassroom />;
      case "divisions":
        return <ManageDivision />;
      case "subjects":
        return <ManageSubjects />;
      case "settings":
        return <ManageSettings />;
      case "generate":
        return <h2 className="text-2xl font-semibold">Generate Timetable - Coming Soon</h2>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        {/* Sidebar - Only show when a section is active */}
        {activeSection && (
          <aside className="hidden md:flex w-64 bg-white shadow-lg border-r border-gray-200 flex-col">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">{sections.find(s => s.key === activeSection)?.label}</h2>
              <p className="text-sm text-gray-500 mt-1">Management Panel</p>
            </div>
            <nav className="flex-1 p-4">
              <button
                onClick={() => setActiveSection("")}
                className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </button>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className={`flex-1 p-8 ${activeSection ? 'max-w-6xl' : 'max-w-7xl'} mx-auto w-full`}>
        {/* Top header */}
        <div className="mb-10">
          <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-3 text-gray-800">
                  SmartStacks
                </h1>
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Administrative Control Center</h2>
                <p className="text-gray-600 text-lg">Intelligent Timetable Management System</p>
              </div>
              <div className="hidden lg:block">
                <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                  <div className="text-3xl font-bold text-gray-800">2025</div>
                  <div className="text-gray-600 text-sm">Academic Year</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Show cards only when no section is active */}
        {!activeSection && (
          <div className="space-y-8">
            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 via-blue-25 to-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide">Total Faculty</p>
                    <p className="text-3xl font-bold text-blue-800 mt-1">24</p>
                    <p className="text-blue-500 text-xs mt-1">Active Members</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <FaChalkboardTeacher className="text-3xl text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 via-emerald-25 to-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-emerald-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">Classrooms</p>
                    <p className="text-3xl font-bold text-emerald-800 mt-1">12</p>
                    <p className="text-emerald-500 text-xs mt-1">Available Rooms</p>
                  </div>
                  <div className="bg-emerald-100 p-3 rounded-xl">
                    <FaDoorOpen className="text-3xl text-emerald-600" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 via-purple-25 to-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-semibold uppercase tracking-wide">Divisions</p>
                    <p className="text-3xl font-bold text-purple-800 mt-1">8</p>
                    <p className="text-purple-500 text-xs mt-1">Active Batches</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <FaUsers className="text-3xl text-purple-600" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 via-amber-25 to-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-amber-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-600 text-sm font-semibold uppercase tracking-wide">Subjects</p>
                    <p className="text-3xl font-bold text-amber-800 mt-1">45</p>
                    <p className="text-amber-500 text-xs mt-1">Course Modules</p>
                  </div>
                  <div className="bg-amber-100 p-3 rounded-xl">
                    <FaBook className="text-3xl text-amber-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Management Modules */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-1 h-8 bg-blue-600 rounded-full mr-4"></div>
                Management Modules
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => handleSectionClick(s.key)}
                    className="group text-left"
                  >
                    <div className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${s.color.replace('from-', 'from-').replace('to-', 'to-').replace('500', '50').replace('600', '100')} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200`}>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg text-white bg-gradient-to-br ${s.color}`}> 
                            <s.icon className="text-xl" />
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500 font-medium">Module</div>
                            <div className="text-xs text-gray-400">Management</div>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">{s.label}</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm">{s.desc}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                            Access Module
                            <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Show section content when active */}
        {activeSection && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {renderSection()}
          </div>
        )}
        </main>
      </div>
    </div>
  );
};  

export default AdminDashboard;
