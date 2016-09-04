$(document).ready(function() {
    $('#content').load('home.html');
    
    $('#navi a').click(function() {
        $('#navi a').removeClass('active');
        $(this).addClass('active');
        $('#content').load(this.getAttribute('src'));
        
    });
    
});

