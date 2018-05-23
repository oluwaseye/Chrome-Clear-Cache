(function() {
    var chromeCachingEnabled = false;
    var clearExistingCache = false;
    var notifyUser = false;

    var clearCache = (function() {
        if (!clearExistingCache) {
            if (typeof(chrome.browsingData) !== 'undefined') {
                clearExistingCache = true;
                var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
                var oneWeekAgo = (new Date()).getTime() - millisecondsPerWeek;
                
                //Chrome 19:
                chrome.browsingData.removeCache({
                      "since": oneWeekAgo
                    }, function() {
                    clearExistingCache = false;
                });
            } else if (!notifyUser) {
                notifyUser = true;
                alert("Your browser does not supported");
            }
        }
    });

    var disableChromeCaching = (function() {
        chrome.browserAction.setIcon({path:"icon-on.png"});
        chrome.browserAction.setTitle({title:"No Cache enabled"});
        chromeCachingEnabled = false;
        chrome.webRequest.onBeforeRequest.addListener(clearCache, {urls: ["<all_urls>"]});
    });
    
    var enableChromeCaching = (function() {
        chrome.browserAction.setIcon({path:"icon-off.png"});
        chrome.browserAction.setTitle({title:"No Cache disabled"});
        chromeCachingEnabled = true;
        chrome.webRequest.onBeforeRequest.removeListener(clearCache);
    });
    
    var extentionStatus = (function() {
        chromeCachingEnabled ? disableChromeCaching() : enableChromeCaching();
    });

    chrome.browserAction.onClicked.addListener(extentionStatus);
    
    if (localStorage && localStorage["NoCacheOnDefault"] && localStorage["NoCacheOnDefault"] === "on") {
        disableChromeCaching();
    } else {
        enableChromeCaching();
    }
})();