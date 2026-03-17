import api from "../axios";

// get all projects
export const getProjects = async (token) => {
    try {
        const response = await api.get('/projects', {
            headers : {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error("Error fetching projects", error);
    }
}

// delete project
export const deleteProject = async (id, token) => {
    try {
        const response = await api.delete(`/projects/${id}`, {
            headers : {
                Authorization: `Bearer ${token}`,
            }
        });

        return response;
    } catch (error) {
        console.error("Error deleting project", error);
    }
}