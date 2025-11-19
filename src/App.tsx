import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";

/**
 * The main application component responsible for routing and page transitions.
 * It uses `react-router-dom` for navigation and `framer-motion` for page animations.
 *
 * @returns The main application structure with routed pages.
 */
function App(): JSX.Element {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route
          path="/"
          element={
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3 }}
              style={{ position: "absolute", width: "100%", height: "100%" }}
            >
              <HomePage />
            </motion.div>
          }
        />
        <Route
          path="/search/:username"
          element={
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3 }}
              style={{ position: "absolute", width: "100%", height: "100%" }}
            >
              <SearchPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
