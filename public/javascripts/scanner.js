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

  Scanner.init();


  Quagga.onDetected(function (result) {
    $.get("/apiservice/?gtin=" + result.codeResult.code, function(data) {

      var nameField = $('#name');
      var barcodeField = $('#barcode');
      var imageField = $('#image');
      var imageDisplayField = $('#imageDisplay');

      nameField.val(data.name);
      barcodeField.val(data.gtin);
      imageField.val(data.image);
      imageDisplayField.attr("src", data.image);
    }).fail(function () {
      console.log("error");
    });

  });
});
