var c = c || {};

c.SignOutController = function () {

    this.$signInPage = null;    
    this.$btnSubmit = null;
    this.$ctnErr = null;    
    this.papPageId=null;
};

c.SignOutController.prototype.init = function () {
    this.$signInPage = $("#page-signin");    
    this.papPageId = "#pap";
    this.$btnSubmit = $("#btn-submit", this.papPageId);
};

c.SignOutController.prototype.cerrarSession = function () {
    c.Session.deleteInstance();
    $.mobile.navigate(this.$signInPage);
};
