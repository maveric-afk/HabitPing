import { useState } from 'react'
import './App.css'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Leaderboard from './pages/LeaderBoard'
import {Toaster} from 'react-hot-toast'
import AddTask from './pages/AddTask'

const router=createBrowserRouter([
{
  path:'/',
  element:<div>
    <Home/>
  </div>
},
{
  path:'/signup',
  element:<div>
    <Signup/>
  </div>
},
{
  path:'/signin',
  element:<div>
    <Signin/>
  </div>
},
{
  path:'/leaderboard',
  element:<div>
    <Leaderboard/>
  </div>
},
{
  path:'/addtask',
  element:<div>
    <AddTask/>
  </div>
}
])

function App() {

  return (
    <div>
      <RouterProvider router={router}>
      </RouterProvider>
      <Toaster/>
    </div>
  )
}

export default App
