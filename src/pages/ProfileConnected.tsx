import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import { usePlivyStore } from '../store/PlivyStore';

export default function ProfileConnected() {
  const navigate = useNavigate();
  const { profile, records, playlists } = usePlivyStore();

  useEffect(() => {
    const avatar = document.querySelector<HTMLElement>('.profile-avatar');
    const name = document.querySelector<HTMLElement>('.profile-name');
    const bio = document.querySelector<HTMLElement>('.profile-tagline');
    const values = document.querySelectorAll<HTMLElement>('.storage-grid-value');

    if (avatar) {
      avatar.replaceChildren();
      if (profile.photo) {
        const image = document.createElement('img');
        image.src = profile.photo;
        image.alt = '프로필 사진';
        avatar.appendChild(image);
      } else {
        avatar.textContent = '♙';
      }
    }
    if (name) name.textContent = profile.name;
    if (bio) bio.textContent = profile.bio;
    if (values[0]) values[0].textContent = `${records.length} UNITS`;
    if (values[1]) values[1].textContent = `${playlists.length} LISTS`;
  }, [profile, records.length, playlists.length]);

  const openProfileEdit = (event: React.MouseEvent<HTMLDivElement>) => {
    const editButton = (event.target as HTMLElement).closest('.profile-avatar-edit');
    if (editButton) navigate('/profile/edit');
  };

  return <div onClickCapture={openProfileEdit}><Profile /></div>;
}
