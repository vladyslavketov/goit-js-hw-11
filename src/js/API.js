const BASE_URL = "https://pixabay.com/api/";
const KEY = "31407944-a77d666384d67064142e5c37e";

const options = {
  method: 'GET',
  headers: {
    "Content-Type": "application/json"
  },
};

function fetchImg(searchQuery, page) {
  return fetch(`${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
    .then(res => res.json());
}

export default { fetchImg };

// https://pixabay.com/api/?key=31407944-a77d666384d67064142e5c37e&q=red&image_type=photo&orientation=horizontal&safesearch=true