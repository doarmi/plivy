import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import type { PropsWithChildren } from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import { RuntimeGlobal } from './styles/RuntimeGlobal';
import { PlivyStoreProvider } from './store/PlivyStore';
import Layout from './components/Layout';
import Splash from './pages/Splash';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Search from './pages/Search';
import Record from './pages/Record';
import Records from './pages/Records';
import ProfileConnected from './pages/ProfileConnected';
import ProfileEditConnected from './pages/ProfileEditConnected';
import FeatureHome from './pages/FeatureHome';
import FeatureDetail from './pages/FeatureDetail';
import FeaturePlaylists from './pages/FeaturePlaylists';
import FeatureSettings from './pages/FeatureSettings';

const SESSION_KEY = 'plivy_session';

function hasSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { userId?: string };
    return Boolean(parsed.userId);
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return false;
  }
}

function RequireAuth({ children }: PropsWithChildren) {
  const location = useLocation();
  if (!hasSession()) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
}

function PublicOnly({ children }: PropsWithChildren) {
  if (hasSession()) return <Navigate to="/" replace />;
  return children;
}

export default function PlivyFeatureApp() {
  return <PlivyStoreProvider><GlobalStyle/><RuntimeGlobal/><HashRouter><Routes>
    <Route path="/splash" element={<Splash/>}/>
    <Route path="/login" element={<PublicOnly><Login/></PublicOnly>}/>
    <Route path="/reset-password" element={<ResetPassword/>}/>

    <Route path="/record" element={<RequireAuth><Record/></RequireAuth>}/>
    <Route path="/detail/:id" element={<RequireAuth><FeatureDetail/></RequireAuth>}/>
    <Route path="/settings" element={<RequireAuth><FeatureSettings/></RequireAuth>}/>
    <Route path="/profile/edit" element={<RequireAuth><ProfileEditConnected/></RequireAuth>}/>

    <Route element={<RequireAuth><Layout/></RequireAuth>}>
      <Route path="/" element={<FeatureHome/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/playlists" element={<FeaturePlaylists/>}/>
      <Route path="/profile" element={<ProfileConnected/>}/>
      <Route path="/records" element={<Records/>}/>
    </Route>
    <Route path="*" element={<Navigate to={hasSession() ? '/' : '/login'} replace/>}/>
  </Routes></HashRouter></PlivyStoreProvider>;
}
