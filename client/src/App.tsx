import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { AdminPage } from './pages/AdminPage'
import { EditPostPage } from './pages/EditPostPage'
import { HomePage } from './pages/HomePage'
import { NewPostPage } from './pages/NewPostPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PostPage } from './pages/PostPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="posts/new" element={<NewPostPage />} />
          <Route path="posts/:id" element={<PostPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="admin/edit/:id" element={<EditPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
