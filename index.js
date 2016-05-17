var _ = require('underscore');
var Docxtemplater = require('docxtemplater');
var fs = require('fs');
var moment = require('moment');

var transformCvData = require('./transform');

var exportedDataPath = process.env.EXPORT_DATA || './sample-input.json';
var exportedData = require(exportedDataPath);
var cvData = _
  .chain(exportedData)
  .pluck('data')
  .map(transformCvData)
  .each(function(cv){
    //Load the docx file as a binary
    var content = fs.readFileSync(__dirname + '/cv_template.docx', 'binary')

    // creating docxtemplater
    var doc = new Docxtemplater(content);

    //set the templateVariables
    doc.setData(cv);

    try {
      //apply them (replace all occurences of {first_name} by Hipp, ...)
      doc.render();

      var buf = doc.getZip().generate({type:'nodebuffer'});

      // saving generated cv docuemnt
      fs.writeFileSync(__dirname+'/generated/cv_' + cv.firstname + '_' + cv.lastname + '.docx', buf);

      console.log('Created CV for: ' + cv.firstname + ' ' + cv.lastname);
    } catch (error) {
      console.error(error.message);
      console.error(error.properties.explanation);
    }
  })
  .value();
