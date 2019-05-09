document.addEventListener('DOMContentLoaded', function () {
    // menu
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});

    // parallax
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems, {});

    // media 
    var elems = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems, {});

    // tabs 
    var elems = document.querySelector('#tab'); 
    var instance = M.Tabs.init(elems, {});

    // dropdown
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {alignment: 'right', coverTrigger: false, constrainWidth: false});

    // modal 
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
});