import { useEffect,useState } from 'react';
import Home from './Home';
import Toast from '../components/Toast';
import { usePlivyStore } from '../store/PlivyStore';
import styled from 'styled-components';

const sharedIds=['shared-1','shared-2','shared-3'];
const userIds=['melody9','user123','sarah'];
const FeatureWrap=styled.div`
 .shared-list article{grid-template-columns:42px minmax(0,1fr) 66px 34px!important;gap:8px!important}
 .shared-list article>div{min-width:0}.shared-list article strong,.shared-list article p{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
 .feature-follow{display:inline-flex!important;align-items:center!important;justify-content:center!important;box-sizing:border-box!important;width:66px!important;min-width:66px!important;max-width:66px!important;height:32px!important;padding:0 8px!important;white-space:nowrap!important;word-break:keep-all!important;overflow-wrap:normal!important;writing-mode:horizontal-tb!important;line-height:1!important;border:1px solid #e5b7c7!important;border-radius:16px!important;background:#fff!important;color:#c72f63!important;font-size:10px!important}
 .shared-list .like-button{width:34px;height:34px;font-size:22px!important}
 html[data-theme='dark'] & .feature-follow{background:#24262d!important;color:#f08bb0!important;border-color:#704154!important}
`;

export default function FeatureHome(){
 const {likedSharedIds,followedUserIds,toggleSharedLike,toggleFollow}=usePlivyStore();const [toast,setToast]=useState('');
 const notify=(m:string)=>{setToast(m);setTimeout(()=>setToast(''),1600)};
 useEffect(()=>{
  document.querySelectorAll<HTMLButtonElement>('.shared-list .like-button').forEach((button,index)=>{const liked=likedSharedIds.includes(sharedIds[index]);button.textContent=liked?'♥':'♡';button.classList.toggle('liked',liked)});
  document.querySelectorAll<HTMLElement>('.shared-list article').forEach((card,index)=>{let button=card.querySelector<HTMLButtonElement>('.feature-follow');if(!button){button=document.createElement('button');button.className='feature-follow';card.insertBefore(button,card.querySelector('.like-button'))}button.textContent=followedUserIds.includes(userIds[index])?'팔로잉':'팔로우';});
 },[likedSharedIds,followedUserIds]);
 const capture=(event:React.MouseEvent<HTMLDivElement>)=>{const target=event.target as HTMLElement;const card=target.closest('.shared-list article');if(!card)return;const cards=Array.from(document.querySelectorAll('.shared-list article'));const index=cards.indexOf(card);if(index<0)return;if(target.closest('.like-button')){event.stopPropagation();const was=likedSharedIds.includes(sharedIds[index]);toggleSharedLike(sharedIds[index]);notify(was?'좋아요를 취소했어요.':'좋아요를 눌렀어요.')}if(target.closest('.feature-follow')){event.preventDefault();event.stopPropagation();const was=followedUserIds.includes(userIds[index]);toggleFollow(userIds[index]);notify(was?'팔로우를 취소했어요.':'팔로우했어요.')}};
 return <FeatureWrap onClickCapture={capture}><Home/><Toast show={!!toast}>{toast}</Toast></FeatureWrap>;
}
