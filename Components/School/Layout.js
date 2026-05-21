import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  HiViewGrid,
  HiUserGroup,
  HiUser,
  HiBookOpen,
  HiMenu,
  HiX,
  HiHome
} from "react-icons/hi";
import { useTheme } from "next-themes";
import { HiSun, HiMoon } from "react-icons/hi";

const SchoolLayout = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const navItems = [
    { name: "Panel", href: "/school", icon: HiViewGrid },
    { name: "Şagirdlər", href: "/school/students", icon: HiUserGroup },
    { name: "Müəllimlər", href: "/school/teachers", icon: HiUser },
    { name: "Siniflər", href: "/school/classes", icon: HiBookOpen },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex text-gray-900 dark:text-gray-100">
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-indigo-700 dark:bg-indigo-900 text-white transition duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center mt-8 px-4">
          <div className="flex items-center">
            <span className="text-2xl font-semibold">Məktəb Sistemi</span>
          </div>
        </div>

        <nav className="mt-10 px-4">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <a className={`flex items-center mt-4 py-2 px-6 rounded-lg transition-colors duration-200 ${router.pathname === item.href ? "bg-indigo-800 dark:bg-indigo-800" : "hover:bg-indigo-600 dark:hover:bg-indigo-800"}`}>
                <item.icon className="h-5 w-5" />
                <span className="mx-3">{item.name}</span>
              </a>
            </Link>
          ))}

          <div className="border-t border-indigo-600 my-6 pt-6">
            <Link href="/">
              <a className="flex items-center py-2 px-6 rounded-lg hover:bg-indigo-600 dark:hover:bg-indigo-800 transition-colors duration-200">
                <HiHome className="h-5 w-5" />
                <span className="mx-3">Ana Səhifə</span>
              </a>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-800 border-b-2 border-indigo-600">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none lg:hidden"
            >
              <HiMenu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-semibold ml-4 lg:ml-0">{title}</h1>
          </div>

          <div className="flex items-center">
            <button
              aria-label="Toggle Dark Mode"
              type="button"
              className="h-10 w-10 order-1 md:order-2 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 hover:ring-2 ring-gray-300 transition-all duration-300 focus:outline-none"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {mounted && (
                theme === 'dark' ? (
                  <HiSun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <HiMoon className="h-5 w-5 text-indigo-500" />
                )
              )}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SchoolLayout;
