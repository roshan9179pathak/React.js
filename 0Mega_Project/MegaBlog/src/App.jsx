import React , {useEffect , useState} from 'react'
import {useDispatch} from 'react-redux'
import authservice from './appwrite/auth'
import {login , logout} from './store/authSlice'
import * as Comp from './Components/index'
import {Outlet} from 'react-router-dom'

export default function App() {
  const dispatch = useDispatch()
    const [loading , setLoading] = useState(true)
    
    useEffect(() => {
      authservice.currentUser()
      .then((userData)=>{
        if(userData){
          //doubt here
          dispatch(login({userData}))
        }else{
          dispatch(logout())
        }
      })
      .finally(()=>(
        setLoading(false)
      ))

    }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block' >
      <Comp.Header />
      TODO: <Outlet />
      <Comp.Footer />
      </div>
      </div>
  ) : null
}
