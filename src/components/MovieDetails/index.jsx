import React, {useEffect, useState} from "react";
import './style.css';
import { getMovieDets } from "../../utils/utilities";

const IMAGE_BASE_URL = process.env.REACT_APP_BASE_IMAGE_BASE_URL;


const MovieDets = () => {
const movie_id = 298618;
  const [moviedets, setMoviedets] = useState (null);

  useEffect(() => {
    const fetchMovies = async () => {
        try {
            const getDets = await getMovieDets(movie_id);
          setMoviedets(getDets)
        } catch (error) {
            console.error('Movies cannot be viewed',error)
        }
    };
    fetchMovies()
  }, [movie_id]);

    return(
       <div className="container">
       <h1>Top Movies...</h1>
{/* view movie details */}
{moviedets && (
      <>
        <div>

          <div>
            <div>
              <p> {moviedets.adult}</p>
              <img src={`${IMAGE_BASE_URL}${moviedets.poster_path}`}alt={moviedets.title} />
              <div>
                <span>&#9679;</span>
                <span>&#9679;</span>
                <div>{moviedets.title} </div>
              </div>
              <div>
                <p>
                Release Date : {moviedets.release_date} 
                </p>
              </div>
            </div>
            <div>
              <p>{moviedets.overview}</p>
            </div>
          </div>
          
          <div>
            <div>
             <button className="watchbtn"><a href={moviedets.homepage} target="_blank" rel="noopener noreferrer">Watch Now</a></button> 
            </div>
          </div>

        </div>
      </>
    )}

{/* view movie details */}
       </div> 
    )
}
export default MovieDets;