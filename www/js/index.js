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
  })(jQuery); // end of jQuery name space
  