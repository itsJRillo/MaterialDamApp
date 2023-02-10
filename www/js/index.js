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

    $("#articles-list-button").click(loadArticles);
    

  })(jQuery); // end of jQuery name space

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function loadArticles() {
  $("#article-list").html("");
  $("#article-cards").html("");
  $("#article-list").append('<ul id="list" class="collection with-header"> <li class="collection-header"><h4>News</h4></li> </ul>');

  $.ajax({
    method: "GET",
    url: "https://api.spaceflightnewsapi.net/v3/articles",
    dataType: "json",   // necessitem això pq ens retorni un objecte JSON
  }).done(function (msg) {
    for(let item in msg) {
      var title = msg[item].title;
      var id = makeid(4);

      $("#list").append(`
        <li class="collection-item"><a id="article${id}" href="#" style="unset: all;">${title}</a></li>
      `);

      $(`#article${id}`).click(function(){
        $("#article-info").html("");
        $('#tabs-swipe-demo').tabs("select", "test-swipe-2");
        loadArticle(msg[item].title,msg[item].summary,msg[item].publishedAt,msg[item].imageUrl);
      });

      $("#article-cards").append(`
      <div class="col s12 m6 l4">
        <div class="card medium">
          <div class="card-image">
            <img src="${msg[item].imageUrl}">
            <span class="card-title" style="font-size: 20px;">${msg[item].title}</span>
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

function loadArticle(title, summary, publishDate, imageUrl){

  $("#article-info").append(`
      <div class="card medium">
        <div class="card-image">
          <img src="${imageUrl}">
          <span class="card-title" style="font-size: 20px;">${title}</span>
        </div>
        <div class="card-content">
          <p>${summary}</p>
        </div>
        <div class="card-action">
          Published at ${new Date(publishDate).toLocaleDateString("en-US",options)}
        </div>
      </div>
      `);
}

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}