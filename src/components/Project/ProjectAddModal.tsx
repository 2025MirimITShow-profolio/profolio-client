import React, { useState } from 'react';
import styles from '../../style/ProjectAddModal.module.css';

interface ProjectAddModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
}

export default function ProjectAddModal({ open, onClose, onCreate }: ProjectAddModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!open) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>프로젝트 추가하기</h2>
        <hr className={styles.divider} />
        
        <div className={styles.inputNameGroup}>
          <label className={styles.label}>프로젝트 제목</label>
          <input
            className={styles.input}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>프로젝트 설명</label>
          <textarea
            className={styles.textarea}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        
        <div className={styles.buttonRow}>
          <button className={styles.cancelButton} onClick={onClose}>취소하기</button>
          <button className={styles.createButton} onClick={() => { onCreate(title, description); setTitle(''); setDescription(''); }}>생성하기</button>
        </div>
      </div>
    </div>
  );
};