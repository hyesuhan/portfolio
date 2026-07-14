import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Main,
  Achievement,
  Expertise,
  Project,
  Navigation,
  Footer,
} from "./components";
import FadeIn from './components/FadeIn';
import ProjectDetail from "./pages/ProjectDetail";
import { ModeProvider, useMode } from "./context/ModeContext";
import './index.scss';

function Portfolio() {
    const { mode, toggleMode } = useMode();

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    return (
        <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
            <Navigation parentToChild={{mode}} modeChange={toggleMode}/>
            <FadeIn transitionDuration={700}>
                <Main/>
                <Expertise/>
                <Project/>
                <Achievement/>
            </FadeIn>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <ModeProvider>
                <Routes>
                    <Route path="/" element={<Portfolio />} />
                    <Route path="/project/:id" element={<ProjectDetail />} />
                </Routes>
            </ModeProvider>
        </BrowserRouter>
    );
}

export default App;
