import { useState } from 'react';

export default function NoticeForm({ categories, initial, onSave, onClose }) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [content, setContent] = useState(initial?.content ?? '');
  const [category, setCategory] = useState(initial?.category ?? categories.filter(c => c !== '전체')[0] ?? '');
  const [author, setAuthor] = useState(initial?.author ?? '');
  const [important, setImportant] = useState(initial?.important ?? false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = '제목을 입력하세요.';
    if (!content.trim()) e.content = '내용을 입력하세요.';
    if (!author.trim()) e.author = '작성자를 입력하세요.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    onSave({ title: title.trim(), content: content.trim(), category, author: author.trim(), important });
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
            <label>제목 *</label>
            <input className={`input ${errors.title ? 'input-error' : ''}`} value={title} onChange={e => setTitle(e.target.value)} placeholder="공지 제목" />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>
          <div className="form-row form-row-half">
            <div>
              <label>카테고리</label>
              <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
                {cats.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label>작성자 *</label>
              <input className={`input ${errors.author ? 'input-error' : ''}`} value={author} onChange={e => setAuthor(e.target.value)} placeholder="작성자 이름" />
              {errors.author && <span className="error-text">{errors.author}</span>}
            </div>
          </div>
          <div className="form-row">
            <label>내용 *</label>
            <textarea className={`input textarea ${errors.content ? 'input-error' : ''}`} value={content} onChange={e => setContent(e.target.value)} placeholder="공지 내용을 입력하세요..." rows={8} />
            {errors.content && <span className="error-text">{errors.content}</span>}
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
