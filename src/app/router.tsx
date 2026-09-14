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
import { AdvancedSearch } from '../pages/AdvancedSearch';
import { WorkerComparison } from '../pages/WorkerComparison';
import { TaskManagement } from '../pages/TaskManagement';
import { ProfileEditing } from '../pages/ProfileEditing';
import { AnalyticsDashboard } from '../pages/AnalyticsDashboard';
import { PaymentSystem } from '../pages/PaymentSystem';
import { ReviewSystem } from '../pages/ReviewSystem';
import { AdvancedMessaging } from '../pages/AdvancedMessaging';

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-work" element={<FindWorkPage />} />
        <Route path="/advanced-search" element={<AdvancedSearch />} />
        <Route path="/compare-workers" element={<WorkerComparison />} />
        <Route path="/task-management" element={<TaskManagement />} />
        <Route path="/profile/edit" element={<ProfileEditing />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/payments" element={<PaymentSystem />} />
        <Route path="/reviews" element={<ReviewSystem />} />
        <Route path="/messages-advanced" element={<AdvancedMessaging />} />
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
