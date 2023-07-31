import React, {useState, useEffect} from "react";
import './style.css';
import { getMovies } from "../../utils/utilities";
import { getGenres } from "../../utils/utilities";

const IMAGE_BASE_URL = process.env.REACT_APP_BASE_IMAGE_BASE_URL

const GetMovies = () => {
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(false)

// track button click
const [displayMovies, setDisplayMovies] = useState(false); 

useEffect(() => {
  if (displayMovies) {
    setLoading(true);
    getMovies()
      .then((movies) => {
        console.log({ movies });
        setMovies(movies.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setLoading(false);
      });
  }
}, [displayMovies]); 
// track button click

//   filter-button

const [filteredMovies, setFilteredMovies] = useState ([]);
const [genreFilter, setGenreFilter] = useState ('');
const [movieList, setMovielist] = useState(null);
const [genreData, setGenreData] = useState(null);

useEffect(() => {
Promise.all([getMovies(), getGenres()])
.then(([movieList, genreData]) =>{
// Save the fetched data in state variables
setMovielist(movieList);
setGenreData(genreData);
 // Create a set of valid genre IDs
    const validGenres = new Set ( genreData.genres.map((genre) => genre.id));

    // Filter the movie list based on selected genres and store it in filteredMovie state variable
    const filteredMovies = movieList.results.filter((movie) => 
    movie.genre_ids?.some((id) => validGenres.has(id))
    );
setFilteredMovies(filteredMovies);
})
.catch((error) =>{
    console.error('Error fetching data:',error)
});
},[]);   // Empty dependency array means this effect will run once when the component mounts


 // Function to handle the user input change
 const handleInputChange = (event) => {
    setGenreFilter(event.target.value);
  };
  
      const handleFilterButtonClick = () => {
        // Filter movies based on the user-entered genre name
        const filteredMoviesResult = filteredMovies.filter((movie) =>
          movie.genre_ids?.some((genre_id) => {
            const genre = genreData.genres.find((genre) => genre.id === genre_id);
            return genre?.name.toLowerCase() === genreFilter.toLowerCase();
          })
        );
      
        setFilteredMovies(filteredMoviesResult);
      };
//   filter-button


useEffect(() => {
    (async  () => {
        setLoading(true)
        const movies = await getMovies ();
        console.log({movies});
        setMovies(movies.results)
        setLoading(false)
    }) ();


},[]);

if (loading) {
    return <h1>Loading movies...</h1>
}

    return (  
  <div className="block">
         
{/* <div className="Allbtn">
  <button>All</button>
</div> */}
     {/* Input field to set the genre filter */}
     <div className="filter">
       <input type="text" placeholder="Enter genre name" value={genreFilter} onChange={handleInputChange}/>
        {/* Filter button */}
       <button onClick={handleFilterButtonClick}>Filter</button>

  <button  className="Allbtn" onClick={() => setDisplayMovies(true)} >All</button>

     </div>
      {/* Render the filtered movie list here */}
    
     <div className="container">
         {filteredMovies.map((movie) => (
       <div key={movie.id}>{movie.title}
         <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title}/>
       </div>
          ))}


           {/* Hunter's code*/}
              {/* {movies &&
              !loading &&
              movies.length > 0 && 
              movies.map( item =>(
                <div className="image-container">
                    <img src={`${IMAGE_BASE_URL}${item.poster_path}`} alt={item.title}/>
                </div>
               ))} */}


         {/* {movies && !loading && movies.length === 0 &&(
          <div>
           <h1>No movies Found</h1>
          </div>
            )} */}
         {/* Hunter's code*/}

     </div>
</div>
            )};

export default GetMovies;