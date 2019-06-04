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
        var url = "";
        var append = "";
        
        // set URL parameters
        function setParameters(){
            // define parameter values from URL
            var params = {};
            src = $('[src*="contrast.js"').attr('src');
            if (src.substring(0, 4) != 'http') src = protocol + '//' + hostname + src;
            src.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) { params[key] = value; });
            css = params['css'];
            append = params['append'];
            if (append == null) append = 'body';
        }
        
        // check contrast state
        function checkContrast(toggle){
            if (toggle == true) $('body').toggleClass('high-contrast');
            var toggleEnabled = $('body').hasClass('high-contrast');
            var toggleText = (toggleEnabled == false) ? 'enable high contrast' : 'disable high contrast';
            $(contrastToggle).text(toggleText);
        }
        
        // inject css link
        function injectCSS(){
            // append css link if parameter exists
            if (css != null){        
                $('head').append('<link rel="stylesheet" href="' + css + '" type="text/css" />');
            }
        }
        
        // define URL parameters
        setParameters();
        
        // add color contrast option
        var contrastToggle = $('<a id="contrast-toggle" href="#"></a>');
        $(append).append(contrastToggle).promise().done(function(){
            // update contrast button state
            injectCSS();
            checkContrast(false);
            
            // add click event listener
            contrastToggle.on('click', function(e){
                e.preventDefault();
                checkContrast(true);
            });
        });
    });
}