import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Toast from '../components/Toast';

const USERS_KEY = 'plivy_users';
type StoredUser = { id: string; email: string; password: string; nickname: string };

const Page = styled.main`
  width:min(390px,100%);min-height:100vh;margin:auto;padding:70px 24px;background:#f5f0ec;color:#2d2730;
  .brand{text-align:center;color:#9d163c;font:700 30px/1 serif;letter-spacing:.22em}.sub{text-align:center;margin:8px 0 42px;color:#a3919b;font:9px monospace;letter-spacing:.18em}
  .card{padding:24px;border:1px solid #eadde3;border-radius:18px;background:#fff;box-shadow:0 16px 35px #6d3f5014}h1{font-size:21px;margin:0 0 8px}p{font-size:12px;color:#8d7d86;line-height:1.6}
  label{display:block;margin-top:18px;font-size:11px;font-weight:700}input{box-sizing:border-box;width:100%;height:46px;margin-top:7px;padding:0 13px;border:1px solid #ddd1d7;border-radius:9px;outline:none}input:focus{border-color:#c72f63}
  .error{min-height:18px;margin:7px 0 0;color:#c72f63;font-size:11px}.submit{width:100%;height:48px;margin-top:13px;border-radius:24px;background:#c72f63;color:white;font-weight:700}.back{display:block;margin:20px auto 0;color:#8a7882;font-size:11px}
`;

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email') || '';
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get('password') || '');
    const confirm = String(form.get('confirm') || '');
    if (!email) return setError('재설정 링크의 이메일 정보가 없어요.');
    if (password.length < 8) return setError('비밀번호는 8자 이상이어야 해요.');
    if (password !== confirm) return setError('비밀번호가 서로 일치하지 않아요.');
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as StoredUser[];
      const index = users.findIndex(user => user.email === email);
      if (index < 0) return setError('이 브라우저에 해당 계정 정보가 없어요. 회원가입한 기기에서 다시 시도해주세요.');
      users[index] = { ...users[index], password };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      setError('');
      setToast('비밀번호를 변경했어요.');
      window.setTimeout(() => navigate('/login'), 900);
    } catch {
      setError('계정 정보를 불러오지 못했어요.');
    }
  };

  return <Page>
    <div className="brand">PLIVY</div><div className="sub">DIGITAL MEMORY PLAYER</div>
    <section className="card"><h1>새 비밀번호 설정</h1><p>{email || 'PLIVY 계정'}의 새 비밀번호를 입력해주세요.</p>
      <form onSubmit={submit}>
        <label>새 비밀번호<input name="password" type="password" autoComplete="new-password" placeholder="8자 이상 입력하세요" /></label>
        <label>비밀번호 확인<input name="confirm" type="password" autoComplete="new-password" placeholder="한 번 더 입력하세요" /></label>
        <div className="error">{error}</div><button className="submit" type="submit">비밀번호 변경</button>
      </form>
      <button className="back" type="button" onClick={() => navigate('/login')}>로그인으로 돌아가기</button>
    </section><Toast show={!!toast}>{toast}</Toast>
  </Page>;
}
