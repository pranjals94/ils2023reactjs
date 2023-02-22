import React, { useState, useEffect } from 'react'
import { ApiContext } from './ApiContext'
import httpService from '../services/httpService';
function Store({ children }) {
  // const [masterData, setMasterData] = useState([])
  const [masterData, setMasterData] = useState([])
  const [user, setUser] = useState(null)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    httpService.get(process.env.REACT_APP_rgsevaUrl + "/accom/listAllMasters").then((res) => {
      setMasterData(res.data)      
      httpService.get(process.env.REACT_APP_rgsevaUrl + "/user/currentUser").then((res) => {
        if(res.data.user){
          const {user} = res.data
          console.log(user)
          setUser(user)
        }else{
          setUser(null)
        }
        setLoaded(true)
      })
    })
  }, [])
  const loadedBody = ()=>{
    return(
      <ApiContext.Provider value={{masterData, setMasterData, user, setUser}}>
        {children}
      </ApiContext.Provider>
    )
  }
  const loading = () => {
    return(
      <div className="d-flex flex-column min-vh-100 min-vw-100">
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <div>
            <div className="spinner-grow text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      { !loaded ? loading() : loadedBody()}
    </>
  )
}
export default Store