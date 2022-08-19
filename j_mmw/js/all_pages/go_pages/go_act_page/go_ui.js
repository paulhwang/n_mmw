/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayDisplayObject(root_object_val) {
    "use strict";
    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.drawArrows();
        this.drawBoard();
        this.debug(false, "init__", "");
    };
    this.drawBoard = function() {
        var arrow_color = "black";
        var grid_len = this.getGridLength();
        //var half_grid_len = grid_len / 2;
        var micro_grid_len = grid_len / 8;
        //var radius = 3.2 * micro_grid_len;
        var context = this.canvasContext();
        //var canvas_extra = this.canvasElement_().height - this.canvasElement_().width;
        context.fillStyle = arrow_color;
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        this.drawArrows();
        context.fillStyle = "#FF8000";
        context.fillRect(0, 0, this.canvasElement().width, this.canvasElement().width);
        this.drawEmptyBoard();
        this.drawStones();
        if (this.gameObject().gameIsOver()) {
            this.drawMarkedStones();
            //////////////////this.drawLandMarks();
        }
        this.drawCandidateStone();
        this.drawScore();
    };
    this.drawEmptyBoard = function() {
        var grid_len = this.getGridLength();
        var context = this.canvasContext();
        this.setBoardColor();
        context.lineWidth = 1;
        var i = 1;
        while (i <= this.boardSize()) {
            context.moveTo(grid_len, grid_len * i);
            context.lineTo(grid_len * this.boardSize(), grid_len * i);
            context.stroke();
            context.moveTo(grid_len * i, grid_len);
            context.lineTo(grid_len * i, grid_len * this.boardSize());
            context.stroke();
            i += 1;
        }
        if (this.boardSize() === 9) {
            drawBoardDot(5, 5);
        } else if (this.boardSize() === 13) {
            drawBoardDot(4, 4);
            drawBoardDot(4, 10);
            drawBoardDot(10, 4);
            drawBoardDot(10, 10);
            drawBoardDot(7, 7);
        } else if (this.boardSize() === 19) {
            drawBoardDot(4, 4);
            drawBoardDot(4, 10);
            drawBoardDot(4, 16);
            drawBoardDot(10, 4);
            drawBoardDot(10, 10);
            drawBoardDot(10, 16);
            drawBoardDot(16, 4);
            drawBoardDot(16, 10);
            drawBoardDot(16, 16);
        }
        function drawBoardDot(x_val, y_val) {
            context.beginPath();
            context.arc(x_val * grid_len, y_val * grid_len, 3, 0, 2 * Math.PI, false);
            context.fillStyle = 'black';
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = '#003300';
            context.stroke();
        }
    };
    this.setBoardColor = function() {
        this.canvasContext().fillStyle = "#FF8000";
        this.canvasContext().fillRect(0, 0, this.canvasElement().width, this.canvasElement().width);
    }
    this.drawStones = function() {
        var grid_len = this.getGridLength();
        var micro_grid_len = grid_len / 8;
        var radius = 3.2 * micro_grid_len;
        var context = this.canvasContext();
        var paint = null;
        for (var i = 0; i < this.boardSize(); i++) {
            for (var j = 0; j < this.boardSize(); j++) {
                if (this.boardObject().boardArray(i, j) === GO.BLACK_STONE()) {
                    paint = "black";
                } else if (this.boardObject().boardArray(i, j) === GO.WHITE_STONE()) {
                    paint = "white";
                }
                if (paint) {
                    this.drawOneStone(i, j, paint);
                    paint = null;
                }
            }
        }
    };
    this.drawOneStone = function (x_val, y_val, paint_val) {
        var grid_len = this.getGridLength();
        var micro_grid_len = grid_len / 8;
        var radius = 3.2 * micro_grid_len;
        var context = this.canvasContext();
        context.beginPath();
        context.arc((x_val + 1) * grid_len, (y_val + 1) * grid_len, radius, 0, 2 * Math.PI, false);
        context.fillStyle = paint_val;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();
     }
    this.drawCandidateStone = function() {
        if (!this.gameObject().isMyTurn() && !this.gameObject().gameIsOver()) {
            return;
        }
        var grid_len = this.getGridLength();
        var micro_grid_len = grid_len / 8;
        var radius = 2 * micro_grid_len;
        var context = this.canvasContext();
        var paint;
        if (this.gameObject().nextColor() === GO.BLACK_STONE()) {
            paint = "black";
            if (this.gameObject().gameIsOver()) {
                paint = "gray";
            }
            context.beginPath();
            context.arc((this.inputObject().lastMouseX() + 1) * grid_len, (this.inputObject().lastMouseY() + 1) * grid_len, radius, 0, 2 * Math.PI, false);
            context.fillStyle = paint;
            context.fill();
            //context.lineWidth = 1;
            context.strokeStyle = '#003300';
            context.stroke();
        } else {
            paint = "white";
            if (this.gameObject().gameIsOver()) {
                paint = "gray";
            }
            context.beginPath();
            context.arc((this.inputObject().lastMouseX() + 1) * grid_len, (this.inputObject().lastMouseY() + 1) * grid_len, radius, 0, 2 * Math.PI, false);
            context.fillStyle = paint;
            context.fill();
            //context.lineWidth = 1;
            context.strokeStyle = '#003300';
            context.stroke();
        }
    };
    this.drawArrows = function() {
        var arrow_len = this.getArrowUnitLength();
        var context = this.canvasContext();

        context.beginPath();
        context.moveTo(arrow_len * 0.5,  arrow_len * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 1.25, arrow_len       + this.canvasElement().width);
        context.lineTo(arrow_len * 1.25, arrow_len * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 0.5,  arrow_len * 1.5 + this.canvasElement().width);
        context.fill();
        context.stroke();
        context.beginPath();
        context.moveTo(arrow_len * 1.25, arrow_len * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 2,    arrow_len       + this.canvasElement().width);
        context.lineTo(arrow_len * 2,    arrow_len * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 1.25, arrow_len * 1.5 + this.canvasElement().width);
        context.fill();
        context.stroke();

        context.beginPath();
        context.moveTo(arrow_len * 3, arrow_len  * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 4, arrow_len        + this.canvasElement().width);
        context.lineTo(arrow_len * 4, arrow_len  * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 3, arrow_len  * 1.5 + this.canvasElement().width);
        context.fill();
        context.stroke();

        context.beginPath();
        context.moveTo(arrow_len * 5, arrow_len       + this.canvasElement().width);
        context.lineTo(arrow_len * 6, arrow_len * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 5, arrow_len * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 5, arrow_len       + this.canvasElement().width);
        context.fill();
        context.stroke();

        context.beginPath();
        context.moveTo(arrow_len * 7,    arrow_len       + this.canvasElement().width);
        context.lineTo(arrow_len * 7.75, arrow_len * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 7,    arrow_len * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 7,    arrow_len       + this.canvasElement().width);
        context.fill();
        context.stroke();
        context.beginPath();
        context.moveTo(arrow_len * 7.75, arrow_len       + this.canvasElement().width);
        context.lineTo(arrow_len * 8.5,  arrow_len * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 7.75, arrow_len * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 7.75, arrow_len       + this.canvasElement().width);
        context.fill();
        context.stroke();
        context.moveTo(arrow_len * 8.5, arrow_len     + this.canvasElement().width);
        context.lineTo(arrow_len * 8.5, arrow_len * 2 + this.canvasElement().width);
        context.stroke();

        context.moveTo(arrow_len * 0.5, arrow_len     + this.canvasElement().width);
        context.lineTo(arrow_len * 0.5, arrow_len * 2 + this.canvasElement().width);
        context.stroke();

        context.fillStyle = "pink";
        context.fillRect(arrow_len * 8.5, arrow_len + this.canvasElement().width, arrow_len * 2, arrow_len);
        context.fillStyle = "yellow";
        context.fillRect(arrow_len * 10.5, arrow_len + this.canvasElement().width, arrow_len * 2, arrow_len);
        context.fillStyle = "pink";
        context.fillRect(arrow_len * 12.5, arrow_len + this.canvasElement().width, arrow_len * 2, arrow_len);
        context.fillStyle = "yellow";
        context.fillRect(arrow_len * 14.5, arrow_len + this.canvasElement().width, arrow_len * 2, arrow_len);
        context.fillStyle = "pink";
        context.fillRect(arrow_len * 16.5, arrow_len + this.canvasElement().width, arrow_len * 2, arrow_len);
    };

    this.drawScore = function() {
        this.blackScoreElement().textContent = this.gameObject().blackScoreString();
        this.whiteScoreElement().textContent = this.gameObject().whiteScoreString();
        //this.finalScoreElement().textContent = this.gameObject().finalScoreString();
        this.blackScoreElement().textContent = "Black: " + this.boardObject().blackCapturedStones();
        this.whiteScoreElement().textContent = "White: " + this.boardObject().whiteCapturedStones();
    };
    this.boardSize = function() {return this.configObject().boardSize();};
    this.canvasElement = function() {return this.htmlObject().canvasElement();};
    this.canvasContext = function() {return this.htmlObject().canvasContext();};
    this.blackScoreElement = function() {return this.htmlObject().blackScoreElement();};
    this.whiteScoreElement = function() {return this.htmlObject().whiteScoreElement();};
    this.getGridLength = function() {return this.htmlObject().getGridLength();};
    this.getArrowUnitLength = function() {return this.htmlObject().getArrowUnitLength();};
    this.objectName = function() {return "GoPlayDisplayObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.configObject = function() {return this.rootObject().configObject();};
    this.htmlObject = function() {return this.rootObject().htmlObject();};
    this.inputObject = function() {return this.rootObject().inputObject();};
    this.boardObject = function() {return this.rootObject().boardObject();};
    this.gameObject = function() {return this.rootObject().gameObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
}
function GoPlayInputObject(root_object_val) {
    "use strict";
    this.init__ = function(root_object_val) {
        this.theRootObject = root_object_val;
        this.theLastMouseX = 9;
        this.theLastMouseY = 9;
        this.clearPendingRequestExist();
        this.debug(false, "init__", "");
    };
    this.uiMouseMove = function(event_x, event_y) {
        if (this.pendingRequestExist()) return;
        var grid_len = this.getGridLength();
        var x = Math.round((event_x - this.canvasElement().getBoundingClientRect().left) / grid_len) - 1;
        var y = Math.round((event_y - this.canvasElement().getBoundingClientRect().top) / grid_len) - 1;
        if ((x < 0) || (y < 0) || (x >= this.boardSize()) || (y >= this.boardSize())) {
            return;
        }
        if ((this.lastMouseX() !== x) || (this.lastMouseY() !== y)) {
            this.debug(false, "uiMouseMove", "(" + x + "," + y + ")");
            this.setLastMouseX(x);
            this.setLastMouseY(y);
            this.displayObject().drawBoard();
        }
    };
    this.uiClick = function(event_x, event_y) {
        if (this.pendingRequestExist()) return;
        if (event_x < this.canvasElement().getBoundingClientRect().left) {return;}
        if (event_y < this.canvasElement().getBoundingClientRect().top) {return;}
        if (event_x > this.canvasElement().getBoundingClientRect().left + this.canvasElement().getBoundingClientRect().width) {return;}
        if (event_y > this.canvasElement().getBoundingClientRect().top + this.canvasElement().getBoundingClientRect().height) {return;}
        var arrow_len = this.getArrowUnitLength();
        var grid_len = this.getGridLength();
        this.debug(false, "uiClick", "raw_data=(" + event_x + ", " + event_y + ")");

        if (event_y > this.canvasElement().getBoundingClientRect().top + this.canvasElement().getBoundingClientRect().width) {
            if (event_y < this.canvasElement().getBoundingClientRect().top + this.canvasElement().getBoundingClientRect().width + arrow_len) {
                return;
            }
            if (event_y > this.canvasElement().getBoundingClientRect().top + this.canvasElement().getBoundingClientRect().width + arrow_len * 2) {
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 2.5) {
                this.portObject().transmitDoubleBackwardCommand();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 4.5) {
                this.portObject().transmitBackwardCommand();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 6.5) {
                this.portObject().transmitForwardCommand();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 8.5) {
                this.portObject().transmitDoubleForwardCommand();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 10.5) {
                if (this.gameObject().isMyTurn()) {
                    this.portObject().transmitPassCommand();
                    this.displayObject().drawBoard();
                }
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 12.5) {
                this.portObject().transmitConfirmCommand();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 14.5) {
                this.portObject().transmitResignCommand();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 18.5) {
                this.portObject().transmitContinueCommand();
                this.displayObject().drawBoard();
                return;
            }
            return;
        }
        if (!this.gameObject().isMyTurn()) {this.debug(true, "uiClick", "not my turn"); return;}
        var x = Math.round((event_x - this.canvasElement().getBoundingClientRect().left) / grid_len) - 1;
        var y = Math.round((event_y - this.canvasElement().getBoundingClientRect().top) / grid_len) - 1;
        if ((x < 0) || (y < 0) || (x >= this.boardSize()) || (y >= this.boardSize())) {return;}
        this.debug(false, "uiClick", "(" + x + "," + y + ")");
        this.gameObject().processNewMove(x, y);
    };
    this.pendingRequestExist = function() {return this.thePendingRequestExist;};
    this.setPendingRequestExist = function() {this.thePendingRequestExist = true;};
    this.clearPendingRequestExist = function() {this.thePendingRequestExist = false;};
    this.boardSize = function() {return this.configObject().boardSize();};
    this.canvasElement = function() {return this.htmlObject().canvasElement();};
    this.getGridLength = function() {return this.htmlObject().getGridLength();};
    this.getArrowUnitLength = function() {return this.htmlObject().getArrowUnitLength();};
    this.lastMouseX = function() {return this.theLastMouseX;};
    this.setLastMouseX = function (val) {this.theLastMouseX = val;};
    this.lastMouseY = function() {return this.theLastMouseY;};
    this.setLastMouseY = function (val) {this.theLastMouseY = val;};
    this.objectName = function() {return "GoPlayInputObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.configObject = function() {return this.rootObject().configObject();};
    this.htmlObject = function() {return this.rootObject().htmlObject();};
    this.displayObject = function() {return this.rootObject().displayObject();};
    this.gameObject = function() {return this.rootObject().gameObject();};
    this.portObject = function() {return this.rootObject().portObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
}
