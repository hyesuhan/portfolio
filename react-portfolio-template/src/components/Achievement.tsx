import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'

function Achievement() {
  return (
    <div id="achievement">
      <div className="items-container">
        <h1>수상 및 학력</h1>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid white' }}
            date="2022 - 2026"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">홍익대학교</h3>
            <h4 className="vertical-timeline-element-subtitle">컴퓨터공학과</h4>
            <p>졸업</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid white' }}
            date="2026.04 - 2026.07"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faUsers} />}
          >
            <h3 className="vertical-timeline-element-title">스파르타 부트캠프 단기심화</h3>
            <h4 className="vertical-timeline-element-subtitle">백엔드</h4>
            <p>수료</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2025.03 - 2025.12"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faUsers} />}
          >
            <h3 className="vertical-timeline-element-title">IT 창업 동아리 CEOS</h3>
            <h4 className="vertical-timeline-element-subtitle">21기 백엔드 수료 · 22기 백엔드 운영진</h4>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2025.07"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faTrophy} />}
          >
            <h3 className="vertical-timeline-element-title">제 14회 ICT 콤플렉스 SW 개발 공모전 피우다 장려상</h3>
            <h4 className="vertical-timeline-element-subtitle">이어드림 백엔드 개발 팀장</h4>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2025.07"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faTrophy} />}
          >
            <h3 className="vertical-timeline-element-title">소셜벤처부트캠프 2기 우수상</h3>
            <h4 className="vertical-timeline-element-subtitle">이어드림 백엔드 개발 팀장</h4>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Achievement;
