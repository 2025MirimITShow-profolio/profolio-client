import React from 'react';
import styles from '../../style/ProjectMainInfo.module.css';
import ProjectMenuButton from './ProjectMenuButton';

interface ProjectMainInfoProps {
  name: string;
  description: string;
  onDelete: () => void;
  onShare: () => void;
}

export default function ProjectMainInfo({ name, description, onDelete, onShare }: ProjectMainInfoProps) {
  return (
    <div className={styles.mainInfoContainer}>
      <div className={styles.row}>
        <span className={styles.projectName}>{name}</span>
        <ProjectMenuButton onDelete={onDelete} onShare={onShare} />
      </div>
      <div className={styles.projectDesc}>{description}</div>
    </div>
  );
} 