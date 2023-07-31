const BASE_URL = process.env.REACT_APP_BASE_URL;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

export const getMovies = async () => {

    try{
     const response = await fetch(`${BASE_URL}/3/movie/popular`,{
method: 'GET',
headers: {
    Authorization : `Bearer ${ACCESS_TOKEN}`,
    'Content-Type' : 'application/json'
}
     })
     const result = await response.json();
     return result
    }

    catch (error) {
      return error.message; //it is called here to it can be seen in another component
}

}

export const getGenres = async () => {
  
    try{
        const response = await fetch(`${BASE_URL}/3/genre/movie/list`,{
            method:'GET',
            headers:{
                Authorization : `Bearer ${ACCESS_TOKEN}`,
                'Content-Type' : 'application/json',
        },
        });
        const data = await  response.json();
        return data;

    }catch(error){
        return error.message
    }
    };

export const getMovieDets = async(movie_id) => {
  try {
    const response = await fetch (`${BASE_URL}/3/movie/${movie_id}`,{
        method : 'GET',
        headers : {
            Authorization : `Bearer ${ACCESS_TOKEN}`,
            'Content-Type' : 'application/json',
        },
    });
    const result = await response.json();
    return result

  } catch (error) {
    console.error('Cannot get movie details',error)
  }
}