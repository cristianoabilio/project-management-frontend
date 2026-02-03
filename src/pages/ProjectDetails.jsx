import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useParams } from "react-router-dom";
import api from "../axios";

export default function ProjectDetails() {
    const {id} = useParams();
    const [projectDetails, setProjectDetails] = useState([]);

    // fetch project details from API
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/projects/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setProjectDetails(response.data.data);
                console.log(projectDetails.tasks);
            } catch (error) {
                console.log("error loading project", error);
            }
        }

        fetchProject();
    }, [id])
  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Project Info Card */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {projectDetails?.name}
          </h2>
          <p className="text-gray-600 mb-4">
            {projectDetails?.description}
          </p>
          <div className="flex flex-wrap gap-6">
            <div>
              <span className="text-sm text-gray-500">Due Date</span>
              <p className="text-gray-800 font-medium">{projectDetails?.due_date}</p>
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        {projectDetails.tasks?.length === 0 ? (
            <p className="text-gray-600">No tasks found.</p>
        ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                    </th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {projectDetails.tasks?.map((task) => (
                        <tr key={task.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">{task.id}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">
                            {task?.title}
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                            {task.description}
                            </td>
                            <td className="px-6 py-4 text-gray-700">{task.due_date}</td>
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
