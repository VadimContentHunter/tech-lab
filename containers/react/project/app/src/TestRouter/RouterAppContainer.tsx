import { Routes, Route } from 'react-router';

import Navigation from './components/Navigation';
import Home from './Home';
import About from './About';
import UserPage from './UserPage';

function RouterAppContainer() {
    return (
        <>
            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/users/:id" element={<UserPage />} />
            </Routes>
        </>
    );
}

export default RouterAppContainer;
