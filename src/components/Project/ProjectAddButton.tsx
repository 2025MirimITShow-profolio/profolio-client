import React from 'react';
import styles from '../../style/ProjectAddButton.module.css';

interface ProjectAddButtonProps {
  onClick: () => void;
}

export default function ProjectAddButton({ onClick }: ProjectAddButtonProps) {
  return (
    <button className={styles.addButton} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M14 7.5H7.5M7.5 7.5H1M7.5 7.5V1M7.5 7.5V14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>프로젝트 추가
    </button>
  );
}
