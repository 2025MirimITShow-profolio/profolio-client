import React, { useState, useEffect } from 'react';
import styles from '../../style/ProjectCarousel.module.css';

interface Project {
  id: number;
  name: string;
  description?: string;
}

interface ProjectCarouselProps {
  projects: Project[];
  centerIdx: number;
  onCenterChange: (idx: number) => void;
  showClockNumbers?: boolean;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, centerIdx, onCenterChange, showClockNumbers }) => {
  const [angle, setAngle] = useState(0);
  const projectCount = projects.length;
  const radius = 340;
  const clockRadius = 370;

  // 각도와 인덱스 동기화
  useEffect(() => {
    setAngle(-((360 / projectCount) * centerIdx));
  }, [centerIdx, projectCount]);

  // 휠로 회전
  const handleWheel = (e: React.WheelEvent) => {
    if (projectCount === 0) return;
    if (e.deltaY > 0) {
      onCenterChange((centerIdx + 1) % projectCount);
    } else if (e.deltaY < 0) {
      onCenterChange((centerIdx - 1 + projectCount) % projectCount);
    }
  };

  return (
    <div className={styles.carouselContainer} onWheel={handleWheel}>
      {showClockNumbers && (
        <svg
          width={clockRadius * 2}
          height={clockRadius * 2}
          className={styles.clockSvg}
          style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}
        >
          <circle
            cx={clockRadius}
            cy={clockRadius}
            r={clockRadius - 18}
            fill="none"
            stroke="#e0dfe6"
            strokeWidth="2.5"
          />
          {projects.map((_, idx) => {
            const theta = (360 / projectCount) * idx - 90;
            const x = clockRadius + (clockRadius - 38) * Math.cos((theta * Math.PI) / 180);
            const y = clockRadius + (clockRadius - 38) * Math.sin((theta * Math.PI) / 180);
            return (
              <text
                key={idx}
                x={x}
                y={y}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="2.8rem"
                fill="#e0dfe6"
                fontWeight="bold"
                style={{ userSelect: 'none', fontFamily: 'inherit' }}
              >
                {String(idx + 1).padStart(2, '0')}
              </text>
            );
          })}
        </svg>
      )}
      <div
        className={styles.carousel}
        style={{ transform: `rotate(${angle}deg)` }}
      >
        {projects.map((project, idx) => {
          const theta = (360 / projectCount) * idx;
          const x = radius * Math.cos((theta * Math.PI) / 180);
          const y = radius * Math.sin((theta * Math.PI) / 180);
          const isCenter = idx === centerIdx;
          return (
            <div
              key={project.id}
              className={styles.projectItem + (isCenter ? ' ' + styles.center : '')}
              style={{
                transform: `translate(${x}px, ${y}px) rotate(${-angle}deg)`
              }}
              onClick={() => onCenterChange(idx)}
            >
              {project.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectCarousel; 