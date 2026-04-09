import { useState } from 'react';

function highlight(text, keyword) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <mark key={i}>{part}</mark> : part
  );
}

export default function NoticeCard({ notice, keyword, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const date = new Date(notice.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className={`notice-card ${notice.important ? 'notice-important' : ''}`}>
      <div className="notice-card-header" onClick={() => setExpanded(e => !e)}>
        <div className="notice-meta-top">
          {notice.important && <span className="badge-important">중요</span>}
          <span className="badge-category">{notice.category}</span>
          <span className="notice-date">{date}</span>
          <span className="expand-icon">{expanded ? '▲' : '▼'}</span>
        </div>
        <p className="notice-preview">{highlight(notice.content.slice(0, 80), keyword)}{notice.content.length > 80 && !expanded ? '...' : ''}</p>
      </div>
      {expanded && (
        <div className="notice-content">
          <p>{highlight(notice.content, keyword)}</p>
          <div className="notice-actions">
            <button className="btn-secondary btn-sm" onClick={() => onEdit(notice)}>수정</button>
            <button className="btn-danger btn-sm" onClick={() => onDelete(notice.id)}>삭제</button>
          </div>
        </div>
      )}
    </div>
  );
}
