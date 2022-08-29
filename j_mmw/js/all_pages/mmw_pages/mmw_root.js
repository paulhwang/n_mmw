/*
  Copyrights reserved
  Written by Paul Hwang
*/
function LoginRootObject() {
    "use strict";
    this.init__ = function() {
        this.thePhwangObject = new PhwangClass(this);
        this.phwangObject().initObject();
        this.theAjaxObject = new LoginAjaxClass(this);
        this.theHtmlObject = new LoginHtmlObject(this);
        this.debug(true, "init__", "myName=" + this.phwangLinkObject().myName() + " linkId=" + this.phwangLinkObject().linkId());
    };
    this.objectName = function() {return "LoginRootObject";};
    this.phwangObject = function() {return this.thePhwangObject;};
    this.phwangAjaxObject = function() {return this.phwangObject().phwangAjaxObject();};
    this.phwangLinkObject = function() {return this.phwangObject().phwangLinkObject();};
    this.phwangSessionObject = function() {return this.phwangObject().phwangSessionObject();};
    this.htmlObject = function() {return this.theHtmlObject;};
    this.ajaxObject = function() {return this.theAjaxObject;};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.abend_(this.objectName() + "." + str1_val, str2_val);};
    this.logit_ = function(str1_val, str2_val) {this.phwangObject().LOG_IT(str1_val, str2_val);};
    this.abend_ = function(str1_val, str2_val) {this.phwangObject().ABEND(str1_val, str2_val);};
    this.init__();
}
function LoginHtmlObject(root_object_val) {
    "use strict";
    this.gotoNextPage = function() {window.open(this.phwangObject().serverHttpHeader() + "go_act.html", "_self")};
    this.init__ = function(root_object_val) {this.theRootObject = root_object_val; this.setupHtmlInput();};
    this.setupHtmlInput = function() {
        var this0 = this;
        $(".login_section .login_button").on("click", function() {
            this0.phwangLinkObject().setMyName($(".login_section .login_name").val());
            var password = $(".login_section .login_password").val();
            this0.debug(true, "setupHtmlInput", "myName=" + this0.phwangLinkObject().myName() + " password=" + password);
            if (this0.phwangLinkObject().myName()) {
                this0.phwangAjaxObject().setupLink(this0.phwangLinkObject(), password);
            }
        });
    };
    this.objectName = function() {return "LoginHtmlObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.phwangObject = function() {return this.rootObject().phwangObject();};
    this.phwangAjaxObject = function() {return this.phwangObject().phwangAjaxObject();};
    this.phwangLinkObject = function() {return this.phwangObject().phwangLinkObject();};
    this.ajaxObject = function() {return this.rootObject().ajaxObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
}
function LoginAjaxClass(root_object_val) {
    "use strict";
    this.init__ = function(root_object_val) {this.theRootObject = root_object_val;};
    this.receiveSetupLinkResponse = function(result_val) {
        this.phwangObject().putStorageLinkData();
        this.htmlObject().gotoNextPage();
    };
    this.receiveGetNameListResponse = function(result_val) {};
    this.receiveSetupSessionResponse = function(result_val) {};
    this.receiveSetupSession2Response = function(result_val) {};
    this.receiveSetupSession3Response = function(result_val) {};
    this.receivePutSessionDataResponse = function(result_val) {};
    this.receiveGetSessionDataResponse = function(result_val, data_val) {};
    this.objectName = function() {return "LoginAjaxClass";};
    this.rootObject = function() {return this.theRootObject;};
    this.phwangObject = function() {return this.rootObject().phwangObject();};
    this.htmlObject = function() {return this.rootObject().htmlObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
}
var login_main = function() {"use strict"; new LoginRootObject();};
$(document).ready(login_main);
