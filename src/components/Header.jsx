import logoImg from '../assets/metro-logo.png';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <img src={logoImg} alt="메트로병원" className="header-logo" />
        <div className="header-title">
          <h1>중환자실 공지사항</h1>
          <span>ICU Notice Board</span>
        </div>
      </div>
    </header>
  );
}
