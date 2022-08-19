/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayGameObject(root_object_val) {
    "use strict";
    this.init__ = function(root_object_val) {
        this.theRootObject = root_object_val;
        this.theBlackCaptureStones = 0;
        this.theWhiteCaptureStones = 0;
        this.theLastDeadX = 0;
        this.theLastDeadY = 0;
        this.theValidLastDeadInfo = false;
        this.theBlackScoreString = null;
        this.theWhiteScoreString = null;
        this.theFinalScoreString = null;
        this.theTotalMoves = 0;
        this.theNextColor = GO.BLACK_STONE();
        this.theGameIsOver = false;
        this.debug(false, "init__", "");
    };
    this.processNewMove = function(x_val, y_val) {
        this.debug(false, "processNewMove", "(" + x_val + "," + y_val + ")");
        if (this.gameIsOver()) {
            var move = new GoMoveObject(null, x_val, y_val, GO.THE_MARK_DEAD_STONE_DIFF, this.totalMoves(), this.containerObject());
            this.portObject().transmitMoveData(move);
            return;
        }
        if (!this.isValidMoveOnBoard(x_val, y_val)) {
            return;
        }
        var move = new GoMoveObject(null, x_val, y_val, this.nextColor(), this.totalMoves() + 1, this.rootObject());
        this.portObject().transmitMoveData(move);
    };
    this.isValidMoveOnBoard = function(x_val, y_val) {
        if (this.boardObject().boardArray(x_val, y_val) !== GO.EMPTY_STONE()) {
            return false;
        }
        if (this.validLastDeadInfo() && (x_val === this.lastDeadX()) && (y_val === this.lastDeadY())) {
            return false;
        }
        return true;
    };
    this.playBothSides = function() {
        this.debug(false, "playBothSides", "myName=" + this.phwangLinkObject().myName() + " hisName=" + this.configObject().hisName());
        var result = (this.phwangLinkObject().myName() === this.configObject().hisName());
        if (this.configObject().playBothSides() !== result) {
            this.abend("playBothSides", "not match");
        }
        return result;
    };
    this.isMyTurn = function() {
        this.debug(true, "isMyTurn", "nextColor=" + this.nextColor() + ", myColor=" + this.configObject().myColor());
        return (this.playBothSides()) || (this.nextColor() === this.configObject().myColor());
    };
    this.totalMoves = function() {return this.theTotalMoves;};
    this.setTotalMoves = function(total_moves_val) {this.theTotalMoves = total_moves_val;};
    this.nextColor = function() {return this.theNextColor;};
    this.setNextColor = function(next_color_val) {this.theNextColor = next_color_val;};
    this.gameIsOver = function() {return this.theGameIsOver;};
    this.setGameIsOver = function() {this.theGameIsOver = true;};
    this.clearGameIsOver = function() {this.theGameIsOver = false;};
    this.lastDeadX = function() {return this.theLastDeadX;};
    this.setLastDeadX = function(val) {this.theLastDeadX = val;};
    this.lastDeadY = function() {return this.theLastDeadY;};
    this.setLastDeadY = function(val) {this.theLastDeadY = val;};
    this.validLastDeadInfo = function() {return this.theValidLastDeadInfo;};
    this.setValidLastDeadInfo = function(val) {this.theValidLastDeadInfo = val;};
    this.blackScoreString = function() {return this.theBlackScoreString;}
    this.setBlackScoreString = function(val) {this.theBlackScoreString = val;}
    this.whiteScoreString = function() {return this.theWhiteScoreString;}
    this.setWhiteScoreString = function(val) {this.theWhiteScoreString = val;}
    this.finalScoreString = function() {return this.theFinalScoreString;}
    this.setFinalScoreString = function(val) {this.theFinalScoreString = val;}
    this.objectName = function() {return "GoPlayGameObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.phwangObject = function() {return this.rootObject().phwangObject();};
    this.phwangLinkObject = function() {return this.phwangObject().phwangLinkObject();};
    this.phwangSessionObject = function() {return this.phwangObject().phwangSessionObject();};
    this.storageObject = function() {return this.rootObject().storageObject();};
    this.configObject = function() {return this.rootObject().configObject();};
    this.boardObject = function() {return this.rootObject().boardObject();};
    this.portObject = function() {return this.rootObject().portObject();};
    this.sessionObject = function() {return this.rootObject().sessionObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
}
function GoPlayPortObject(root_val) {
    "use strict";
    this.GO_PROTOCOL_GAME_INFO = function() {return "G";};
    this.GO_PROTOCOL_TIME_INFO = function() {return "T";};
    this.GO_PROTOCOL_CHAT_INFO = function() {return "C";};
    this.GO_PROTOCOL_MOVE_COMMAND = function() {return "M";};
    this.GO_PROTOCOL_PASS_COMMAND = function() {return "P";};
    this.GO_PROTOCOL_BACKWARD_COMMAND = function() {return "b";};
    this.GO_PROTOCOL_DOUBLE_BACKWARD_COMMAND = function() {return "B";};
    this.GO_PROTOCOL_FORWARD_COMMAND = function() {return "f";};
    this.GO_PROTOCOL_DOUBLE_FORWARD_COMMAND = function() {return "F";};
    this.GO_PROTOCOL_RESIGN_COMMAND = function() {return "R";};
    this.GO_PROTOCOL_CONFIRM_COMMAND = function() {return "C";};
    this.GO_PROTOCOL_CONTINUE_COMMAND = function() {return "c";};
    this.init__ = function(root_val) {this.theRootObject = root_val;};
    this.transmitMoveData = function(move_val) {this.transmitGameData(this.GO_PROTOCOL_MOVE_COMMAND() + move_val.encodeMove());};
    this.transmitPassCommand = function() {this.transmitGameData(this.GO_PROTOCOL_PASS_COMMAND());};
    this.transmitBackwardCommand = function() {this.transmitGameData(this.GO_PROTOCOL_BACKWARD_COMMAND());};
    this.transmitDoubleBackwardCommand = function() {this.transmitGameData(this.GO_PROTOCOL_DOUBLE_BACKWARD_COMMAND());};
    this.transmitForwardCommand = function() {this.transmitGameData(this.GO_PROTOCOL_FORWARD_COMMAND());};
    this.transmitDoubleForwardCommand = function() {this.transmitGameData(this.GO_PROTOCOL_DOUBLE_FORWARD_COMMAND());};
    this.transmitResignCommand = function() {this.transmitGameData(this.GO_PROTOCOL_RESIGN_COMMAND());};
    this.transmitConfirmCommand = function() {this.transmitGameData(this.GO_PROTOCOL_CONFIRM_COMMAND());};
    this.transmitContinueCommand = function() {this.transmitGameData(this.GO_PROTOCOL_CONTINUE_COMMAND());};
    this.transmitGameData = function(data_val) {
        this.debug(false, "transmitGameData", "data_val=" + data_val);
        this.inputObject().setPendingRequestExist();
        this.transmitData(this.GO_PROTOCOL_GAME_INFO() + data_val);
    };
    this.transmitData = function(data_val) {
        this.debug(false, "transmitData", "data_val=" + data_val);
        this.phwangSessionObject().transmitData(data_val);
    };
    this.receiveData = function(data_val) {
        this.debug(false, "receiveData", "data_val=" + data_val);
        if (data_val.charAt(0) === this.GO_PROTOCOL_GAME_INFO().charAt(0)) {
            this.receiveGameData(data_val.slice(1));
            return;
        }
        if (data_val.charAt(0) === this.GO_PROTOCOL_TIME_INFO().charAt(0)) {
            return;
        }
        if (data_val.charAt(0) === this.GO_PROTOCOL_CHAT_INFO().charAt(0)) {
            return;
        }
        this.abend("receiveData", "data_val=" + data_val);
    };
    this.receiveGameData = function(data_val) {
        this.inputObject().clearPendingRequestExist();
        this.boardObject().decodeBoard(data_val);
        this.displayObject().drawBoard();
    };
    this.objectName = function() {return "GoPlayPortObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.ajxObject = function() {return this.rootObject().ajxObject();};
    this.configObject = function() {return this.rootObject().configObject(); };
    this.gameObject = function() {return this.rootObject().gameObject();};
    this.inputObject = function() {return this.rootObject().inputObject();};
    this.phwangSessionObject = function() {return this.rootObject().phwangSessionObject();};
    this.boardObject = function() {return this.rootObject().boardObject();};
    this.displayObject = function() {return this.rootObject().displayObject();};
    this.debug = function (debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function (str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function (str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_val);
}
function GoMoveObject(str_val, x_val, y_val, color_val, turn_val, root_object_val) {
    "use strict";
    this.init__ = function(str_val, x_val, y_val, color_val, root_object_val) {
        this.theRootObject = root_object_val;
        if (!str_val) {
            this.theX = x_val;
            this.theY = y_val;
            this.theMyColor = color_val;
            this.theTurnIndex = turn_val;
        } else {
            this.moveObjectDecode(str_val);
        }
        this.debug(true, "init__", "(" + this.xX() + "," + this.yY() + ") color=" + this.myColor() + " turn=" + this.turnIndex());
    };
    this.encodeMove = function() {
        var buf = "";
        if (this.xX() < 10) {buf = buf + 0;} buf = buf + this.xX();
        if (this.yY() < 10) {buf = buf + 0;} buf = buf + this.yY();
        buf = buf + this.myColor();
        if (this.turnIndex() < 100) {buf = buf + 0;} if (this.turnIndex() < 10) {buf = buf + 0;} buf = buf + this.turnIndex();
        return buf;
    };
    this.moveObjectDecode = function(str_val) {
        var index = 0;
        this.theX = (str_val.charAt(index++) - '0') * 10;
        this.theX += (str_val.charAt(index++) - '0');
        this.theY = (str_val.charAt(index++) - '0') * 10;
        this.theY += (str_val.charAt(index++) - '0');
        this.theMyColor = (str_val.charAt(index++) - '0');
        this.theTurnIndex = (str_val.charAt(index++) - '0') * 100;
        this.theTurnIndex += (str_val.charAt(index++) - '0') * 10;
        this.theTurnIndex += (str_val.charAt(index++) - '0');
    };
    this.objectName = function() {return "GoMoveObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.xX = function() {return this.theX;};
    this.yY = function() {return this.theY;};
    this.myColor = function() {return this.theMyColor;};
    this.turnIndex = function() {return this.theTurnIndex;};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(str_val, x_val, y_val, color_val, root_object_val);
}
function GoPlayBoardObject(root_val) {
    "use strict";
    this.init__ = function (root_val) {
        this.theRootObject = root_val;
        this.theBoardArray = [19];
        this.theMarkedBoardArray = [19];
        for (var i = 0; i < 19; i++) {
            this.theBoardArray[i] = [19];
            this.theMarkedBoardArray[i] = [19];
        }
        this.resetBoardObjectData();
        this.debug(false, "init__", "");
    };
    this.addStoneToBoard = function(x_val, y_val, color_val) {
        if (!GO.isValidCoordinates(x_val, y_val, this.configObject().boardSize())) {
            this.goAbend("addStoneToBoard", "x=" + x_val + " y=" + y_val);
            return;
        }
        this.setBoardArray(x_val, y_val, color_val);
    };
    this.addStoneToMarkedBoard = function(x_val, y_val, color_val) {
        if (!GO.isValidCoordinates(x_val, y_val, this.configObject().boardSize())) {
            this.goAbend("addStoneToMarkedBoard", "x=" + x_val + " y=" + y_val);
            return;
        }
        this.setMarkedBoardArray(x_val, y_val, color_val);
    };
    this.removeStoneFromMarkedBoard = function(x_val, y_val) {
        if (!GO.isValidCoordinates(x_val, y_val, this.configObject().boardSize())) {
            this.goAbend("addStoneToMarkedBoard", "x=" + x_val + " y=" + y_val);
            return;
        }
        this.setMarkedBoardArray(x_val, y_val, GO.EMPTY_STONE());
    };
    this.isEmptySpace = function(x_val, y_val) {
        if (!GO.isValidCoordinates(x_val, y_val, this.configObject().boardSize())) {
            return false;
        }
        if (this.boardArray(x_val, y_val) !== GO.EMPTY_STONE()) {
            return false;
        }
        return true;
    };
    this.decodeBoard = function(str_val) {
        var index = 0;
        var num;
        num  = (str_val.charAt(index++) - '0') * 100;
        num += (str_val.charAt(index++) - '0') * 10;
        num += (str_val.charAt(index++) - '0');
        this.gameObject().setTotalMoves(num);
        num = (str_val.charAt(index++) - '0');
        this.gameObject().setNextColor(num);
        for (var i = 0; i < this.boardSize(); i++) {
            for (var j = 0; j < this.boardSize(); j++) {
                this.theBoardArray[i][j] = str_val.charAt(index++) - '0';
            }
        }
        num  = (str_val.charAt(index++) - '0') * 100;
        num += (str_val.charAt(index++) - '0') * 10;
        num += (str_val.charAt(index++) - '0');
        this.theBlackCapturedStones = num;
        num  = (str_val.charAt(index++) - '0') * 100;
        num += (str_val.charAt(index++) - '0') * 10;
        num += (str_val.charAt(index++) - '0');
        this.theWhiteCapturedStones = num;
        num  = (str_val.charAt(index++) - '0') * 10;
        num += (str_val.charAt(index++) - '0');
        this.gameObject().setLastDeadX(num);
        num  = (str_val.charAt(index++) - '0') * 10;
        num += (str_val.charAt(index++) - '0');
        this.gameObject().setLastDeadY(num);
        if (num != 19) {
            this.gameObject().setValidLastDeadInfo(true);
        } else {
            this.gameObject().setValidLastDeadInfo(false);
        }
    };
    this.resetMarkedBoardObjectData = function() {
        for (var i = 0; i < this.boardSize(); i++) {
            for (var j = 0; j < this.boardSize(); j++) {
                this.setMarkedBoardArray(i, j, GO.EMPTY_STONE());
            }
        }
    };
    this.resetBoardObjectData = function() {
        for (var i = 0; i < this.boardSize(); i++) {
            for (var j = 0; j < this.boardSize(); j++) {
                this.setBoardArray(i, j, GO.EMPTY_STONE());
            }
        }
    };
    this.boardSize = function() {return this.configObject().boardSize();};
    this.blackCapturedStones = function() {return this.theBlackCapturedStones;};
    this.whiteCapturedStones = function() {return this.theWhiteCapturedStones;};
    this.boardArray = function (x_val, y_val) {return this.theBoardArray[x_val][y_val];};
    this.markedBoardArray = function (x_val, y_val) {return this.theMarkedBoardArray[x_val][y_val];};
    this.setBoardArray = function (x_val, y_val, data_val) {this.theBoardArray[x_val][y_val] = data_val;};
    this.setMarkedBoardArray = function (x_val, y_val, data_val) {this.theMarkedBoardArray[x_val][y_val] = data_val;};
    this.objectName = function() {return "GoPlayBoardObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.configObject = function() {return this.rootObject().configObject();};
    this.gameObject = function() {return this.rootObject().gameObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_val);
}
