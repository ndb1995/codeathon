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
