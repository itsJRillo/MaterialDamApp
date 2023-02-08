// Cordova 
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

// GUI 
(function($){
    $(function(){
  
      $('.sidenav').sidenav();
  
    });
    $('.tabs').tabs({"swipeable":true});
    $('#tabs-swipe-demo').tabs("select", "tab2");

    $("#articles-list-button").click(loadArticles)
    

  })(jQuery); // end of jQuery name space

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function loadArticles() {
  $("#article-list").append('<ul id="list" class="collection with-header"> <li class="collection-header"><h4>News</h4></li> </ul>');

  $.ajax({
    method: "GET",
    url: "https://api.spaceflightnewsapi.net/v3/articles",
    dataType: "json",   // necessitem això pq ens retorni un objecte JSON
  }).done(function (msg) {
    for(let item in msg) {
      var title = msg[item].title;

      $("#list").append(`
        <li class="collection-item"><a href="#" style="unset: all;">${title}</a></li>
        `);

      $("#article-cards").append(`
      <div class="col s12 m6 l4">
        <div class="card medium">
          <div class="card-image">
            <img src="${msg[item].imageUrl}">
            <span class="card-title">${msg[item].title}</span>
          </div>
          <div class="card-content">
            <p>${msg[item].summary}</p>
          </div>
          <div class="card-action">
            Published at ${new Date(msg[item].publishedAt).toLocaleDateString("en-US",options)}
          </div>
        </div>
      </div>
      `);
    };
  }).fail(function () {
    alert("ERROR");
  });
}