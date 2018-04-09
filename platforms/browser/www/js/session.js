var c = c || {};

c.Session = (function () {
    var instance;

    function init() {

        var sessionIdKey = "oasys-session";

        return {
            // Public methods and variables.
            set: function (sessionData) {
                window.localStorage.setItem(sessionIdKey, JSON.stringify(sessionData));
            },
            get: function () {

                var result = null;

                try {
                    result = JSON.parse(window.localStorage.getItem(sessionIdKey));
                } catch (e) {
                }

                return result;
            }
        };
    }
    ;

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
        , deleteInstance: function () {
            var sessionIdKey = "oasys-session";
            window.localStorage.removeItem(sessionIdKey);
        }
    };
}());