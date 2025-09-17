import React, { useState } from 'react';

function Classroom() {
  const [classroomNumber, setClassroomNumber] = useState('');
  const [classroomType, setClassroomType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Classroom Number:', classroomNumber);
    console.log('Classroom Type:', classroomType);
    // Add your save logic here
  };

  return (
    <div className="classroom-content min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Classroom Management</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-48">
                  <label htmlFor="classroomNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Classroom Number
                  </label>
                  <input 
                    id="classroomNumber"
                    type="text" 
                    minLength={4}
                    maxLength={4}
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
                  <div className="relative">
                    <select 
                      id="classroomType"
                      value={classroomType}
                      onChange={(e) => setClassroomType(e.target.value)}
                      className="border border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white appearance-none cursor-pointer transition-all duration-300 ease-in-out hover:border-gray-400 hover:shadow-md shadow-sm"
                      required
                    >
                      <option value="" disabled>Select from dropdown</option>
                      <option value="classroom">Classroom</option>
                      <option value="lab">Lab</option>
                    </select>
                    {/* Custom dropdown arrow with animation */}
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400 transition-transform duration-300 ease-in-out hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <button 
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors h-12"
                  >
                    Save Classroom
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Classroom;
