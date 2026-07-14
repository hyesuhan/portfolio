import React from "react";
import { useNavigate } from "react-router-dom";
import projects from "../data/projects";
import "../assets/styles/Project.scss";

function Project() {
  const navigate = useNavigate();

  return (
    <div className="projects-container" id="projects">
      <h1>프로젝트</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project project-card"
            onClick={() => navigate(`/project/${project.id}`)}
          >
            {project.thumbnail ? (
              <img src={project.thumbnail} className="zoom" alt="thumbnail" width="100%" />
            ) : (
              <div className="project-placeholder-img">이미지 준비 중</div>
            )}
            <h2>{project.title}</h2>
            <p className="project-period-small">{project.period}</p>
            <p>{project.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
