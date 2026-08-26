import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Toast from '../components/Toast';
import { usePlivyStore, type PrivacyLevel } from '../store/PlivyStore';

const Page=styled.main`
 min-height:100vh;background:#f5f2ea;padding-bottom:80px;color:inherit;
 header{height:50px;display:grid;grid-template-columns:50px 1fr 50px;align-items:center;background:#c4d9a7;border-bottom:1px solid #92a77d}header h1{text-align:center;font:700 15px/1 var(--font-mono);letter-spacing:.16em}header button{height:50px;font-size:27px}
 .content{padding:20px}.label{margin:0 0 9px;color:#999;font:9px/1 var(--font-mono);letter-spacing:.14em}.group{margin-bottom:23px}.card{overflow:hidden;border:1px solid #ddd9e0;border-radius:10px;background:#fff}
 .row{width:100%;min-height:57px;padding:12px 15px;display:flex;align-items:center;justify-content:space-between;gap:12px;border-bottom:1px solid #eeeaf0;background:transparent;color:inherit;text-align:left}.row:last-child{border-bottom:0}.left{display:flex;align-items:center;gap:12px}.icon{color:#5d00ef;font-size:17px}.title{font-size:13px}.sub{margin-top:4px;color:#999;font:8px/1.3 var(--font-mono)}.arrow{color:#aaa}
 .panel{padding:7px 10px 11px;background:#f7f5f1;border-bottom:1px solid #e8e4ea}.choice{width:100%;padding:11px;border-radius:8px;display:flex;justify-content:space-between;text-align:left;color:inherit}.choice.selected{background:#eee7fa;color:#5d00ef}.choice small{display:block;margin-top:4px;color:#888}.check{color:#c72f63;font-weight:700}
 html[data-theme='dark'] &{background:#181a20;color:#f2f2f5}html[data-theme='dark'] & header{background:#2e3a2e;border-color:#465746}html[data-theme='dark'] & .card{background:#24262d;border-color:#41444d}html[data-theme='dark'] & .row{border-color:#393c44}html[data-theme='dark'] & .panel{background:#1d1f25;border-color:#393c44}html[data-theme='dark'] & .choice.selected{background:#302940;color:#d8c7ff}
`;
const Switch=styled.button<{on:boolean}>`
 position:relative;width:44px;height:24px;border-radius:999px;background:${p=>p.on?'#c72f63':'#c8c9cc'};flex:0 0 auto;transition:.2s;
 &::after{content:'';position:absolute;width:18px;height:18px;top:3px;left:${p=>p.on?'23px':'3px'};border-radius:50%;background:#fff;box-shadow:0 1px 3px #0003;transition:.2s}
`;
const options:{value:PrivacyLevel;label:string;description:string}[]=[
 {value:'public',label:'전체 공개',description:'모든 사용자가 내 기록을 볼 수 있어요.'},
 {value:'friends',label:'친구만 공개',description:'서로 팔로우한 친구에게만 보여요.'},
 {value:'private',label:'비공개',description:'나만 내 기록을 볼 수 있어요.'},
];
export default function FeatureSettings(){
 const navigate=useNavigate();const {settings,updateSettings}=usePlivyStore();const [open,setOpen]=useState<'notice'|'privacy'|null>(null);const [toast,setToast]=useState('');
 const notify=(m:string)=>{setToast(m);setTimeout(()=>setToast(''),1600)};const logout=()=>{localStorage.removeItem('plivy_session');notify('로그아웃했어요.');setTimeout(()=>navigate('/login'),500)};const privacy=options.find(o=>o.value===settings.privacyLevel)?.label||'전체 공개';
 const selectPrivacy=(value:PrivacyLevel)=>{updateSettings({privacyLevel:value,publicProfile:value!=='private'});notify('공개 범위를 저장했어요.')};
 return <Page className="settings-page"><header><button onClick={()=>navigate(-1)}>‹</button><h1>SETTINGS</h1><span/></header><div className="content">
  <section className="group"><p className="label">ACCOUNT</p><div className="card"><button className="row" onClick={()=>navigate('/profile/edit')}><span className="left"><span className="icon">♙</span><span className="title">프로필 편집</span></span><span className="arrow">›</span></button><button className="row" onClick={logout}><span className="left"><span className="icon">⊗</span><span className="title">로그아웃</span></span><span className="arrow">›</span></button></div></section>
  <section className="group"><p className="label">PREFERENCES</p><div className="card">
   <button className="row" onClick={()=>setOpen(open==='notice'?null:'notice')}><span className="left"><span className="icon">♧</span><span><span className="title">알림 설정</span><span className="sub">좋아요·팔로우·기록 리마인드</span></span></span><span className="arrow">{open==='notice'?'⌃':'›'}</span></button>
   {open==='notice'&&<div className="panel"><div className="row"><span className="title">전체 알림</span><Switch on={settings.notifications} onClick={()=>updateSettings({notifications:!settings.notifications})}/></div><div className="row"><span className="title">좋아요 알림</span><Switch on={settings.notificationLikes} onClick={()=>updateSettings({notificationLikes:!settings.notificationLikes})}/></div><div className="row"><span className="title">새 팔로우 알림</span><Switch on={settings.notificationFollows} onClick={()=>updateSettings({notificationFollows:!settings.notificationFollows})}/></div><div className="row"><span className="title">기록 리마인드</span><Switch on={settings.notificationReminders} onClick={()=>updateSettings({notificationReminders:!settings.notificationReminders})}/></div></div>}
   <div className="row"><span className="left"><span className="icon">◑</span><span><span className="title">다크 모드</span><span className="sub">DARK THEME</span></span></span><Switch on={settings.darkMode} onClick={()=>updateSettings({darkMode:!settings.darkMode})} aria-label="다크모드 토글"/></div>
   <div className="row"><span className="left"><span className="icon">✦</span><span><span className="title">AI Insights</span><span className="sub">SMART PERSONALIZATION</span></span></span><Switch on={settings.aiInsights} onClick={()=>updateSettings({aiInsights:!settings.aiInsights})}/></div>
  </div></section>
  <section className="group"><p className="label">PRIVACY</p><div className="card"><button className="row" onClick={()=>setOpen(open==='privacy'?null:'privacy')}><span className="left"><span className="icon">♡</span><span><span className="title">공개 범위</span><span className="sub">{privacy}</span></span></span><span className="arrow">{open==='privacy'?'⌃':'›'}</span></button>{open==='privacy'&&<div className="panel">{options.map(o=><button key={o.value} className={`choice ${settings.privacyLevel===o.value?'selected':''}`} onClick={()=>selectPrivacy(o.value)}><span><b>{o.label}</b><small>{o.description}</small></span>{settings.privacyLevel===o.value&&<span className="check">✓</span>}</button>)}</div>}</div></section>
 </div><Toast show={!!toast}>{toast}</Toast></Page>;
}
