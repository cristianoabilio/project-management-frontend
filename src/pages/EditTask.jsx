import React, { useEffect, useState } from "react";
import api from "../axios";
import DashboardLayout from "../components/DashboardLayout";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function EditTask() {
    const {id} = useParams();
    const [projectId, setProjectId] = useState("");
    const [projects, setProjects] = useState([]);
    const [status, setStatus] = useState("pending");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTaskAndProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                const responseProjects = await api.get('/projects', {
                    headers : {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log(responseProjects.data.data);
                setProjects(responseProjects.data.data);

                const responseTask = await api.get(`/tasks/${id}`, {
                    headers : {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log(responseTask.data.data);
                setProjectId(responseTask.data.data.project_id);
                setTitle(responseTask.data.data.title);
                setDescription(responseTask.data.data.description);
                setDueDate(responseTask.data.data.due_date);
                setStatus(responseTask.data.data.status);

            } catch (error) {
                console.log("error fetching projects.", error);
            } finally {
                setLoading(false);
            }
        }

        fetchTaskAndProjects();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            await api.put(`/tasks/${id}`, {
                project_id: projectId,
                title: title,
                description: description,
                due_date: dueDate,
                status: status
            },
            {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }
            );

            alert("Task updated successfully.");
            navigate('/tasks');
        } catch (error) {
            console.log("Error saving task.", error);
            alert("failed to add task");
        } finally {
            setLoading(false);
        }
    }

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Add New Task
          </h2>

          <form className="space-y-4 w-full" onSubmit={handleUpdate}>

            {/* Project */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project
              </label>
                <select value={projectId}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                    onChange={(e) => setProjectId(e.target.value)}
                >
                    <option value="">Select project</option>
                    {projects.map((project) => (
                        <option value={project.id}>{project.name}</option>
                    ))}
                </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
                <select value={status}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter project title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                placeholder="Enter project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                required
              ></textarea>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow hover:bg-blue-700 transition"
              >
                {loading ? "submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
