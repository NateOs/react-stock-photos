import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  // setting state vars
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  const fetchPictures = async() => {
    setLoading(true)
   
    let urlPage =`&page=${page}`
    let url;
    let urlQuery = `&query=${query}`
// fetch default setUrl if there's no search item, else return searched items
    if (query) {
      url = `${searchUrl}${clientID}${urlQuery}${urlPage}`
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }

    try {
      const response = await fetch(url)
      const data = await response.json()
      setData((oldData) => {
        if (query && page === 1){
          return data.results
        } else if (query) {
          return [...oldData, ...data.results]
        } else {
          return [...oldData, ...data]
        }
      })
      console.log(data)

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPictures()
  }, [page])

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (!loading && 
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10) {
          setPage((oldPage) => {
            return oldPage + 1
          })
        }
    }) 
    return () => window.removeEventListener('scroll', event)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchPictures()
  }

  return (
  <main>
    <section className='search'>
      <form className='search-form'>
        <input type="text" placeholder='search' className='form-input' value={query} onChange={(e) => setQuery(e.target.value)}/>
        <button type='submit' className='submit-btn' onClick={handleSubmit}><FaSearch /></button>
      </form>
    </section>
    <section className='photos'>
      <div className='photos-center'>
        {data.map((photo, index) => {
          return (<Photo key={index} {...photo}/>)
        })}
      </div>
    </section>
    {loading && <h2 className='loading'>Loading...</h2>}
  </main>)
}

export default App
