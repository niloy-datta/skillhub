import { HashRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/Home';
import { FindWorkPage } from '../pages/FindWork';
import { HireTalentPage } from '../pages/HireTalent';
import { PostWorkPage } from '../pages/PostWork';
import { DashboardPage } from '../pages/Dashboard';
import { MessagesPage } from '../pages/Messages';
import { ProfilePage } from '../pages/Profile';
import { SettingsPage } from '../pages/Settings';
import { AuthPage } from '../pages/Auth';
import { NotFoundPage } from '../pages/NotFound';
import { JobDetailPage } from '../pages/JobDetail';
import { CompanyDetailPage } from '../pages/CompanyDetail';

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-work" element={<FindWorkPage />} />
        <Route path="/hire-talent" element={<HireTalentPage />} />
        <Route path="/post-work" element={<PostWorkPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/job/:jobId" element={<JobDetailPage />} />
        <Route path="/company/:companyId" element={<CompanyDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}
