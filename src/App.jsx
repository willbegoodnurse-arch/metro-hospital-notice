import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DEFAULT_CATEGORIES, DEFAULT_NOTICES } from './data/defaults';
import Header from './components/Header';
import NoticeCard from './components/NoticeCard';
import NoticeForm from './components/NoticeForm';
import CategoryManager from './components/CategoryManager';
import PasswordGate from './components/PasswordGate';
import './App.css';

function NoticeApp() {
  const [notices, setNotices] = useLocalStorage('metro_notices', DEFAULT_NOTICES);
  const [categories, setCategories] = useLocalStorage('metro_categories', DEFAULT_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState('전체');
  const [keyword, setKeyword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [showCatManager, setShowCatManager] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = notices
    .filter(n => activeCategory === '전체' || n.category === activeCategory)
    .filter(n => {
      if (!keyword.trim()) return true;
      const kw = keyword.toLowerCase();
      return n.title.toLowerCase().includes(kw) || n.content.toLowerCase().includes(kw) || n.author.toLowerCase().includes(kw);
    })
    .sort((a, b) => {
      if (a.important !== b.important) return a.important ? -1 : 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const handleSave = (data) => {
    if (editingNotice) {
      setNotices(prev => prev.map(n => n.id === editingNotice.id ? { ...n, ...data } : n));
      setEditingNotice(null);
    } else {
      const newNotice = { id: Date.now().toString(), ...data, createdAt: new Date().toISOString() };
      setNotices(prev => [newNotice, ...prev]);
    }
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    setDeleteConfirm(null);
  };

  const handleCategoryUpdate = (newCats) => {
    setCategories(newCats);
    if (!newCats.includes(activeCategory)) setActiveCategory('전체');
  };

  return (
    <div className="app">
      <Header />

      <div className="toolbar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            placeholder="제목, 내용, 작성자 검색..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          {keyword && <button className="btn-clear" onClick={() => setKeyword('')}>✕</button>}
        </div>
        <div className="toolbar-actions">
          <button className="btn-secondary" onClick={() => setShowCatManager(true)}>카테고리 편집</button>
          <button className="btn-primary" onClick={() => { setEditingNotice(null); setShowForm(true); }}>+ 공지 작성</button>
        </div>
      </div>

      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`cat-tab ${activeCategory === cat ? 'cat-tab-active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
            <span className="cat-count">
              {cat === '전체' ? notices.length : notices.filter(n => n.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      <main className="main">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>📋</p>
            <p>{keyword ? `"${keyword}"에 대한 검색 결과가 없습니다.` : '등록된 공지사항이 없습니다.'}</p>
          </div>
        ) : (
          <div className="notice-list">
            {filtered.map(notice => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                keyword={keyword.trim()}
                onEdit={handleEdit}
                onDelete={(id) => setDeleteConfirm(id)}
              />
            ))}
          </div>
        )}
        <p className="count-info">총 {filtered.length}건</p>
      </main>

      {showForm && (
        <NoticeForm
          categories={categories}
          initial={editingNotice}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingNotice(null); }}
        />
      )}

      {showCatManager && (
        <CategoryManager
          categories={categories}
          onUpdate={handleCategoryUpdate}
          onClose={() => setShowCatManager(false)}
        />
      )}

      {deleteConfirm && (
        <div className="modal-backdrop" onClick={() => setDeleteConfirm(null)}>
          <div className="modal modal-sm" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h2>공지 삭제</h2></div>
            <div className="modal-body"><p>이 공지사항을 삭제하시겠습니까? 복구할 수 없습니다.</p></div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setDeleteConfirm(null)}>취소</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteConfirm)}>삭제</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('metro_authed') === 'true');

  if (!authed) {
    return (
      <PasswordGate
        onSuccess={() => {
          sessionStorage.setItem('metro_authed', 'true');
          setAuthed(true);
        }}
      />
    );
  }

  return <NoticeApp />;
}
