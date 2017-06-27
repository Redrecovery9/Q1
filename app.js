var test ='https://kitsu.io/api/edge/anime?filter[text]=attack on titan'


$(document).ready(function() {
  $('.searchButton').click(function(event) {
    event.preventDefault()
    $('.details').empty()
    var type = $('.custom-select').val()
    console.log(type)
    var title = $('#search').val()
    console.log(title)


    var basicSearch = 'https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0&filter[' + type + ']=' + title

    $.get(basicSearch)
    .then(function(data) {
      var episodes = data.data;
      console.log(data.data)

      for (var i = 0; i < episodes.length; i++) {
        var synopsis = episodes[i].attributes.synopsis;
        var titles = episodes[i].attributes.titles.en;
        var slug = episodes[i].attributes.slug;
        var posterImage = episodes[i].attributes.posterImage.original;
        var ageRating = episodes[i].attributes.ageRating
        var series = episodes[i].attributes.episodeCount

        $('.details').append(
          '<div class="col-6"' +
            '<div class="card">' +
              '<img class="card-img-top" src="' + posterImage + '" alt="Card image cap">' +
              '<div class="card-block">' +
              '<button class="button" type="button" data-toggle="collapse" data-target="#collapseExample' + slug + ' "aria-expanded="false" aria-controls="collapseExample">' + titles + '</button>' +
              '<div class="collapse" id="collapseExample' + slug + '">' +
                '<div class="card card-block">' +
                  '<p class="card-text">'+ synopsis + '</p>' +
                '</div>' +
              '</div>' +
              '<p class="card-text"> Rating: '+ ageRating + '</p>' +
              '<p class="card-text"> Episodes: ' + series + '</p>' +
            '</div>' +
          '</div>'
        )
      }
    })
  })
  })
