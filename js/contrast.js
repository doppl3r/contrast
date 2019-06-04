// By: Jacob DeBenedetto
if(window.jQuery){ checkDocument(); }
else {
    // download jQuery if it doesn not exist
    var script = document.createElement('script'); 
    document.head.appendChild(script);  
    script.type = 'text/javascript';
    script.src = "https://apps-imh.kahalamgmt.com/scripts/jquery/jquery-1.9.1.min.js";
    script.onload = checkDocument;
}
function checkDocument(){
    $(document).ready(function() {
        // initialize variables
        var hostname = window.location.hostname;
        var protocol = window.location.protocol;
        var src = "";
        var append = "";
        
        // define parameter values from script url attribute
        function setParameters(){
            var params = {};
            src = $('[src*="contrast.js"').attr('src');
            if (src.substring(0, 4) != 'http') src = protocol + '//' + hostname + src;
            src.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) { params[key] = value; });
            css = params['css'];
            append = params['append'];
            if (append == null) append = 'body';
        }
        
        // inject css link
        function injectCSS(){
            // append css link if parameter exists
            if (css != null){        
                $('head').append('<link rel="stylesheet" href="' + css + '" type="text/css" />');
            }
        }

        // check contrast state
        function checkContrast(toggle){
            if (toggle == true) $('body').toggleClass('high-contrast');
            var toggleEnabled = $('body').hasClass('high-contrast');
            var toggleText = (toggleEnabled == false) ? 'enable high contrast' : 'disable high contrast';
            $(contrastToggle).text(toggleText);
        }
        
        // define URL parameters
        setParameters();
        
        // add color contrast option
        var contrastToggle = $('<a id="contrast-toggle" href="#"></a>');
        $(append).append(contrastToggle).promise().done(function(){
            // update contrast button state
            var toggleContrast = localStorage.getItem('high-contrast') == 1;
            injectCSS();
            checkContrast(toggleContrast);
            
            // add click event listener
            contrastToggle.on('click', function(e){
                e.preventDefault();
                var highContrastValue = localStorage.getItem('high-contrast');
                highContrastValue = (highContrastValue == null || highContrastValue == 0) ? 1 : 0;
                localStorage.setItem('high-contrast', highContrastValue);
                checkContrast(true);
            });
        });
    });
}