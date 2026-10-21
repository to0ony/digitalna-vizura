import { MotionConfig } from "framer-motion";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { LangProvider } from "./i18n";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Project from "./components/Project";
import Gtfs from "./components/Gtfs";
import Work from "./components/Work";

function App() {
  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/gtfs" element={<Gtfs />} />
              <Route path="/radovi" element={<Work />} />
              <Route path="/radovi/:slug" element={<Project />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </MotionConfig>
    </LangProvider>
  );
}

export default App;
