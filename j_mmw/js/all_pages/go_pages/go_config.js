/*
 * Copyrights phwang
 * Written by Paul Hwang
 */

function GoPlayConfigObject(root_val) {
    "use strict";
    this.init__ = function(root_val) {
        this.theRootObject = root_val;
        this.debug(true, "init__", "myColor=" + this.myColor() + " boardSize=" + this.boardSize() + " hisName=" + this.hisName() + " handicapPoint=" + this.handicapPoint() + " komiPoint=" + this.komiPoint());
    };
    this.getStorageConfigData = function() {
        this.setBoardSize(this.configStorageObject().boardSize());
        this.setMyColor(this.configStorageObject().myColor());
        this.setHandicapPoint(this.configStorageObject().handicapPoint());
        this.setKomiPoint(this.configStorageObject().komiPoint());
        this.setHisName(this.configStorageObject().hisName());
        this.setPlayBothSides();
        this.debug(true, "getStorageConfigData", "myColor=" + this.myColor() + " boardSize=" + this.boardSize() + " hisName=" + this.hisName() + " handicapPoint=" + this.handicapPoint() + " komiPoint=" + this.komiPoint());
    };
    this.putStorageConfigData = function() {
        this.debug(true, "putStorageConfigData", "myColor=" + this.myColor() + " boardSize=" + this.boardSize() + " hisName=" + this.hisName() + " handicapPoint=" + this.handicapPoint() + " komiPoint=" + this.komiPoint());
        this.configStorageObject().setBoardSize(this.boardSize());
        this.configStorageObject().setMyColor(this.myColor());
        this.configStorageObject().setHandicapPoint(this.handicapPoint());
        this.configStorageObject().setKomiPoint(this.komiPoint());
        this.configStorageObject().setHisName(this.hisName());
        this.setPlayBothSides();
    };
    this.encodeConfig = function(my_name_val) {
        var len = 11 + my_name_val.length;
        var buf = "G";
        if (len < 100) buf = buf + 0; if (len < 10) buf = buf + 0; buf = buf + len;
        if (this.boardSize() < 10) buf = buf + 0; buf = buf + this.boardSize();
        if (this.handicapPoint() < 10) buf = buf + 0; buf = buf + this.handicapPoint();
        if (this.komiPoint() < 10) buf = buf + 0; buf = buf + this.komiPoint();
        buf = buf + this.hisColor();
        buf = buf + my_name_val;
        return buf;
    };
    this.decodeConfig = function(encoded_val) {
        this.debug(true, "decodeConfig", encoded_val);
        if ((encoded_val === undefined) || (encoded_val === "")) {
            this.setBoardSize(19);
            this.setHandicapPoint(0);
            this.setKomiPoint(0);
            return;
        }
        var data;
        if (encoded_val.charAt(0) != 'G') {
            this.abend("decodeConfig", "not G");
        }
        var index = 4;
        data = (encoded_val.charAt(index++) - '0') * 10
        data += encoded_val.charAt(index++) - '0';
        this.setBoardSize(data);
        data = (encoded_val.charAt(index++) - '0') * 10
        data += encoded_val.charAt(index++) - '0';
        this.setHandicapPoint(data);
        data = (encoded_val.charAt(index++) - '0') * 10
        data += encoded_val.charAt(index++) - '0';
        this.setKomiPoint(data);
        data = encoded_val.charAt(index++) - '0';
        this.setMyColor(data);
        this.setHisName(encoded_val.slice(index));
    };
    this.playBothSides = function() {return this.thePlayBothSides;};
    this.setPlayBothSides = function() {this.thePlayBothSides = (this.phwangLinkObject().myName() === this.hisName());};
    this.boardSize = function() {return this.theBoardSize;};
    this.setBoardSize = function(val) {this.theBoardSize = val;};
    this.myColor = function() {return this.theMyColor;};
    this.setMyColorConverted = function(val) {if (val === "black") {this.theMyColor = GO.BLACK_STONE();} else if (val === "white") {this.theMyColor = GO.WHITE_STONE();} else {this.abend("setMyColor", val);}};
    this.setMyColor = function(val) {this.theMyColor = val;};
    this.hisColor = function() {if (this.myColor() === GO.BLACK_STONE()) {return GO.WHITE_STONE();} else {return GO.BLACK_STONE();}};
    this.hisName = function() {return this.theHisName;};
    this.setHisName = function(val) {return this.theHisName = val;};
    this.handicapPoint = function() {return this.theHandicapPoint;};
    this.setHandicapPoint = function(val) {this.theHandicapPoint = val;};
    this.komiPoint = function() {return this.theKomiPoint;};
    this.setKomiPoint = function(val) {this.theKomiPoint = val;};
    this.realKomiPoint = function() {if (!this.komiPoint()) {return 0;} return this.komiPoint() + 0.5;};
    this.isValidCoordinates = function(x_val, y_val) {return this.isValidCoordinate(x_val) && this.isValidCoordinate(y_val);};
    this.isValidCoordinate = function(coordinate_val) {return (0 <= coordinate_val) && (coordinate_val < this.boardSize());};
    this.objectName = function() {return "GoPlayConfigObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.configStorageObject = function() {return this.rootObject().configStorageObject();};
    this.phwangLinkObject = function() {return this.rootObject().phwangLinkObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_val);
}

function GoConfigStorageObject(root_val) {
    "use strict";
    this.init__ = function (root_val) {
        this.theRootObject = root_val;
        this.debug(true, "init__", "myColor=" + this.myColor() + " boardSize=" + this.boardSize() + " hisName=" + this.hisName() + " handicapPoint=" + this.handicapPoint() + " komiPoint=" + this.komiPoint());
    };
    this.storage = function() {return localStorage;};
    this.myColor = function() {return Number(this.storage().go_my_color);};
    this.setMyColor = function(val) {this.storage().go_my_color = val;};
    this.hisColor = function() {if (this.myColor() === GO.BLACK_STONE()) {return GO.WHITE_STONE();} else {return GO.BLACK_STONE();}};
    this.hisName = function() {return this.storage().go_his_name;};
    this.setHisName = function(val) {this.storage().go_his_name = val;};
    this.boardSize = function() {return Number(this.storage().go_board_size);};
    this.setBoardSize = function(val) {this.storage().go_board_size = val;};
    this.handicapPoint = function() {return Number(this.storage().go_handicap_point);};
    this.setHandicapPoint = function(val) {this.storage().go_handicap_point = val;};
    this.komiPoint = function() {return Number(this.storage().go_komi_point);};
    this.setKomiPoint = function (val) {this.storage().go_komi_point = val;};
    this.goEncodedConfig = function() {return this.storage().go_encoded_config;};
    this.setGoEncodedConfig = function(val) {this.storage().go_encoded_config = val;};
    this.objectName = function() {return "GoConfigStorageObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.debug = function (debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function (str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function (str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_val);
}

var GO = new GoDefineObject;
function GoDefineObject() {
    this.EMPTY_STONE = function() {return 0;};
    this.BLACK_STONE = function() {return 1;};
    this.WHITE_STONE = function() {return 2;};
    this.BOTH_COLOR_STONE = function() {return 2;};
    this.MARK_DEAD_STONE_DIFF = function() {return 4;};
    this.MARK_EMPTY_STONE_DIFF = function() {return 6;};
    this.MARKED_DEAD_BLACK_STONE = function() {return this.BLACK_STONE() + this.MARK_DEAD_STONE_DIFF();};
    this.MARKED_DEAD_WHITE_STONE = function() {return this.WHITE_STONE() + this.MARK_DEAD_STONE_DIFF();};
    this.MARKED_EMPTY_BLACK_STONE = function() {return this.BLACK_STONE() + this.MARK_EMPTY_STONE_DIFF();};
    this.MARKED_EMPTY_WHITE_STONE = function() {return this.WHITE_STONE() + this.MARK_EMPTY_STONE_DIFF();};
}
