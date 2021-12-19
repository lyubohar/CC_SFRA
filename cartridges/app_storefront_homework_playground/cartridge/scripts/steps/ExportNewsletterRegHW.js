// Export newsletter objects job step

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var { File, FileWriter, XMLStreamWriter } = require('dw/io');

module.exports.execute = function () {
    var exportObjectIterate = CustomObjectMgr.getAllCustomObjects('NewsletterRegHW');
    var file = new File([File.IMPEX, 'exported-files', 'ExportedNewsletterReg.xml'].join(File.SEPARATOR));
    var fileWriter = new FileWriter(file);
    var xsw = new XMLStreamWriter(fileWriter);
    var error = false;

    try {
        xsw.writeStartDocument();
        xsw.writeStartElement("newsletter_registrations");
    
        while (exportObjectIterate.hasNext()) {
            var object = exportObjectIterate.next();
            xsw.writeStartElement("newsletter_registration");
            xsw.writeAttribute("id", object.custom.id);
            xsw.writeAttribute("FirstName", object.custom.firstName);
            xsw.writeAttribute("LastName", object.custom.lastName);
            xsw.writeAttribute("Email", object.custom.email);
            xsw.writeAttribute("Gender", object.custom.gender);
            xsw.writeEndElement();
        }

        xsw.writeEndElement();
    } catch (error) {
        error = true;
    } finally {
        xsw.close();        
        fileWriter.close();
    }
}
