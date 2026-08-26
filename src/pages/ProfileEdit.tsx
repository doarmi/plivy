import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AppShell = styled.main`
  width: min(390px, 100%);
  min-height: 100vh;
  margin: auto;
  padding: 34px 7px 104px;
  background: #f4f1e9;
`;

const Device = styled.section`
  position: relative;
  min-height: 700px;
  padding: 26px 28px 72px;
  border: 2px solid rgba(255, 255, 255, 0.86);
  border-radius: 43px;
  background: linear-gradient(145deg, #f2f4f6, #dce0e5 60%, #d5d9de);
  box-shadow: 0 22px 35px rgba(56, 50, 42, 0.2), inset 2px 2px 5px #fff;
`;

const StatusBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3b424b;
  font: 7px/1 monospace;
  letter-spacing: 0.14em;

  > span:first-child { color: #8994a1; }
`;

const LcdTitle = styled.section`
  margin-top: 19px;
  padding: 34px 18px 31px;
  text-align: center;
  border: 3px solid #cfc5dc;
  border-radius: 3px;
  background: linear-gradient(145deg, #f9f9fa, #e8eaed);
  box-shadow: inset 0 2px 9px rgba(74, 71, 82, 0.15);

  h1 {
    margin: 0;
    font: 700 19px/1 monospace;
    letter-spacing: 0.25em;
  }

  p {
    margin: 13px 0 17px;
    color: #747d74;
    font: 9px/1 monospace;
    letter-spacing: 0.26em;
  }

  .progress-bar {
    display: block;
    width: 194px;
    height: 4px;
    margin: auto;
    background: #c8ccca;

    span {
      display: block;
      width: 58%;
      height: 100%;
      background: #465a4c;
    }
  }
`;

const AvatarSection = styled.section`
  margin-top: 25px;
  text-align: center;

  .avatar-frame {
    position: relative;
    display: block;
    width: 160px;
    height: 160px;
    margin: auto;
    border: 4px solid #fff;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(47, 48, 52, 0.18);
    cursor: pointer;
    overflow: hidden;
    background: #e8e4f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }

    input {
      position: absolute;
      width: 1px;
      height: 1px;
      opacity: 0;
    }

    .camera {
      position: absolute;
      right: -15px;
      bottom: -14px;
      width: 43px;
      height: 43px;
      display: grid;
      place-items: center;
      border: 3px solid #fff;
      border-radius: 13px;
      background: var(--color-primary, #c72f63);
      color: #fff;
      font-size: 19px;
      box-shadow: 0 5px 10px rgba(85, 23, 50, 0.18);
    }
  }

  small {
    display: block;
    margin-top: 17px;
    color: #85858a;
    font: 8px/1 monospace;
    letter-spacing: 0.13em;
  }
`;

const FormField = styled.label`
  display: block;
  margin-top: 18px;

  > span {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 8px;
    color: #47505a;
    font: 8px/1 monospace;
    letter-spacing: 0.14em;

    i {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--color-primary, #c72f63);
      font-style: normal;

      &.soft { background: #e2bad0; }
    }
  }

  input, textarea {
    width: 100%;
    border: 1px solid #bcc0c5;
    border-radius: 3px;
    background: #fff;
    box-shadow: 0 2px 2px rgba(41, 42, 44, 0.08);
    outline: 0;
    font: inherit;

    &:focus {
      border-color: var(--color-primary, #c72f63);
      box-shadow: 0 0 0 2px rgba(201, 0, 92, 0.1);
    }
  }

  input {
    height: 52px;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 700;
  }

  textarea {
    padding: 15px 16px;
    resize: none;
    font-size: 14px;
    line-height: 1.65;
  }
`;

const FormActions = styled.div`
  margin-top: 47px;
  display: grid;
  gap: 11px;

  button {
    height: 58px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
  }

  .save-button {
    color: #fff;
    background: var(--color-primary, #c72f63);
    border: none;
    box-shadow: 0 7px 0 #a8a9ad, 0 11px 18px rgba(80, 55, 67, 0.16);
  }

  .cancel-button {
    border: 1px solid #bfc2c6;
    background: #fff;
    color: #65636b;
    box-shadow: 0 6px 0 #aaadb1;
  }
`;

const Screw = styled.span<{ $side: 'left' | 'right' }>`
  position: absolute;
  bottom: 107px;
  ${props => props.$side === 'left' ? 'left: 18px;' : 'right: 18px;'}
  width: 9px;
  height: 9px;
  border: 1px solid #65717e;
  border-radius: 50%;
  background: #929da9;
`;

const Toast = styled.div<{ $show: boolean }>`
  position: fixed;
  z-index: 20;
  left: 50%;
  bottom: 80px;
  transform: translate(-50%, ${props => props.$show ? '0' : '12px'});
  padding: 10px 15px;
  border-radius: 20px;
  background: #252932;
  color: #fff;
  font-size: 12px;
  opacity: ${props => props.$show ? '1' : '0'};
  transition: 0.2s;
  pointer-events: none;
`;

type ProfileEditProps = {
  initialName?: string;
  initialBio?: string;
  initialPhoto?: string;
  onSave?: (profile: { name: string; bio: string; photo?: string }) => void;
};

const ProfileEdit: React.FC<ProfileEditProps> = ({ initialName = '김프리비', initialBio = '아날로그 감성을 사랑하는 음악 수집가입니다.\nPlivy와 함께 매일을 기록합니다.', initialPhoto = '', onSave }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio);
  const [photoSrc, setPhotoSrc] = useState(initialPhoto);
  const [toast, setToast] = useState({ message: '', show: false });

  const showToast = (msg: string) => {
    setToast({ message: msg, show: true });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 1600);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoSrc(String(reader.result || ''));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.({ name: name.trim() || initialName, bio: bio.trim(), photo: photoSrc || initialPhoto });
    showToast('프로필이 저장되었어요!');
    setTimeout(() => navigate('/profile'), 700);
  };

  return (
    <>
      <AppShell style={{ background: '#ebe8e1', maxWidth: '100%', padding: '34px 7px 104px' }}>
        <Device>
          <StatusBar>
            <span>●</span>
            <b>▥ PLIVY-OS V2.4</b>
            <span>88% ⚡</span>
          </StatusBar>

          <LcdTitle>
            <h1>PROFILE EDIT</h1>
            <p>STORAGE: 124GB / 256GB</p>
            <i className="progress-bar"><span /></i>
          </LcdTitle>

          <form onSubmit={handleSubmit}>
            <AvatarSection>
              <label className="avatar-frame" htmlFor="avatarInput">
                {photoSrc ? (
                  <img src={photoSrc} alt="프로필 사진" />
                ) : (
                  <span>♙</span>
                )}
                <input id="avatarInput" type="file" accept="image/*" onChange={handlePhotoChange} />
                <span className="camera" aria-hidden="true">▣</span>
              </label>
              <small>사진 변경</small>
            </AvatarSection>

            <FormField>
              <span><i />▮▮ (NAME)</span>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={20}
                required
              />
            </FormField>

            <FormField>
              <span><i className="soft" />▮▮▮ (BIO)</span>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                maxLength={100}
                rows={4}
              />
            </FormField>

            <FormActions>
              <button type="submit" className="save-button">▣ 저장하기</button>
              <button type="button" className="cancel-button" onClick={() => navigate(-1)}>취소</button>
            </FormActions>
          </form>

          <Screw $side="left" aria-hidden="true" />
          <Screw $side="right" aria-hidden="true" />
        </Device>
      </AppShell>

      <Toast $show={toast.show}>{toast.message}</Toast>
    </>
  );
};

export default ProfileEdit;
