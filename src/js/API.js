// const BASE_URL = "https://pixabay.com/api/";
// const KEY = "31407944-a77d666384d67064142e5c37e";

// function fetchImg(searchQuery, page) {
//   return fetch(`${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
//     .then(res => res.json());
// }

// export default { fetchImg };

// ====== рефакторинг ======
import axios from 'axios';

async function fetchImg(searchQuery, page) {
  const BASE_URL = "https://pixabay.com/api/";
  const KEY = "31407944-a77d666384d67064142e5c37e";
  const options = `?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  return await axios.get(`${BASE_URL}${options}`).then(res => res.data);
}

export default { fetchImg };