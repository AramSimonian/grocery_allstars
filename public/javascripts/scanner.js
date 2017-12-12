const config = {
    "inputStream": {
        "size": 1920,
        "singleChannel": false
    },
    "locator": {
        "patchSize": "large",
        "halfSample": true
    },
    "decoder": {
        "readers": [
            {
                "format": "ean_reader",
                "config": {}
            },
            {
                "format": "ean_8_reader",
                "config": {}
            }
        ]
    },
    "locate": true,
    "src": null
};

$(function () {
    var Scanner = {
        init: function () {
            Scanner.attachListeners();
        },
        attachListeners: function () {
            var self = this;
            $(".controls input[type=file]").on("change", function (e) {
                if (e.target.files && e.target.files.length) {
                    Scanner.decode(URL.createObjectURL(e.target.files[0]));
                }
                ;
            });
            $(".controls button").on("click", function (e) {
                var input = document.querySelector(".controls input[type=file]");
                if (input.files && input.files.length) {
                    Scanner.decode(URL.creatObjectURL(input.files[0]));
                }
                ;
            });
        },
        decode: function (src) {
            var self = this
            config['src'] = src;

            Quagga.decodeSingle(config, function (result) {
            });
        },
    }

    // Scanner.detachListeners();
    Scanner.init();

    function calculateRectFromArea(canvas, area) {
        var canvasWidth = canvas.width,
            canvasHeight = canvas.height,
            top = parseInt(area.top)/100,
            right = parseInt(area.right)/100,
            bottom = parseInt(area.bottom)/100,
            left = parseInt(area.left)/100;

        top *= canvasHeight;
        right = canvasWidth - canvasWidth*right;
        bottom = canvasHeight - canvasHeight*bottom;
        left *= canvasWidth;

        return {
            x: left,
            y: top,
            width: right - left,
            height: bottom - top
        };
    }

    Quagga.onProcessed(function(result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay,
            area;

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
            }

            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
            }

            if (config.inputStream.area) {
                area = calculateRectFromArea(drawingCanvas, config.inputStream.area);
                drawingCtx.strokeStyle = "#0F0";
                drawingCtx.strokeRect(area.x, area.y, area.width, area.height);
            }
        }
    });

    Quagga.onDetected(function(result) {
        var code = result.codeResult.code,
            $node,
            canvas = Quagga.canvas.dom.image;

        getProduct(result.codeResult.code, () => {
          $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
          $node.find("img").attr("src", canvas.toDataURL());
          $node.find("h4.code").html(code);
          $("#result_strip ul.thumbnails").prepend($node);
        });

    });

    function getProduct(gtin, callback) {
      $.ajax({
        url: "/apiservice/?gtin=" + gtin,
        type: "GET",
        // Request body
        data: "",
        success: function(data) {
          callback(data);
          // alert(data);
        }
      }).fail(function() {
          alert("error");
        });
    }
})
