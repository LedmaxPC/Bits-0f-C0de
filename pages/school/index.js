import { useState, useEffect } from "react";
import SchoolLayout from "../../Components/School/Layout";
import { HiUserGroup, HiUser, HiBookOpen, HiTrendingUp } from "react-icons/hi";

export default function SchoolDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    attendance: "95%",
  });

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem("students") || "[]");
    const teachers = JSON.parse(localStorage.getItem("teachers") || "[]");
    const classes = JSON.parse(localStorage.getItem("classes") || "[]");

    setStats({
      students: students.length,
      teachers: teachers.length,
      classes: classes.length,
      attendance: "95%",
    });
  }, []);

  const statCards = [
    { name: "Ümumi Şagirdlər", value: stats.students, icon: HiUserGroup, color: "bg-blue-500" },
    { name: "Ümumi Müəllimlər", value: stats.teachers, icon: HiUser, color: "bg-green-500" },
    { name: "Ümumi Siniflər", value: stats.classes, icon: HiBookOpen, color: "bg-purple-500" },
    { name: "Davamiyyət", value: stats.attendance, icon: HiTrendingUp, color: "bg-yellow-500" },
  ];

  return (
    <SchoolLayout title="İdarəetmə Paneli">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center">
            <div className={`p-3 rounded-full text-white ${card.color} mr-4`}>
              <card.icon className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{card.name}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Son Bildirişlər</h3>
          <ul className="space-y-4">
            <li className="flex items-start border-b border-gray-100 dark:border-gray-700 pb-4">
              <span className="h-2 w-2 mt-2 bg-indigo-500 rounded-full mr-3"></span>
              <div>
                <p className="text-sm font-medium">Yeni dərs cədvəli təsdiqləndi</p>
                <p className="text-xs text-gray-500">2 saat əvvəl</p>
              </div>
            </li>
            <li className="flex items-start border-b border-gray-100 dark:border-gray-700 pb-4">
              <span className="h-2 w-2 mt-2 bg-green-500 rounded-full mr-3"></span>
              <div>
                <p className="text-sm font-medium">Valideyn iclası sabah saat 15:00-da keçiriləcək</p>
                <p className="text-xs text-gray-500">5 saat əvvəl</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="h-2 w-2 mt-2 bg-yellow-500 rounded-full mr-3"></span>
              <div>
                <p className="text-sm font-medium">İllik hesabatın son təqdimat tarixi: 15 İyun</p>
                <p className="text-xs text-gray-500">1 gün əvvəl</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Məktəb Haqqında Qısa Məlumat</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Məktəb Adı:</span>
              <span className="font-medium">Bakı Müasir Təhsil Kompleksi</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Ünvan:</span>
              <span className="font-medium">Bakı şəhəri, Heydər Əliyev pr. 115</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Tədris ili:</span>
              <span className="font-medium">2023-2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Status:</span>
              <span className="text-green-500 font-medium">Aktiv</span>
            </div>
          </div>
        </div>
      </div>
    </SchoolLayout>
  );
}
