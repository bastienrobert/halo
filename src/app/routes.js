import Home from 'pages/Home'
import Experience from 'pages/Experience'
import NotFound from 'pages/NotFound'

export default [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'experience',
    path: '/experience',
    component: Experience
  },
  {
    name: 'notfound',
    path: '*',
    component: NotFound
  }
]
