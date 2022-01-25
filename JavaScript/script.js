import $ from "jquery";

let pageNumber = 0;
initialize();

function initialize(){
    $(document).ajaxStart(() => {
        $( ".loading" ).show();

        $('#buttonPrevious').prop('disabled', true);
        $('#buttonNext').prop('disabled', true);
    });
    $(document).ajaxStop(() => {
        $( ".loading" ).hide();

        $('#buttonNext').prop('disabled', false);
        if(pageNumber > 0){
            $('#buttonPrevious').prop('disabled', false);
        }
    });

    getCatImages();
    $('#buttonNext').on('click', showNextPage);
    $('#buttonPrevious').on('click', showPreviousPage);
}

async function getCatImages(){
    $.ajax({
        url: `https://api.thecatapi.com/v1/images/search?limit=12&page=${pageNumber}&order=asc`,
        datatype: 'json',
        headers: {
            'x-api-key': '6e935493-01c9-4333-8ffb-0b624ebfe3bc',
        },
        error: () => {
            $('.error-message').slideToggle('slow', 'swing', () => {
                setTimeout(() => {
                    $('.error-message').slideToggle('slow');
                }, 3000);
            });
        },
    }).done((data) => {
        for (const item of data){
            $('<img>', {
                'class': 'image',
                'src': item.url,
            }).appendTo($('.images'));
        }
    });
}

function updatePageNumber(){
    $('.page-number').text(pageNumber);
}

function showNextPage(){
    $('.images').empty();
    pageNumber++;
    getCatImages();
    updatePageNumber();
}

function showPreviousPage(){
    $('.images').empty();
    pageNumber--;
    getCatImages();
    updatePageNumber();
}