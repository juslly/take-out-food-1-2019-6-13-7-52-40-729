
const bestCharge = require('../src/best-charge');

// let barcode = ['0001', '0003', '0005', '0003'];
it ('should return receipt from database when call printReceipt by given the barcodeArray', () => {
    expect(bestCharge()).toBe(
        "============= 订餐明细 =============\n"+
    "肉夹馍 x 4 = 24\n"+
    "凉皮 x 1 = 8\n"+
    "------------------------------------------------------------\n"+
    "总计：26元\n"+
    "==================================="
);
});



// var Jasmine = require('../src/best-charge');
// var jasmine = new Jasmine();

// jasmine.loadConfig({
//   spec_dir: 'spec',
//   spec_files: [
//     '*.js'
//   ],
//   stopSpecOnExpectationFailure: false,
//   random: false
// });

// // A 3rd-party reporter
// var JasmineConsoleReporter = require('jasmine-console-reporter');
// var reporter = new JasmineConsoleReporter({
//   colors: 1,           // (0|false)|(1|true)|2
//   cleanStack: 1,       // (0|false)|(1|true)|2|3
//   verbosity: 4,        // (0|false)|1|2|(3|true)|4
//   listStyle: 'indent', // "flat"|"indent"
//   activity: false
// });

// jasmine.addReporter(reporter);

// jasmine.execute();


