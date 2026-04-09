import { useState } from 'react';

export default function NoticeForm({ categories, initial, onSave, onClose }) {
  const [content, setContent] = useState(initial?.content ?? '');
  const [category, setCategory] = useState(initial?.category ?? categories.filter(c => c !== '전체')[0] ?? '');
  const [important, setImportant] = useState(initial?.important ?? false);
  const [error, setError] = useState('');

  const submit = () => {
    if (!content.trim()) { setError('내용을 입력하세요.'); return; }
    onSave({ content: content.trim(), category, important });
    onClose();
  };

  const cats = categories.filter(c => c !== '전체');

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal-large" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{initial ? '공지 수정' : '새 공지 작성'}</h2>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-row">
            <label>카테고리</label>
            <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
              {cats.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label>내용 *</label>
            <textarea
              className={`input textarea ${error ? 'input-error' : ''}`}
              value={content}
              onChange={e => { setContent(e.target.value); setError(''); }}
              placeholder="공지 내용을 입력하세요..."
              rows={10}
            />
            {error && <span className="error-text">{error}</span>}
          </div>
          <div className="form-row form-check">
            <input type="checkbox" id="important" checked={important} onChange={e => setImportant(e.target.checked)} />
            <label htmlFor="important">중요 공지로 표시</label>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>취소</button>
          <button className="btn-primary" onClick={submit}>{initial ? '수정 완료' : '등록'}</button>
        </div>
      </div>
    </div>
  );
}
