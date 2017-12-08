const app = require('../../app.js');
const Browser = require('zombie');
const chai = require('chai');
const expect = chai.expect;
const http = require('http');
const assert = chai.assert;

describe('Scanner feature testing', () => {
    beforeEach((done) => {
        this.server = http.createServer(app).listen(3000);
        this.browser = new Browser({
            site: 'http://localhost:3000'
        });
        this.browser.visit('/scanner', done);
    });

    afterEach((done) => {
        this.server.close();
        done();
    })

    describe('Add a product', () =>{

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

            it('should decode ' + folder + " correctly", function(done) {
                async.eachSeries(testSet, function (sample, callback) {
                    config.src = folder + sample.name;
                    config.readers = readers;
                    Quagga.decodeSingle(config, function(result) {
                        console.log(sample.name);
                        expect(result.codeResult.code).to.equal(sample.result);
                        expect(result.codeResult.format).to.equal(sample.format);
                        callback();
                    });
                }, function() {
                    done();
                });
            });
        }

        it('displays added product on page', (done) => {
            console.log('start of it: ', this.browser.text('title'));
            this.browser.fill('input[name=name]', 'Test Name');
            this.browser.fill('input[name=barcode]', '12345');
            this.browser.pressButton('Submit').then( () => {
                expect(this.browser.text('div')).to.match(/Test Name/);
                done();
            });
        })
    })

})
