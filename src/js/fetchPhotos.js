const BASE_URL = 'https://pixabay.com/api/';
const KEY = '27181891-3778ead93a3f3d83793e3b927';

export class FetchDataPhotos {
  constructor() {}

  fetchPhotos(query) {
    const url = `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(photos => {
        return photos;
      })
      .catch(error => console.log(`This is class catched error: ${error}`));
  }
}
