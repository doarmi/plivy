import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginPageContainer } from './Login.styles';
import Toast from '../components/Toast';

const USERS_KEY = 'plivy_users';
const SESSION_KEY = 'plivy_session';

type StoredUser = { id: string; email: string; password: string; nickname: string };

const readUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw) as StoredUser[];
  } catch {
    // 저장 데이터가 손상된 경우 데모 계정으로 초기화합니다.
  }
  const demoUser: StoredUser = { id: 'user_demo', email: 'demo@plivy.app', password: 'plivy1234', nickname: 'Demo User' };
  localStorage.setItem(USERS_KEY, JSON.stringify([demoUser]));
  return [demoUser];
};

const Login: React.FC = () => {
  const [view, setView] = useState<'login' | 'signup' | 'forgot'>('login');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [forgotNotice, setForgotNotice] = useState('');
  const [toast, setToast] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [playerPlaying, setPlayerPlaying] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2200);
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '');
    const nextErrors: Record<string, string> = {};

    if (!isValidEmail(email)) nextErrors['login-email'] = '올바른 이메일 형식을 입력해주세요.';
    if (!password) nextErrors['login-password'] = '비밀번호를 입력해주세요.';
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }

    const user = readUsers().find((item) => item.email === email);
    if (!user) { setErrors({ 'login-password': '가입되지 않은 이메일이에요.' }); return; }
    if (user.password !== password) { setErrors({ 'login-password': '비밀번호가 일치하지 않아요.' }); return; }

    localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id }));
    setErrors({});
    navigate('/');
  };

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nickname = String(form.get('nickname') || '').trim();
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '');
    const nextErrors: Record<string, string> = {};

    if (!nickname) nextErrors['signup-nickname'] = '닉네임을 입력해주세요.';
    if (!isValidEmail(email)) nextErrors['signup-email'] = '올바른 이메일 형식을 입력해주세요.';
    if (password.length < 8) nextErrors['signup-password'] = '비밀번호는 8자 이상이어야 해요.';
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }

    const users = readUsers();
    if (users.some((item) => item.email === email)) {
      setErrors({ 'signup-email': '이미 가입된 이메일이에요.' });
      return;
    }

    const user: StoredUser = { id: `user_${Date.now()}`, email, password, nickname };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
    localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id }));
    setErrors({});
    navigate('/');
  };

  const handleForgot = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '').trim();
    if (!isValidEmail(email)) {
      setErrors({ 'forgot-email': '올바른 이메일 형식을 입력해주세요.' });
      setForgotNotice('');
      return;
    }
    const exists = readUsers().some((item) => item.email === email);
    if (!exists) {
      setErrors({ 'forgot-email': '가입되지 않은 이메일이에요.' });
      setForgotNotice('');
      return;
    }

    setErrors({});
    setForgotNotice('');
    setIsSendingReset(true);

    try {
      const response = await fetch('/api/password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await response.json().catch(() => ({})) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || '메일 전송에 실패했어요.');
      }

      setForgotNotice(`${email} 주소로 재설정 메일을 보냈어요.`);
      notify('재설정 메일을 전송했어요.');
    } catch (error) {
      const message = error instanceof Error ? error.message : '메일 전송에 실패했어요.';
      setErrors({ 'forgot-email': message });
    } finally {
      setIsSendingReset(false);
    }
  };

  return (
    <LoginPageContainer className="app-container login-page">
      <div className="brand">
        <h1 className="brand-logo">PLIVY</h1>
        <p className="brand-tagline">Digital Memory Player</p>
      </div>

      <div className="player-card card">
        <div className="player-screen">
          <div className="collage" aria-hidden="true">
            <div className="collage-photo collage-photo--1"></div>
            <div className="collage-photo collage-photo--2"></div>
            <div className="collage-photo collage-photo--3"><span>Summer Fest '23</span></div>
          </div>
          <div className="player-progress">
            <div className="player-progress-bar">
              <div className="player-progress-bar-fill"></div>
            </div>
            <div className="player-progress-time">
              <span>02:45</span>
              <span>04:12</span>
            </div>
          </div>
        </div>

        <div className="player-controls">
          <button type="button" className="btn-icon-circle" aria-label="이전 트랙" onClick={() => notify('이전 트랙으로 이동했어요.')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 5v14M20 6.5v11a1 1 0 0 1-1.53.85L7 12l11.47-6.35A1 1 0 0 1 20 6.5Z" fill="currentColor"/></svg>
          </button>
          <button type="button" className="btn-icon-circle btn-icon-circle--primary" aria-label={playerPlaying ? '일시정지' : '재생'} onClick={() => { setPlayerPlaying(v => !v); notify(playerPlaying ? '재생을 일시정지했어요.' : '플레이어 데모를 재생했어요.'); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 5.5v13a1 1 0 0 0 1.53.85l10.5-6.5a1 1 0 0 0 0-1.7l-10.5-6.5A1 1 0 0 0 7 5.5Z" fill="currentColor"/></svg>
          </button>
          <button type="button" className="btn-icon-circle" aria-label="다음 트랙" onClick={() => notify('다음 트랙으로 이동했어요.')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 5v14M4 6.5v11a1 1 0 0 0 1.53.85L17 12 5.53 5.65A1 1 0 0 0 4 6.5Z" fill="currentColor"/></svg>
          </button>
        </div>
      </div>

      <div className="auth-panel">
        {/* ============ 로그인 ============ */}
        {view === 'login' && (
          <section className="auth-view" id="view-login" data-view="login">
            <h2 className="auth-heading">로그인</h2>
            <p className="auth-subtitle">음악과 함께한 순간을 기록하세요.</p>

            <form className="auth-form" id="form-login" noValidate onSubmit={handleLogin}>
              <div className="field">
                <label className="field-label" htmlFor="login-email">이메일</label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.6"/><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <input className="input-field" type="email" id="login-email" name="email" placeholder="email@example.com" autoComplete="email" required />
                </div>
                <p className="field-error" data-error-for="login-email">{errors['login-email'] || ''}</p>
              </div>

              <div className="field">
                <label className="field-label" htmlFor="login-password">비밀번호</label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="5" y="10.5" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M8 10.5V8a4 4 0 1 1 8 0v2.5" stroke="currentColor" strokeWidth="1.6"/></svg>
                  </span>
                  <input className="input-field" type="password" id="login-password" name="password" placeholder="••••••••" autoComplete="current-password" required />
                </div>
                <p className="field-error" data-error-for="login-password">{errors['login-password'] || ''}</p>
                <div className="field-aux-row">
                  <button type="button" className="btn-text" onClick={() => { setErrors({}); setForgotNotice(''); setView('forgot'); }}>비밀번호를 잊으셨나요?</button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary auth-submit">
                <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3" fill="currentColor"/></svg>
                로그인
              </button>
            </form>

            <div className="divider-label auth-divider">또는</div>

            <div className="social-row">
              <button type="button" className="btn btn-social" id="btn-google" onClick={() => notify('Google 로그인은 OAuth 설정 후 사용할 수 있어요.')}>
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.44H12v4.62h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81Z"/><path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.88-3c-1.08.73-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.11A12 12 0 0 0 12 24Z"/><path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.26a12 12 0 0 0 0 10.75l4.01-3.11Z"/><path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.26 6.63l4.01 3.1C6.22 6.88 8.87 4.77 12 4.77Z"/></svg>
                Google
              </button>
              <button type="button" className="btn btn-social btn-social--dark" id="btn-apple" onClick={() => notify('Apple 로그인은 OAuth 설정 후 사용할 수 있어요.')}>
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none"><path d="M11.6 8.48c.02 2.03 1.78 2.71 1.8 2.72-.02.05-.28.96-.93 1.9-.56.8-1.15 1.6-2.07 1.62-.9.02-1.2-.53-2.23-.53s-1.35.51-2.2.55c-.88.03-1.56-.87-2.13-1.67-1.16-1.63-2.04-4.62-.85-6.63.59-.99 1.63-1.62 2.77-1.64.88-.02 1.7.59 2.23.59.53 0 1.53-.73 2.58-.62.44.02 1.68.18 2.47 1.35-.06.04-1.47.86-1.44 2.36Zm-1.86-4.6c.47-.57.79-1.36.7-2.15-.68.03-1.5.45-1.99 1.02-.44.5-.82 1.31-.72 2.08.75.06 1.53-.38 2.01-.95Z" fill="#fff"/></svg>
                Apple
              </button>
            </div>

            <p className="auth-switch">계정이 없으신가요? <button type="button" className="btn-text" onClick={() => { setErrors({}); setView('signup'); }}>회원가입</button></p>
          </section>
        )}

        {/* ============ 회원가입 ============ */}
        {view === 'signup' && (
          <section className="auth-view" id="view-signup" data-view="signup">
            <button type="button" className="auth-back" onClick={() => { setErrors({}); setForgotNotice(''); setView('login'); }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              로그인으로 돌아가기
            </button>

            <h2 className="auth-heading">회원가입</h2>
            <p className="auth-subtitle">당신의 순간을 기록할 계정을 만들어요.</p>

            <form className="auth-form" id="form-signup" noValidate onSubmit={handleSignup}>
              <div className="field">
                <label className="field-label" htmlFor="signup-nickname">닉네임</label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6"/><path d="M5 19.5c1.2-3.2 3.9-5 7-5s5.8 1.8 7 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  </span>
                  <input className="input-field" type="text" id="signup-nickname" name="nickname" placeholder="닉네임을 입력하세요" autoComplete="nickname" required />
                </div>
                <p className="field-error" data-error-for="signup-nickname">{errors['signup-nickname'] || ''}</p>
              </div>

              <div className="field">
                <label className="field-label" htmlFor="signup-email">이메일</label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.6"/><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <input className="input-field" type="email" id="signup-email" name="email" placeholder="email@example.com" autoComplete="email" required />
                </div>
                <p className="field-error" data-error-for="signup-email">{errors['signup-email'] || ''}</p>
              </div>

              <div className="field">
                <label className="field-label" htmlFor="signup-password">비밀번호</label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="5" y="10.5" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M8 10.5V8a4 4 0 1 1 8 0v2.5" stroke="currentColor" strokeWidth="1.6"/></svg>
                  </span>
                  <input className="input-field" type="password" id="signup-password" name="password" placeholder="8자 이상 입력하세요" autoComplete="new-password" required />
                </div>
                <p className="field-error" data-error-for="signup-password">{errors['signup-password'] || ''}</p>
              </div>

              <button type="submit" className="btn btn-primary auth-submit">
                <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3" fill="currentColor"/></svg>
                회원가입
              </button>
            </form>

            <p className="auth-switch">이미 계정이 있으신가요? <button type="button" className="btn-text" onClick={() => { setErrors({}); setForgotNotice(''); setView('login'); }}>로그인</button></p>
          </section>
        )}

        {/* ============ 비밀번호 찾기 ============ */}
        {view === 'forgot' && (
          <section className="auth-view" id="view-forgot" data-view="forgot">
            <button type="button" className="auth-back" onClick={() => { setErrors({}); setForgotNotice(''); setView('login'); }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              로그인으로 돌아가기
            </button>

            <h2 className="auth-heading">비밀번호 찾기</h2>
            <p className="auth-subtitle">가입하신 이메일로 재설정 링크를 보내드려요.</p>

            <form className="auth-form" id="form-forgot" noValidate onSubmit={handleForgot}>
              <div className="field">
                <label className="field-label" htmlFor="forgot-email">이메일</label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.6"/><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <input className="input-field" type="email" id="forgot-email" name="email" placeholder="email@example.com" autoComplete="email" required />
                </div>
                <p className="field-error" data-error-for="forgot-email">{errors['forgot-email'] || ''}</p>
              </div>

              <button type="submit" className="btn btn-primary auth-submit" disabled={isSendingReset}>{isSendingReset ? '전송 중...' : '재설정 링크 보내기'}</button>
            </form>

            <p className={`auth-notice ${forgotNotice ? '' : 'hidden'}`} id="forgot-notice">{forgotNotice}</p>
          </section>
        )}
      </div>
      <Toast show={Boolean(toast)}>{toast}</Toast>
    </LoginPageContainer>
  );
};

export default Login;
