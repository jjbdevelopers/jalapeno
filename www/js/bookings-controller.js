var c = c || {};

c.BookingsController = function () {
    this.localStorageKey = "c.bookings";
    this.$bookingsPage = null;
    this.$btnRefresh = null;
};

c.BookingsController.prototype.init = function () {
    this.$bookingsPage = $("#page-bookings");
    this.$btnRefresh = $("#btn-refresh", this.$bookingsPage);
};

c.BookingsController.prototype.getBookingsFromLocalStorage = function () {
    return window.localStorage.getItem(this.localStorageKey) || [];
};

c.BookingsController.prototype.showBookings = function () {

    var bookings = this.getBookingsFromLocalStorage();

    // TODO: Build bookings DOM.
};

c.BookingsController.prototype.getBookingsFromServer = function (successCallback, errorCallback) {
    var session = c.Session.getInstance().get();

    if (!session) {
        return errorCallback({ err: c.ApiMessages.SESSION_NOT_FOUND });
    }

    $.ajax({
        type: 'GET',
        url: c.Settings.bookingsUrl + "/sessionId=" + session.sessionId,
        success: successCallback,
        error: errorCallback
    });
};

c.BookingsController.prototype.onRefreshCommand = function () {
    
    this.getBookingsFromServer(
        function (resp) {
            // TODO
        },
        function (error) {
            // TODO
        }
    );
};