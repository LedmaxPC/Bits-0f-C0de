import { useState, useEffect } from "react";
import SchoolLayout from "../../Components/School/Layout";
import { HiPlus, HiPencil, HiTrash, HiSearch } from "react-icons/hi";

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({ id: null, name: "", surname: "", class: "", gender: "Kişi" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem("students") || "[]");
    setStudents(savedStudents);
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem("students", JSON.stringify(data));
    setStudents(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStudent.id) {
      const updatedStudents = students.map((s) => (s.id === currentStudent.id ? currentStudent : s));
      saveToLocalStorage(updatedStudents);
    } else {
      const newStudent = { ...currentStudent, id: Date.now() };
      saveToLocalStorage([...students, newStudent]);
    }
    setShowModal(false);
    setCurrentStudent({ id: null, name: "", surname: "", class: "", gender: "Kişi" });
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bu şagirdi silmək istədiyinizə əminsiniz?")) {
      const filteredStudents = students.filter((s) => s.id !== id);
      saveToLocalStorage(filteredStudents);
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SchoolLayout title="Şagird İdarəetməsi">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <HiSearch className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Axtar..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            setCurrentStudent({ id: null, name: "", surname: "", class: "", gender: "Kişi" });
            setShowModal(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <HiPlus className="-ml-1 mr-2 h-5 w-5" />
          Yeni Şagird
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Soyad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sinif</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cins</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{student.surname}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{student.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{student.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(student)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <HiPencil className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(student.id)} className="text-red-600 hover:text-red-900">
                      <HiTrash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                  Şagird tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full z-50">
              <form onSubmit={handleSubmit}>
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium leading-6 mb-4">{currentStudent.id ? "Şagirdi Redaktə Et" : "Yeni Şagird Əlavə Et"}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">Ad</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                        value={currentStudent.name}
                        onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Soyad</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                        value={currentStudent.surname}
                        onChange={(e) => setCurrentStudent({ ...currentStudent, surname: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Sinif</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                        value={currentStudent.class}
                        onChange={(e) => setCurrentStudent({ ...currentStudent, class: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Cins</label>
                      <select
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                        value={currentStudent.gender}
                        onChange={(e) => setCurrentStudent({ ...currentStudent, gender: e.target.value })}
                      >
                        <option value="Kişi">Kişi</option>
                        <option value="Qadın">Qadın</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse bg-gray-50 dark:bg-gray-700">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Yadda Saxla
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-600 dark:text-white dark:border-gray-500"
                  >
                    Ləğv Et
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </SchoolLayout>
  );
}
