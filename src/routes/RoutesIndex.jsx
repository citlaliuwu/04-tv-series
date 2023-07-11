import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Serie from '../pages/Serie'
import NotFound from '../pages/NotFound'

const RoutesIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/serie/:id' element={<Serie />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default RoutesIndex
