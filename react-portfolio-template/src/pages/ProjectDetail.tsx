import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faBell, faChartLine, faCode, faServer, faDesktop, faUser, faFile, faRobot } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Navigation } from "../components";
import projects from "../data/projects";
import { useMode } from "../context/ModeContext";
import "../assets/styles/ProjectDetail.scss";

const roleIconMap: Record<string, IconDefinition> = {
  payment: faMoneyBill,
  notification: faBell,
  monitoring: faChartLine,
  api: faCode,
  infra: faServer,
  frontend: faDesktop,
  user: faUser,
  pdf: faFile,
  robot: faRobot,
};

function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mode, toggleMode } = useMode();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className={`main-container ${mode === "dark" ? "dark-mode" : "light-mode"}`}>
        <Navigation parentToChild={{ mode }} modeChange={toggleMode} backButton onBack={() => navigate(-1)} />
        <div className="project-detail-container">
          <p>프로젝트를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`main-container ${mode === "dark" ? "dark-mode" : "light-mode"}`}>
      <Navigation parentToChild={{ mode }} modeChange={toggleMode} backButton onBack={() => navigate(-1)} />

      <div className="project-detail-container">

        {/* 헤더 */}
        {project.thumbnail && (
          <img src={project.thumbnail} alt={project.title} className="pd-thumbnail" />
        )}
        <h1 className="pd-title">{project.title}</h1>
        <div className="pd-meta">
          <span>{project.period}</span>
          <span className="pd-meta-divider">·</span>
          <span>{project.teamSize}</span>
        </div>
        <p className="pd-description">{project.description}</p>

        {/* 기술 스택 — Expertise 스타일 카테고리 */}
        <div className="pd-section">
          <h2>기술 스택</h2>
          <div className="pd-tech-grid">
            {project.techCategories.map((cat, i) => (
              <div key={i} className="pd-tech-category">
                <span className="pd-tech-label">{cat.label}</span>
                <div className="flex-chips">
                  {cat.items.map((tech, j) => (
                    <Chip key={j} label={tech} className="chip" size="small" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 아키텍처 & 다이어그램 */}
        {project.diagrams.length > 0 && <div className="pd-section">
          <h2>아키텍처 & 다이어그램</h2>
          {project.diagrams.map((diagram, i) => (
            <div key={i} className="pd-diagram-block">
              <h3>{diagram.title}</h3>
              {diagram.description && <p className="pd-diagram-desc">{diagram.description}</p>}
              <img src={diagram.image} alt={diagram.title} className="pd-diagram-img" />
            </div>
          ))}
        </div>}

        {/* 담당 역할 — Expertise 스킬 카드 스타일 */}
        <div className="pd-section">
          <h2>담당 역할</h2>
          <div className="pd-roles-grid">
            {project.roles.map((role, i) => (
              <div key={i} className="pd-role-card">
                <FontAwesomeIcon icon={roleIconMap[role.iconKey]} size="3x" />
                <h3>{role.title}</h3>
                <ul className="pd-role-points">
                  {role.points.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>
                {role.troubleshooting && role.troubleshooting.length > 0 && (
                  <div className="pd-ts-block">
                    <p className="pd-ts-title">트러블슈팅</p>
                    {role.troubleshooting.map((ts, k) => (
                      <div key={k} className="pd-ts-card">
                        <div className="pd-ts-issue-row">
                          <span className="pd-ts-badge">문제</span>
                          <p className="pd-ts-issue">{ts.issue}</p>
                        </div>
                        <div className="pd-ts-solution-row">
                          <span className="pd-ts-badge pd-ts-badge--solve">해결</span>
                          <p className="pd-ts-solution">{ts.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* GitHub */}
        <div className="pd-section">
          <h2>GitHub</h2>
          <div className="pd-github-links">
            {project.github.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noreferrer">
                <Button startIcon={<GitHubIcon />} variant="outlined" className="pd-github-button">
                  {link.label}
                </Button>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProjectDetail;
