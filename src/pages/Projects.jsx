import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProjects } from "../services/projectService";

export default function Projects() {
    const [token] = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjects(token);

                setProjects(response.data.data);
            } catch (error) {
                console.log("error fetching projects.", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    // delete project by backend API
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure to delete this project?");

        if (! confirmDelete) return;

        try {
            const token = localStorage.getItem('token');

            await api.delete(`/projects/${id}`, {
                headers : {
                    Authorization: `Bearer ${token}`,
                }
            });

            // removing project from ui
            setProjects(projects.filter((project) => project.id !== id));
            alert('project deleted successfully.');
        } catch (error) {
            console.log("error to delete project", error);
        }
    }
  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">

            <div className="flex items-center justify-between md-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Projects</h1>
                <Link to="/projects/add" className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition">Add New</Link>
            </div>
        {loading ? (
            <p className="text-gray-600">Loading projects...</p>
        ) : projects.length === 0 ? (
            <p className="text-gray-600">No projects found.</p>
        ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                    </th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {projects.map((project) => (
                        <tr key="{project.id}" className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">{project.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {project.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            {project.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            {project.due_date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                            <Link to={`/projects/details/${project.id}`} className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition">
                                View
                            </Link>
                            <Link to={`/projects/edit/${project.id}`} className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500 transition">
                                Edit
                            </Link>
                            <button onClick={() => handleDelete(project.id)} className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition">
                                Delete
                            </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        )}
      </div>
    </DashboardLayout>
  );
}
