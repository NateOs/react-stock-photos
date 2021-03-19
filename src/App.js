import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)

  const fetchPictures = async() => {
    setLoading(true)
    let url
    url = `${mainUrl}${clientID}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      setData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPictures()
  }, [])

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (!loading && 
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10) {
        console.log('make a request here')
      }
    }) 
    return () => window.removeEventListener('scroll', event)
  }, [])

  const handleSubmit = () => {

  }

  return (
  <main>
    <section className='search'>
      <form className='search-form'>
        <input type="text" placeholder='search' className='form-input'/>
        <button type='submit' className='submit-btn' onClick={handleSubmit}><FaSearch /></button>
      </form>
    </section>
    <section className='photos'>
      <div className='photos-center'>
      {data.map((photo) => {
        return (<Photo key={photo.id} {...photo}/>)
      })}
      </div>
    </section>
    {loading && <h2 className='loading'>Loading...</h2>}
  </main>)
}

export default App
