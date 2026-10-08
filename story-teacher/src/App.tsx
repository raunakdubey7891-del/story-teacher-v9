import { Route, Routes } from 'react-router-dom'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import RequireAuth from './components/RequireAuth'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Classes from './pages/Classes'
import Subjects from './pages/Subjects'
import Chapters from './pages/Chapters'
import Topics from './pages/Topics'
import Learn from './pages/Learn'
import Story from './pages/Story'
import Quiz from './pages/Quiz'
import Practice from './pages/Practice'
import Result from './pages/Result'
import Reteach from './pages/Reteach'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route element={<RequireAuth />}>
          <Route path="/classes" element={<Classes />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/chapters" element={<Chapters />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/story" element={<Story />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/reteach" element={<Reteach />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}
