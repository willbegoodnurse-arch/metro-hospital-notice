import { useState } from 'react';
import logoImg from '../assets/metro-logo.png';

const PASSWORD = '123';

export default function PasswordGate({ onSuccess }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setInput('');
    }
  };

  return (
    <div className="gate-backdrop">
      <div className="gate-box">
        <img src={logoImg} alt="메트로병원" className="gate-logo" />
        <h2 className="gate-title">중환자실 공지사항</h2>
        <p className="gate-sub">접근 권한이 필요합니다</p>
        <form onSubmit={handleSubmit} className="gate-form">
          <input
            type="password"
            className={`input gate-input ${error ? 'input-error' : ''}`}
            placeholder="비밀번호를 입력하세요"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false); }}
            autoFocus
          />
          {error && <p className="error-text">비밀번호가 올바르지 않습니다.</p>}
          <button type="submit" className="btn-primary gate-btn">확인</button>
        </form>
      </div>
    </div>
  );
}
