const app = require('../../app.js');
const Browser = require('zombie');
const chai = require('chai');
const expect = chai.expect;
const http = require('http');
const assert = chai.assert;

const Quagga = require('../../public/javascripts/quagga').default;
const async = require('async');



console.log("1", Quagga);

describe('Scanner feature testing', () => {
  console.log("1", Quagga);
    beforeEach((done) => {
        this.server = http.createServer(app).listen(3000);
        this.browser = new Browser({
            site: 'http://localhost:3000'
        });
        this.browser.visit('/scanners', done);
    });

    afterEach((done) => {
        this.server.close();
        done();
    })

    describe('Scan an item', () =>{

        var baseFolder = "./test/fixtures/";

        function generateConfig() {
            return {
                inputStream: {
                    size: 640
                },
                locator: {
                    patchSize: "medium",
                    halfSample: true
                },
                numOfWorkers: 0,
                decoder: {
                    readers: ["ean_reader"]
                },
                locate: true,
                src: null
            };
        }

        function _runTestSet(testSet, config) {
            var readers = config.decoder.readers.slice(),
                format,
                folder,
                suffix;

            if (typeof readers[0] === 'string'){
                format = readers[0];
            } else {
                if (readers[0].config && readers[0].config.supplements && readers[0].config.supplements.length) {
                    suffix = "extended";
                }
                format = readers[0].format;
            }

            folder = baseFolder + format.split('_').slice(0, -1).concat(suffix ? [suffix] : []).join('_') + "/";
            const Quagga = require('../../public/javascripts/quagga').default;
console.log("2", Quagga);
            it('should decode ' + folder + " correctly", (done) => {
                async.eachSeries(testSet,  (sample, callback) => {
                  console.log("3", Quagga);
                    config.src = folder + sample.name;
                    config.readers = readers;
                    Quagga.decodeSingle(config, (result) => {
                        console.log(sample.name);
                        expect(result.codeResult.code).to.equal(sample.result);
                        expect(result.codeResult.format).to.equal(sample.format);
                        callback();
                    });
                }, () =>  {
                    done();
                });
            });
        }

        describe("EAN", function() {
                var config = generateConfig(),
                    testSet = [
                        {"name": "image-001.jpg", "result": "3574660239843"},
                        {"name": "image-002.jpg", "result": "8032754490297"},
                        {"name": "image-003.jpg", "result": "4006209700068"},
                        /* {"name": "image-004.jpg", "result": "9002233139084"}, */
                        /* {"name": "image-005.jpg", "result": "8004030044005"}, */
                        {"name": "image-006.jpg", "result": "4003626011159"},
                        {"name": "image-007.jpg", "result": "2111220009686"},
                        {"name": "image-008.jpg", "result": "9000275609022"},
                        {"name": "image-009.jpg", "result": "9004593978587"},
                        {"name": "image-010.jpg", "result": "9002244845578"}
                    ];

                testSet.forEach(function(sample) {
                    sample.format = "ean_13";
                });

                config.decoder.readers = ['ean_reader'];
                _runTestSet(testSet, config);
            });



    })

})
