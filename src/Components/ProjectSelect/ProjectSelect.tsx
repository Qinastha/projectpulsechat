import "./ProjectSelect.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllProjects, setSelectedProject } from "../../store/chatSlice";
import { useState } from "react";

export const ProjectSelect = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(getAllProjects);
  const [showProjects, setShowProjects] = useState(false);

  const selectCurrentProject = (projectId: string) => {
    dispatch(setSelectedProject(projectId));
    setShowProjects(false);
  };

  return (
    <div className="project-navbar-container">
      <h3 onClick={() => setShowProjects(!showProjects)}>List of projects</h3>
      <div
        className={`projectList__container ${showProjects ? "visible" : ""}`}>
        {projects.map(project => (
          <div
            key={project._id}
            className="projectCard"
            onClick={() => selectCurrentProject(project._id)}>
            <img src={project.projectAvatar} alt="project avatar" />
            <p>{project.projectName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
