/*$(document).ready(() => alert("JQuery is working"));*/

$(document).ready(() => {
    const key = 'AIzaSyAmQx5VQU6dDDexBVzRVq0PIMpSyc268SU';
    const playlistId = 'PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG';
    const URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 20,
        playlistId: playlistId
    };


    function loadVids(){
        $.getJSON(URL, options, function (data) {
                let id = data.items[0].snippet.resourceId.videoId;
                mainVideo(id);
                loopVids(data);           
                console.log(data);     
            });
    }

    loadVids();

    function mainVideo(id){
        $('.playlist').html(`
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" 
            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `);
    }

    function loopVids(data){
        
        $.each(data.items, function (i, item) { 
            let miniature = item.snippet.thumbnails.high.url; 
            let title = item.snippet.title;
            let description = item.snippet.description.substring(0, 100);
            let vidId = item.snippet.resourceId.videoId;

            $('.list').append(`
                <div class="videos" data-key="${vidId}">
                    <img src="${miniature}" alt="" class="thumb">
                    <div class="details">
                        <h4>${title}</h4>
                        <p>${description}</p>
                    </div>            
                </div>
            `);   
        });

        $('.list').on('click', '.videos',function () {
            let id = $(this).attr('data-key');
            mainVideo(id);
        }); 
    }

});
