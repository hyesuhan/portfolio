import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faServer, faDisplay } from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
    "Java",
    "Spring Boot",
    "Spring Security",
    "JPA",
    "QueryDSL",
    "JWT",
    "Kafka",
    "WebSocket",
    "MSA",
    "Spring Cloud Eureka",
    "Spring Cloud Gateway",
    "OpenFeign",
];

const labelsSecond = [
    "Docker",
    "Docker Compose",
    "Nginx",
    "EC2",
    "RDS",
    "S3",
    "ECR",
    "CloudFront",
    "Route53",
    "AWS ALB",
    "Github Actions",
    "Terraform"
];

const labelsThird = [
    "MySQL",
    "PostgreSQL",
    "Redis",
    "Grafana",
    "Tempo",
    "Loki",
    "Prometheus",
    "Grafana Alloy",
    "K6",
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>기술</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faCode} size="3x"/>
                    <h3>백엔드 개발</h3>
                    <p>Java와 Spring을 활용해 백엔드 서비스를 설계하고 개발합니다. MSA 구조에서 Spring Cloud를 활용한 서비스 간 통신과 Kafka를 이용한 비동기 이벤트 처리 경험이 있습니다.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faServer} size="3x"/>
                    <h3>인프라 & DevOps</h3>
                    <p>Docker와 AWS를 활용하여 서비스를 컨테이너화하고 클라우드 환경에 배포합니다. Terraform/Github Actions 을 활용한 EC2, RDS, S3 등 AWS 핵심 서비스를 운용하며 안정적인 인프라를 구성한 경험이 있습니다.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faDisplay} size="3x"/>
                    <h3>데이터베이스 & 모니터링</h3>
                    <p>MySQL, PostgreSQL, Redis 등 다양한 데이터베이스를 목적에 맞게 선택하여 사용합니다. Grafana, Prometheus, Loki 기반의 모니터링 스택을 구축하고 K6로 부하 테스트를 진행한 경험이 있습니다.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsThird.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;
