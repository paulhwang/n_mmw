/*
  Copyrights reserved
  Written by Paul Hwang
*/
function GoPlayRootObject() {
    "use strict";
    this.init__ = function() {
        this.thePhwangObject = new PhwangClass(this);
        this.phwangObject().initObject();
        this.phwangObject().getStorageLinkSessionData();
        this.phwangAjaxObject().startWatchDog(this.phwangLinkObject());
        this.theAjaxObject = new GoAjaxClass(this);
        this.theConfigStorageObject = new GoConfigStorageObject(this);
        this.theConfigObject = new GoPlayConfigObject(this);
        this.configObject().getStorageConfigData();
        this.theBoardObject = new GoPlayBoardObject(this);
        this.thePortObject = new GoPlayPortObject(this);
        this.theGameObject = new GoPlayGameObject(this);
        this.theHtmlObject = new GoPlayHtmlObject(this);
        this.theInputObject = new GoPlayInputObject(this);
        this.theDisplayObject = new GoPlayDisplayObject(this);
        this.thePhwangSessionObject = this.phwangLinkObject().mallocSessionAndInsert(this.phwangSessionObject().sessionId());
        this.phwangLinkObject().insertSession(this.phwangSessionObject());
        this.phwangSessionObject().setThemeObject(this.portObject());
        this.debug(true, "init__", "myName=" + this.phwangLinkObject().myName() + " linkId=" + this.phwangLinkObject().linkId() + " sessionId=" + this.phwangSessionObject().sessionId());
        this.debug(true, "init__", "boardSize=" + this.configObject().boardSize() + " stoneColor=" + this.configStorageObject().myColor() + " komi=" + this.configObject().komiPoint() + " handicap=" + this.configObject().handicapPoint());
    };
    this.objectName = function() {return "GoPlayRootObject";};
    this.phwangObject = function() {return this.thePhwangObject;};
    this.phwangAjaxObject = function() {return this.phwangObject().phwangAjaxObject();};
    this.phwangLinkObject = function() {return this.phwangObject().phwangLinkObject();};
    this.phwangSessionObject = function() {return this.phwangObject().phwangSessionObject();};
    this.ajaxObject = function() {return this.theAjaxObject;};
    this.htmlObject = function() {return this.theHtmlObject;};
    this.configStorageObject = function() {return this.theConfigStorageObject;};
    this.inputObject = function() {return this.theInputObject;};
    this.displayObject = function() {return this.theDisplayObject;};
    this.configObject = function() {return this.theConfigObject;};
    this.boardObject = function() {return this.theBoardObject;};
    this.gameObject = function() {return this.theGameObject;};
    this.portObject = function() {return this.thePortObject;};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {this.logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {this.abend_(this.objectName() + "." + str1_val, str2_val);};
    this.logit_ = function(str1_val, str2_val) {this.phwangObject().LOG_IT(str1_val, str2_val);};
    this.abend_ = function(str1_val, str2_val) {this.phwangObject().ABEND(str1_val, str2_val);};
    this.init__();
}
function GoPlayHtmlObject(root_object_val) {
    "use strict";
    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.theCanvasWidth = 432;
        this.initElements();
        this.setupHtmlInput();
        this.debug(true, "init__", "");
    };
    this.initElements = function() {
        this.theCanvasElement = window.document.getElementById("go_canvas");
        if (this.canvasElement() === null) {
            this.abend("GoUiObject", "null canvasElement");
            return;
        }
        this.canvasElement().setAttribute("style", "border:1px solid #000000;");
        this.canvasElement().width = this.canvasWidth() * 3 + 60;
        this.canvasElement().height = this.canvasWidth() * 1.5;
        this.theCanvasContext = this.canvasElement().getContext("2d");
        if (this.canvasContext() === null) {
            this.abend("GoUiObject", "null canvasContext");
            return;
        }
        this.theBlackScoreElement = window.document.getElementById("black_score");
        if (this.blackScoreElement() === null) {
            this.abend("GoUiObject", "null theBlackScoreElement");
            return;
        }
        this.theWhiteScoreElement = window.document.getElementById("white_score");
        if (this.whiteScoreElement() === null) {
            this.abend("GoUiObject", "null theWhiteScoreElement");
            return;
        }
    };
    this.setupHtmlInput = function(str1_val, str2_val) {
        var this0 = this;
        $("canvas").on("click", function(event) {
            this0.inputObject().uiClick(event.clientX, event.clientY);
        });
        $("canvas").on("mousemove", function(event) {
            this0.inputObject().uiMouseMove(event.clientX, event.clientY);
        });
    };
    this.objectName = function() {return "GoPlayHtmlObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.phwangObject = function() {return this.rootObject().phwangObject();};
    this.configObject = function() {return this.rootObject().configObject();};
    this.ajaxObject = function() {return this.rootObject().ajaxObject();};
    this.inputObject = function() {return this.rootObject().inputObject();};
    this.renderNameListFuncExist = function() {return false;};
    this.canvasWidth = function() {return this.theCanvasWidth;};
    this.canvasElement = function() {return this.theCanvasElement;};
    this.canvasContext = function() {return this.theCanvasContext;};
    this.blackScoreElement = function() {return this.theBlackScoreElement;};
    this.whiteScoreElement = function() {return this.theWhiteScoreElement;};
    this.getGridLength = function() {return this.canvasWidth() / 10;};
    //this.getGridLength = function() {return this.canvasElement().width / (this.configObject().boardSize() + 1);};
    this.getArrowUnitLength = function() {return this.canvasElement().width / 20;};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
}
function GoAjaxClass(root_object_val) {
    "use strict";
    this.init__ = function (root_object_val) {this.theRootObject = root_object_val;};
    this.receiveSetupLinkResponse = function(result_val) {};
    this.receiveGetNameListResponse = function(result_val) {};
    this.receiveSetupSessionResponse = function(result_val) {};
    this.receiveSetupSession2Response = function(result_val) {};
    this.receiveSetupSession3Response = function(result_val) {};
    this.receivePutSessionDataResponse = function (result_val) {};
    this.receiveGetSessionDataResponse = function (result_val, data_val) {};
    this.objectName = function() {return "GoAjaxClass";};
    this.rootObject = function() {return this.theRootObject;};
    this.phwangObject = function() {return this.rootObject().phwangObject();};
    this.htmlObject = function() {return this.rootObject().htmlObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
}
var go_play_main = function() {"use strict"; new GoPlayRootObject();};
$(document).ready(go_play_main);
