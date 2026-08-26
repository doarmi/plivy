import ProfileEdit from './ProfileEdit';
import { usePlivyStore } from '../store/PlivyStore';

export default function ProfileEditConnected() {
  const { profile, updateProfile } = usePlivyStore();
  return (
    <ProfileEdit
      initialName={profile.name}
      initialBio={profile.bio}
      initialPhoto={profile.photo}
      onSave={updateProfile}
    />
  );
}
