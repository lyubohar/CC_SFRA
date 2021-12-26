// Export newsletter objects job step

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var { File, FileWriter, CSVStreamWriter } = require('dw/io');

module.exports.execute = function () {
    var exportObjectIterate = CustomObjectMgr.getAllCustomObjects('NewsletterRegHW');
    var file = new File([File.IMPEX, 'exported-files', 'ExportedNewsletterReg.csv'].join(File.SEPARATOR));
    var fileWriter = new FileWriter(file);
    var csv = new CSVStreamWriter(fileWriter);
    var error = false;

    try {    
        while (exportObjectIterate.hasNext()) {
            var object = exportObjectIterate.next();
            csv.writeNext(object.custom.firstName + " " + object.custom.lastName + "," + object.custom.email + "," + object.custom.gender);
        }
    } catch (error) {
        error = true;
    } finally {
        csv.close();        
        fileWriter.close();
    }
}
