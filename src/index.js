import pageTpl from './pagesTpl.hbs';

const apiKey = '39207227-e0b610c42232251ba1ba1b4e0'; 
let currentPage = 1;
let currentQuery = '';

const searchForm = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreButton = document.getElementById('load-more');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = e.target.query.value;
  if (query !== '') {
    currentQuery = query;
    currentPage = 1;
    await searchImages(query, currentPage);
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage++;
  await searchImages(currentQuery, currentPage);
});

async function searchImages(query, page) {
  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${apiKey}`;
  try {
    const page = await fetch(url);
    const data = await page.json();
    displayImages(data.hits);
    scrollToGallery();
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function displayImages(images) {
  images.forEach((image) => {
    gallery.innerHTML += pageTpl(image)
  });
}


function scrollToGallery() {
  const element = gallery;
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}