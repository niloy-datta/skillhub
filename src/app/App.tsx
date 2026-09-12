import { AppRouter } from './router';
import { Header } from '../components/layout/Header';

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <AppRouter />
    </div>
  );
}
