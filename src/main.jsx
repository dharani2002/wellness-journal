import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Home, MoodTracker, Journal } from './components'
import Layout from './Layout'

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}></Route>
      <Route path='moodTracker' element={<MoodTracker/>}></Route>
      <Route path='journal' element={<Journal/>}></Route>
      {/* <Route path='journal' element={<Contact/>}></Route> */}
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router}/> 
     
  </StrictMode>,
)
