var test ='https://kitsu.io/api/edge/anime?filter[text]=attack on titan'
var loading = $('.loading')

$(document).ready(function() {

  $('.searchButton').click(function(event) {
    event.preventDefault()
    $('.details').empty()
    displayLoading()
    var type = $('.custom-select').val()
    var title = $('#search').val()
    var basicSearch = 'https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0&filter[' + type + ']=' + title
    $.get(basicSearch)
    .then(function(data) {
      var episodes = data.data;

      for (var i = 0; i < episodes.length; i++) {
        var synopsis = episodes[i].attributes.synopsis;
        var titles = episodes[i].attributes.titles.en;
        if (!titles && !episodes[i].attributes.titles.en_jp) {
          titles = episodes[i].attributes.titles.en_us
        }
        else if (!titles) {
          titles = episodes[i].attributes.titles.en_jp
        }
        var slug = episodes[i].attributes.slug;
        var posterImage = episodes[i].attributes.posterImage.original;
        var ageRating = episodes[i].attributes.ageRating
        var series = episodes[i].attributes.episodeCount

        hideLoading()
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
    function displayLoading() {
      loading.removeClass('hide')
    }

    function hideLoading() {
      loading.addClass('hide')
    }
  })

  $('.ranbtn').click(idSearchFunction)
})

function idSearchFunction(event) {
  if (event) {
    event.preventDefault()
  }
  displayLoading()
    $('.details').empty()
    var id = Math.ceil(Math.random()*13500)

  var idSearch = `https://kitsu.io/api/edge/anime/${id}`
  $.get(idSearch)
  .then(function(data) {
    var episodes = data.data;


      var synopsis = episodes.attributes.synopsis;
      var titles = episodes.attributes.titles.en;
      if (!titles && !episodes.attributes.titles.en_jp) {
        titles = episodes.attributes.titles.en_us
      }
      else if (!titles) {
        titles = episodes.attributes.titles.en_jp
      }
      var slug = episodes.attributes.slug;
      var posterImage = episodes.attributes.posterImage.original;
      var ageRating = episodes.attributes.ageRating
      var series = episodes.attributes.episodeCount

      hideLoading()
      $('.details').append(
        '<div class="col-9"' +
          '<div class="card">' +
            '<img class="card-img-top img-top" src="' + posterImage + '" alt="Card image cap">' +
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

  })
  .catch(function (error) {
    idSearchFunction()
  })
  function displayLoading() {
    loading.removeClass('hide')
  }

  function hideLoading() {
    loading.addClass('hide')
  }

}
