import $ from "jquery";

let pageNumber = 0;

const buttonPrevious = document.querySelector('#previous');
const buttonNext = document.querySelector('#next');
const imagesWrapperElement = document.querySelector('.images');
const pageNumberElement = document.querySelector('.page-number');
const footerElement = document.querySelector('footer');

initialize();

async function initialize(){
    $('#next').on('click', showNextPage);
    buttonPrevious.addEventListener('click', showPreviousPage);
    getCatImages();
}
async function getCatImages(){
    try {
        let response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=12&page=${pageNumber}&order=asc`,{
            headers: {
                'x-api-key': '6e935493-01c9-4333-8ffb-0b624ebfe3bc',
            }
        });
        const data = await response.json();
        for (const item of data){
            const img = document.createElement('img');
            img.classList.add('image');
            img.src = item.url;
            imagesWrapperElement.append(img);
        }
    } catch (error){
        const errorMessageElement = document.createElement('div');
        errorMessageElement.textContent = 'Something went wrong while fetching data from the server';
        footerElement.append(errorMessageElement);
    }

}
function updatePageNumber(){
    pageNumberElement.textContent = pageNumber;
}
function showNextPage(){
    imagesWrapperElement.textContent = '';
    pageNumber++;
    if(pageNumber === 1){
        buttonPrevious.disabled = false;
    }
    updatePageNumber();
    getCatImages();
}
function showPreviousPage(){
    imagesWrapperElement.textContent = '';
    pageNumber--;
    if(pageNumber === 0){
        buttonPrevious.disabled = true;
    }
    updatePageNumber();
    getCatImages();
}