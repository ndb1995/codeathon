$(window).on("scroll touchmove", function () {
  $('.header').toggleClass('header-thin', $(document).scrollTop() > 20);
  $('.back').toggleClass('back-thin', $(document).scrollTop() > 20);
  $('.close').toggleClass('close-thin', $(document).scrollTop() > 20);
});

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    // Mock device.platform property if not available
    if (!window.device) {
        window.device = { platform: 'Browser' };
    }

    handleExternalURLs();
}

function handleExternalURLs() {
    // Handle click events for all external URLs
    if (device.platform.toUpperCase() === 'ANDROID') {
        $(document).on('click', 'a[href^="http"]', function (e) {
            var url = $(this).attr('href');
            navigator.app.loadUrl(url, { openExternal: true });
            e.preventDefault();
        });
    }
    else if (device.platform.toUpperCase() === 'IOS') {
        $(document).on('click', 'a[href^="http"]', function (e) {
            var url = $(this).attr('href');
            window.open(url, '_system');
            e.preventDefault();
        });
    }
    else {
        // Leave standard behaviour
    }
}

function toggle_visibility(id) {
       var e = document.getElementById(id);
       var f = document.getElementById('learn-more');

       if(e.style.display == 'inline')
       {
         e.style.display = 'none';
         f.style.display = 'inline';
       }
       else
       {
         e.style.display = 'inline';
         f.style.display = 'none';
       }



}
