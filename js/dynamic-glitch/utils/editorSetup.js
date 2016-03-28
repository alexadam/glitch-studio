var pinnedElements = [];
var allHighlightMarkers = [];
var editor = null;
var isPopUp = false;
var lastPopUpId = '';



function codeFormat() {
    CodeMirror.commands["selectAll"](editor);
    var range = {
        from: editor.getCursor(true),
        to: editor.getCursor(false)
    };
    editor.autoFormatRange(range.from, range.to);
    CodeMirror.commands["goDocEnd"](editor);
}

function editorSetup(runCallback) {

    //var editor = CodeMirror.fromTextArea(document.getElementById("txtCode"), {
    editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
        lineNumbers: true,
        // viewportMargin: Infinity,
        scrollbarStyle: "simple",
        extraKeys: {
            "Ctrl-Space": "autocomplete"
        },
        mode: "javascript"
    });

    highlightAllKeywords();

    var orig = CodeMirror.hint.javascript;
    CodeMirror.hint.javascript = function(cm) {
        var inner = orig(cm) || {
            from: cm.getCursor(),
            to: cm.getCursor(),
            list: []
        };
        inner.list.push.apply(inner.list, nullshapeAutocomplete.sort());
        return inner;
    };

    editor.on('change', function() {
        if (!liveEditMode) {
            return;
        }
        runCallback(editor.getValue());
        highlightAllKeywords();
    });


    function highlightAllKeywords() {
        allHighlightMarkers.forEach(function(marker) {
            marker.clear();
        });

        var tmpContents = editor.getValue();
        var nrOfLines = tmpContents.split('\n').length;
        var doc = editor.getDoc();

        for (var i = 0; i < nrOfLines; i++) {
            var allTokens = editor.getLineTokens(i, true);

            allTokens.forEach(function(token) {
                if (token.type === 'number') {
                    var tmpMarker = doc.markText({
                        line: i,
                        ch: token.start
                    }, {
                        line: i,
                        ch: token.start + token.string.length
                    }, {
                        className: 'highlight-token'
                    });
                    allHighlightMarkers.push(tmpMarker);
                } else if (token.type === 'property') {
                    var options = ['abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atanh', 'cbrt', 'ceil', 'cos', 'cosh', 'exp', 'expm1', 'floor', 'fround', 'log', 'log1p', 'log10', 'log2', 'round', 'sign', 'sin',
                        'sinh', 'sqrt', 'tan', 'tanh', 'trunc'
                    ];

                    for (var k = 0; k < options.length; k++) {
                        if (options[k] === token.string.toLowerCase()) {
                            var tmpMarker = doc.markText({
                                line: i,
                                ch: token.start
                            }, {
                                line: i,
                                ch: token.start + token.string.length
                            }, {
                                className: 'highlight-token'
                            });
                            allHighlightMarkers.push(tmpMarker);
                            break;
                        }
                    }
                } else if (token.type === 'string') {
                    var isValid = new RegExp(/('|")#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]('|")/).test(token.string.toLowerCase());

                    if (!isValid) {
                        return;
                    }

                    var tmpMarker = doc.markText({
                        line: i,
                        ch: token.start
                    }, {
                        line: i,
                        ch: token.start + token.string.length
                    }, {
                        className: 'highlight-token'
                    });
                    allHighlightMarkers.push(tmpMarker);
                } else if (token.type === 'operator') {
                    var isValid = token.string.length === 1 && new RegExp(/[+\-*\/%]/).test(token.string);

                    if (!isValid) {
                        return;
                    }

                    var tmpMarker = doc.markText({
                        line: i,
                        ch: token.start
                    }, {
                        line: i,
                        ch: token.start + token.string.length
                    }, {
                        className: 'highlight-token'
                    });
                    allHighlightMarkers.push(tmpMarker);
                }
            });

        }
    }

    $(document).mousedown(function(event) {
        if (isPopUp) {
            var tmpTargetElem = document.getElementById(lastPopUpId);
            var isClickInside = tmpTargetElem.contains(event.target);
            if (!isClickInside) {
                handleClosePopUp(lastPopUpId);
            }
            return;
        }

        var body = document.body;
        var docEl = document.documentElement;
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;

        var editorCoords = editor.coordsChar({
            left: event.clientX,
            top: event.clientY + scrollTop // adjust for scrolling
        });
        if (editorCoords.outside) {
            return;
        }

        showPopup();
    });

    var showPopUpTimer = null;

    function showPopup() {
        clearTimeout(showPopUpTimer);

        showPopUpTimer = setTimeout(function() {
            var body = document.body;
            var docEl = document.documentElement;
            var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;

            var startCursor = editor.getCursor();
            var tmpCoords = editor.charCoords({
                line: startCursor.line,
                ch: startCursor.ch
            })
            var event = {
                clientX: tmpCoords.left,
                clientY: (tmpCoords.top + 10)
            };

            var cLine = startCursor.line;
            var cCh = startCursor.ch;
            var doc = editor.getDoc();
            var cToken = editor.getTokenAt({
                line: cLine,
                ch: cCh
            }, true);

            var inner = CodeMirror.innerMode(CodeMirror.getMode(), cToken.state);
            var cx = inner.state.context;

            if (cToken.type === 'operator') {
                var isValid = cToken.string.length === 1 && new RegExp(/[+\-*\/%]/).test(cToken.string);

                if (!isValid) {
                    return;
                }

                isPopUp = true;
                editor.setOption("readOnly", true);
                lastPopUpId = 'opPopUp';

                var ops = ['+', '-', '*', '/', '%'];
                var cValue = 0;
                for (var i = 0; i < ops.length; i++) {
                    if (ops[i] === cToken.string) {
                        cValue = i;
                    }
                }

                var cRange = editor.getRange({
                    line: cLine,
                    ch: cToken.start
                }, {
                    line: cLine,
                    ch: cToken.end
                });

                var popUpElem = document.getElementById(lastPopUpId);
                popUpElem.style.display = 'block';
                popUpElem.style.top = (event.clientY + 10) + 'px';
                popUpElem.style.left = (event.clientX - 50) + 'px';

                var popUpRangeElement = document.getElementById('popUpOptionsList');
                popUpRangeElement.value = cValue;
                popUpRangeElement.setAttribute('min', 0);
                popUpRangeElement.setAttribute('max', ops.length - 1);
                setTimeout(function() {
                    popUpRangeElement.focus();
                }, 100);

                popUpRangeElement.oninput = function(e) {
                    doc.replaceRange('' + (ops[Number(this.value)]), {
                        line: cLine,
                        ch: cToken.start
                    }, {
                        line: cLine,
                        ch: cToken.start + 1
                    });
                    lastTokenValue = this.value;
                };
            }

            if (cToken.type === 'string') {
                var isValid = new RegExp(/('|")#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]('|")/).test(cToken.string.toLowerCase());

                if (!isValid) {
                    return;
                }

                isPopUp = true;
                editor.setOption("readOnly", true);
                lastPopUpId = 'colorPopUp';

                var cRange = editor.getRange({
                    line: cLine,
                    ch: cToken.start
                }, {
                    line: cLine,
                    ch: cToken.end
                });

                var cvalue = cToken.string.substr(1, cToken.string.length - 2);

                var popUpElem = document.getElementById(lastPopUpId);
                popUpElem.style.display = 'block';
                popUpElem.style.top = (event.clientY + 10) + 'px';
                popUpElem.style.left = (event.clientX - 50) + 'px';

                var lastTokenValue = cToken.string;

                var colorPickerElement = ColorPicker(document.getElementById('ColorPicker'), function(hex, hsv, rgb) {
                    doc.replaceRange('\'' + hex + '\'', {
                        line: cLine,
                        ch: cToken.start
                    }, {
                        line: cLine,
                        ch: cToken.start + 9
                    });
                    lastTokenValue = hex;
                });

                colorPickerElement.setHex(cvalue);
            }

            if (cToken.type === 'property') {
                var options = ['abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atanh', 'cbrt', 'ceil', 'cos', 'cosh', 'exp', 'expm1', 'floor', 'fround', 'log', 'log1p', 'log10', 'log2', 'round', 'sign', 'sin',
                    'sinh', 'sqrt', 'tan', 'tanh', 'trunc'
                ];

                var found = false;
                for (var i = 0; i < options.length; i++) {
                    if (options[i] === cToken.string.toLowerCase()) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    return;
                }

                isPopUp = true;
                lastPopUpId = 'opPopUp';
                editor.setOption("readOnly", true);

                var cValue = 0;
                for (var i = 0; i < options.length; i++) {
                    if (options[i] === cToken.string.toLowerCase()) {
                        cValue = i;
                    }
                }

                var cRange = editor.getRange({
                    line: cLine,
                    ch: cToken.start
                }, {
                    line: cLine,
                    ch: cToken.end
                });

                var popUpElem = document.getElementById(lastPopUpId);
                popUpElem.style.display = 'block';
                popUpElem.style.top = (event.clientY + 10) + 'px';
                popUpElem.style.left = (event.clientX - 50) + 'px';

                var popUpRangeElement = document.getElementById('popUpOptionsList');
                popUpRangeElement.value = cValue;
                popUpRangeElement.setAttribute('min', 0);
                popUpRangeElement.setAttribute('max', options.length - 1);
                setTimeout(function() {
                    popUpRangeElement.focus();
                }, 100);

                var lastTokenValue = cToken.string;

                popUpRangeElement.oninput = function(e) {
                    cVal = options[Number(this.value)];
                    doc.replaceRange('' + cVal, {
                        line: cLine,
                        ch: cToken.start
                    }, {
                        line: cLine,
                        ch: cToken.start + lastTokenValue.length
                    });
                    lastTokenValue = cVal;
                };
            }

            if (cToken.type === 'number') {
                isPopUp = true;
                editor.setOption("readOnly", true);

                var isFloat = cToken.string.indexOf('.') > -1;
                var cValue = Number(cToken.string);

                var cRange = editor.getRange({
                    line: cLine,
                    ch: cToken.start
                }, {
                    line: cLine,
                    ch: cToken.end
                });

                if (!isFloat) {
                    lastPopUpId = 'popUp';
                    var popUpElem = document.getElementById(lastPopUpId);
                    popUpElem.style.display = 'block';
                    popUpElem.style.top = (event.clientY + 10) + 'px';
                    popUpElem.style.left = (event.clientX - 50) + 'px';

                    var popUpRangeElement = document.getElementById('popUpRange');
                    popUpRangeElement.value = cValue;
                    popUpRangeElement.setAttribute('min', pMinVal);
                    popUpRangeElement.setAttribute('max', pMaxVal);
                    setTimeout(function() {
                        popUpRangeElement.focus();
                    }, 100);


                    var lastTokenValue = cToken.string;

                    popUpRangeElement.oninput = function(e) {
                        doc.replaceRange(this.value, {
                            line: cLine,
                            ch: cToken.start
                        }, {
                            line: cLine,
                            ch: cToken.start + lastTokenValue.length
                        });
                        lastTokenValue = this.value;
                    };


                } else {
                    lastPopUpId = 'floatPopUp';
                    var popUpElem = document.getElementById(lastPopUpId);
                    popUpElem.style.display = 'block';
                    popUpElem.style.top = (event.clientY + 10) + 'px';
                    popUpElem.style.left = (event.clientX - 50) + 'px';

                    var popUpRangeElement = document.getElementById('intPopUpRange');
                    var decimalPopUpRangeElement = document.getElementById('decimalsPopUpRange');

                    console.log(cValue, ((cValue - Math.floor(cValue)) * 1000 | 0) + 1000);

                    popUpRangeElement.setAttribute('min', pMinVal);
                    popUpRangeElement.setAttribute('max', pMaxVal);
                    decimalPopUpRangeElement.setAttribute('min', 1000);
                    decimalPopUpRangeElement.setAttribute('max', 1999);

                    popUpRangeElement.value = cValue | 0; /// get integer part
                    cValue = Math.abs(cValue.toFixed(3));
                    decimalPopUpRangeElement.value = ((cValue - Math.floor(cValue)) * 1000 | 0) + 1000; // get decimals

                    setTimeout(function() {
                        popUpRangeElement.focus();
                    }, 100);

                    var lastTokenValue = cToken.string;

                    popUpRangeElement.oninput = function(e) {
                        doc.replaceRange(this.value + '.' + decimalPopUpRangeElement.value, {
                            line: cLine,
                            ch: cToken.start
                        }, {
                            line: cLine,
                            ch: cToken.start + lastTokenValue.length
                        });
                        lastTokenValue = this.value + '.' + decimalPopUpRangeElement.value;
                    };

                    decimalPopUpRangeElement.oninput = function(e) {
                        var tval = (this.value + "").substring(1);
                        doc.replaceRange(popUpRangeElement.value + '.' + tval, {
                            line: cLine,
                            ch: cToken.start
                        }, {
                            line: cLine,
                            ch: cToken.start + lastTokenValue.length
                        });
                        lastTokenValue = popUpRangeElement.value + '.' + tval;
                    };
                }
            }
        }, 500);



        ////////////////////////////
        ////////////////////////////
        //// Select line by clicking on gutter
        //// Source: http://jsbin.com/ihunin/385/edit?html,css,js,output
        ////////////////////////////
        var Pos = CodeMirror.Pos;

        editor.on("gutterClick", function(cm, line, gutter, e) {
            // Optionally look at the gutter passed, and ignore
            // if clicking in it means something else
            var others = e.ctrlKey || e.metaKey ? cm.listSelections() : [];
            var from = line,
                to = line + 1;

            function update() {
                var ours = {
                    anchor: CodeMirror.Pos(from, to > from ? 0 : null),
                    head: CodeMirror.Pos(to, 0)
                };
                cm.setSelections(others.concat([ours]), others.length, {
                    origin: "*mouse"
                });
            }

            update();

            var move = function(e) {
                var curLine = cm.lineAtHeight(e.clientY, "client");
                if (curLine != to) {
                    to = curLine;
                    update();
                }
            };
            var up = function(e) {
                removeEventListener("mouseup", up);
                removeEventListener("mousemove", move)
            };
            addEventListener("mousemove", move);
            addEventListener("mouseup", up);
        });

        //////////////////////////////////

    }

    $(document).mouseup(function(event) {
        clearTimeout(showPopUpTimer);
    });

    window.addEventListener('keydown', function(event) {
        // Ctrl + ~ shortcut to pop-up
        if (!isPopUp && event.keyCode === 192 && event.ctrlKey) {
            showPopup();
        }

        if (!isPopUp) {
            return;
        }

        if (event.keyCode === 27) {
            handleClosePopUp(lastPopUpId);
        }
    });

    function triggerMouseEvent(node, eventType) {
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent(eventType, true, true);
        node.dispatchEvent(clickEvent);
    }

}

function handleClosePopUp(id) {
    var popUpElem = document.getElementById(id);
    popUpElem.style.display = 'none';
    isPopUp = false;
    editor.setOption("readOnly", false);
}

function handleIncDecValue(targetId, value) {
    var tmpElem = document.getElementById(targetId);
    tmpElem.value = Number(tmpElem.value) + Number(value);
    tmpElem.oninput();
}
