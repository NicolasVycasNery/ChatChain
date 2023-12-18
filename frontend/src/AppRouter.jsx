import {
    Route,
    Routes
} from 'react-router-dom'
import { AboutPage } from './components/pages/AboutPage'
import { ChatPage } from './components/pages/ChatPage'

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
    );
}
