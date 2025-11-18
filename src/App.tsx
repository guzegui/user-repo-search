import { UserReposView } from "./features/searchUserRepos/UserReposView";
import { Header } from "./components/layout/Header";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <UserReposView />
      </main>
    </div>
  );
}

export default App;
