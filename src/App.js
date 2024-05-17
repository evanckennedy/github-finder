import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Search from './pages/Search';
import User from './pages/User';

function App() {
  const location = useLocation();

  return (
    <>
      <main>
        <div className="container">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route exact path='/' element={<PageWrapper><Search /></PageWrapper>} />
              <Route exact path='/user/:username' element={<PageWrapper><User /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

export default App;
