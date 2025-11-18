import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Button onClick={() => setCount((count) => count + 1)}>
          Click me {count} times
        </Button>
      </main>
    </div>
  );
}
export default App;
