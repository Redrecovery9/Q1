var loading = $('.loading')
var errorLoading = $('.errorLoading')


$(document).ready(function() {

  $('.searchButton').click(function (event) {
    event.preventDefault()
    $('.details').empty()
    var type = $('.custom-select').val()
    var title = $('#search').val()
    hideErrorLoading()
    if (!type || !title) {
      displayErrorLoading()
    }
    else {
      displayLoading()
    }

    var basicSearch = 'https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0&filter[' + type + ']=' + title
    $.get(basicSearch)
      .then(function(data) {
        var episodes = data.data;
        if (data.data.length === 0) {
          displayErrorLoading()
          hideLoading()
        }
        episodes.forEach(function(episode){
          console.log(episode);
          var synopsis = episode.attributes.synopsis;
          var titles = episode.attributes.titles.en;
          var slug = episode.attributes.slug;
          var posterImage = episode.attributes.posterImage.original;
          var ageRating = episode.attributes.ageRating
          var series = episode.attributes.episodeCount
          if (!titles && !episode.attributes.titles.en_jp) {
            titles = episode.attributes.titles.en_us
          }
          else if (!titles) {
            titles = episode.attributes.titles.en_jp
          }
          hideLoading()
          hideErrorLoading()
          appendCards('col-lg-6 col-md-7 col-sm-8', posterImage, slug, titles, synopsis, ageRating, series)
        })
      })
      .catch(function (error) {
        var posterImage = episodes[i].attributes.posterImage.large;
      })
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
    var slug = episodes.attributes.slug;
    var posterImage = episodes.attributes.posterImage.original;
    var ageRating = episodes.attributes.ageRating
    var series = episodes.attributes.episodeCount
    if (!titles && !episodes.attributes.titles.en_jp) {
      titles = episodes.attributes.titles.en_us
    }
    else if (!titles) {
      titles = episodes.attributes.titles.en_jp
    }
    hideLoading()
    appendCards('col-9', posterImage, slug, titles, synopsis, ageRating, series)
  })
  .catch(function (error) {
    idSearchFunction()
  })
}

function appendCards(columnString, posterImage, slug, titles, synopsis, ageRating, series) {
  $('.details').append(
    `<div class=${columnString}
        <div class="card">
          <img class="card-img-top" src=" ${posterImage} "alt="Card image cap">
          <div class="card-block">
          <button class="button" type="button" data-toggle="collapse" data-target="#collapseExample${slug}" aria-expanded="false" aria-controls="collapseExample"> ${titles} </button>
          <div class="collapse" id="collapseExample${slug}">
            <div class="card card-block">
              <p class="card-text"> ${synopsis} </p>
            </div>
          </div>
          <p class="card-text">Rating: ${ageRating}</p>
          <p class="card-text">Episodes: ${series}</p>
        </div>
      </div>`
  )
}

function displayLoading() {
  loading.removeClass('hide')
}

function displayErrorLoading() {
  errorLoading.removeClass('hide')
}

function hideLoading() {
  loading.addClass('hide')
}

function hideErrorLoading() {
  errorLoading.addClass('hide')
}
