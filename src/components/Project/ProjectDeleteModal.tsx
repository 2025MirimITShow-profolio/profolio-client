import React from 'react';
import styles from '../../style/ProjectDeleteModal.module.css';

interface ProjectDeleteModalProps {
  open: boolean;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ProjectDeleteModal({ open, message, onCancel, onConfirm }: ProjectDeleteModalProps) {
  if (!open) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modalBox}>
        <div className={styles.message}>{message || '프로젝트를 정말 삭제하시겠습니까?'}</div>
        <div className={styles.buttonRow}>
          <button className={styles.cancelBtn} onClick={onCancel}>취소</button>
          <button className={styles.confirmBtn} onClick={onConfirm}>확인</button>
        </div>
      </div>
    </div>
  );
} 