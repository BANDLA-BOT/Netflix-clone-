import './TitleCards.css';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';



const TitleCards = ({title, category}) => {
const [apiData, setApiData] = useState([])
  const cardsRef = useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjNmZGQ2YzNiNDIxYjg5OTgxMjQ2NmI3MWI2MzYzMSIsInN1YiI6IjY2MmY0NWM3ZjZmZDE4MDEyODIzMzVlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WvZysey-BjsUFG5qJhN8zNmN2WPjx0X04sInUhrhTRc'
    }
  };
  
 

  const handleWheel = (event)=>{
    event.preventDefault()
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));


      cardsRef.current.addEventListener('wheel', handleWheel)

  }, [])

  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{  
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards