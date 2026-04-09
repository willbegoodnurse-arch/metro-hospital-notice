import { useState } from 'react';

export default function CategoryManager({ categories, onUpdate, onClose }) {
  const [list, setList] = useState(categories.filter(c => c !== '전체'));
  const [newCat, setNewCat] = useState('');
  const [error, setError] = useState('');

  const add = () => {
    const trimmed = newCat.trim();
    if (!trimmed) return;
    if (list.includes(trimmed)) { setError('이미 존재하는 카테고리입니다.'); return; }
    setList([...list, trimmed]);
    setNewCat('');
    setError('');
  };

  const remove = (cat) => setList(list.filter(c => c !== cat));

  const save = () => {
    onUpdate(['전체', ...list]);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>카테고리 편집</h2>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <ul className="cat-list">
            {list.map(cat => (
              <li key={cat}>
                <span>{cat}</span>
                <button className="btn-remove" onClick={() => remove(cat)}>삭제</button>
              </li>
            ))}
          </ul>
          <div className="cat-add-row">
            <input
              value={newCat}
              onChange={e => { setNewCat(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && add()}
              placeholder="새 카테고리 이름"
              className="input"
            />
            <button className="btn-primary" onClick={add}>추가</button>
          </div>
          {error && <p className="error-text">{error}</p>}
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>취소</button>
          <button className="btn-primary" onClick={save}>저장</button>
        </div>
      </div>
    </div>
  );
}
