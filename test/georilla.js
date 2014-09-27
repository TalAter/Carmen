/*

A monkey patch for replacing the navigator.geolocation of a browser with a fake
object that has a simple setter for the current position.

Based on W3C's Geolocation API Specification (Editor's Draft 10 February 2010)
http://dev.w3.org/geo/api/spec-source.html

*/


// Helper function for readability
var exists = function (something) {
    return typeof(something) !== 'undefined';
};

var georilla = {};

georilla.patch = function () {
    if (!exists(georilla.productionVersion)) {
        georilla.productionVersion = navigator.geolocation;
        var geo = georilla.newGeolocation();
        navigator.__defineGetter__('geolocation', function () { return geo; });
    }
};
georilla.unpatch = function () {
    if (exists(georilla.productionVersion)) {
        navigator.__defineGetter__('geolocation', function () { return georilla.productionVersion; });
        delete georilla.productionVersion;
    }
};

georilla.newGeolocation = function () {
    var geo = {
        currentTime: 0,
        nextWatchId: 0,
        watchSuccessCallbacks: {},
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3
    };

    // Test function to set the current position
    geo.setCurrentPosition = function (position) {
        geo.currentPosition = position;
        geo.currentTime = position.timestamp;

        // If we have any active callbacks, let them know and remove them
        if (exists(geo.successCallback)) {
            geo.successCallback(position);
            delete geo.successCallback;
        }

        // And let any watchers know
        for (watchId in geo.watchSuccessCallbacks) {
            if (geo.watchSuccessCallbacks.hasOwnProperty(watchId)) {
                var callbacks = geo.watchSuccessCallbacks[watchId];
                // Callback and restart our error callback timer
                callbacks.onSuccess(position);
                callbacks.resetTimeout();
                callbacks.startTimeout();
            }
        }
    };

    // Test function to override the current time set from the last position
    // information
    geo.setCurrentTime = function (timestamp) {
        geo.currentTime = timestamp;
    };

    geo.getCurrentPosition = function (successCallback, errorCallback, options) {
        var maximumAge = 0;
        if (exists(options) && exists(options.maximumAge)) {
            maximumAge = options.maximumAge;
        }

        var timeout = Infinity;
        if (exists(options) && exists(options.timeout)) {
            timeout = options.timeout;
        }

        if (exists(geo.currentPosition) &&
            (geo.currentTime - geo.currentPosition.timestamp) <= maximumAge) {
            // We have a cached position, callback straightaway
            successCallback(geo.currentPosition);
        } else {
            // Set a timeout we'll wait for a position for
            if (timeout <= 0) {
                errorCallback({code: geo.TIMEOUT});
                return;
            }

            var onTimeout = function () {
                delete geo.successCallback;
                if (exists(errorCallback)) {
                    errorCallback({code: geo.TIMEOUT});
                }
            };
            setTimeout(onTimeout, timeout);
            geo.successCallback = successCallback;
        }
    };

    geo.watchPosition = function (successCallback, errorCallback, options) {
        var maximumAge = 0;
        if (exists(options) && exists(options.maximumAge) && (options.maximumAge > 0)) {
            maximumAge = options.maximumAge;
        }

        var timeout = Infinity;
        if (exists(options) && exists(options.timeout)) {
            timeout = options.timeout;
        }

        // Setup callbacks for watch timer
        var previousTimerId = -1;
        var resetTimeout = function () {
            // Get rid of the last timer to have been started
            clearTimeout(previousTimerId);
        };
        var startTimeout = function () {
            // Schedule a timeout error callbck
            var onError = function () {
                if (exists(errorCallback)) {
                    errorCallback( { code: geo.TIMEOUT } );
                }
                startTimeout();
            };
            previousTimerId = setTimeout(onError, timeout);
        };

        // Kick off our first error callback
        startTimeout();

        if (exists(geo.currentPosition) &&
            (geo.currentTime - geo.currentPosition.timestamp) <= maximumAge) {
            // Got a cached position that's young enough
            successCallback(geo.currentPosition);
        }

        geo.nextWatchId++;
        geo.watchSuccessCallbacks[geo.nextWatchId] = {
            onSuccess: successCallback,
            resetTimeout: resetTimeout,
            startTimeout: startTimeout
        }
        return geo.nextWatchId;
    };

    geo.clearWatch = function (watchId) {
        geo.watchSuccessCallbacks[watchId].resetTimeout();
        delete(geo.watchSuccessCallbacks[watchId]);
    }

    return geo;
};

georilla.patch()
