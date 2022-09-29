const API_KEY = '24039178-b232e977d52176d5b7f6604c7';
const BASE_URL = 'https://pixabay.com/api/';
export default class ApiServise {
    
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchGallery() {
        console.log(this)
        let url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    
        return fetch(url)
            .then(r => r.json())
            .then((data) => {
                console.log(data)
                this.page += 1;

                return data.hits;
            });
    }
 
     resetPage() {
            this.page = 1;
        };

    get query() {
            return this.searchQuery
        };

    set query(newQuery) {
            return this.searchQuery = newQuery
        };
}

