var mongoose = require('mongoose');
var StudentDetailsSchema = mongoose.model('StudentDetailsSchema');

exports.addEmployeeDetails = function (req, res) {
    var id = req.body.id;
    var subject = req.body.subject;
    var fee = req.body.fee;
    var department = req.body.department;

    var studentDetailsSchema = new StudentDetailsSchema();

    studentDetailsSchema.id = id;
    studentDetailsSchema.subject = subject;
    studentDetailsSchema.fee = fee;
    studentDetailsSchema.department = department;


    studentDetailsSchema.save(function (err, savedEmployee) {
        if (err) {
            var message = "Error occured while storing new employee !!!";
            console.log(message + "\n" + err);
            res.status(500).send(message);
        } else {
            res.status(201).send(savedEmployee);
        }
    });

}


exports.getEmployeesDetails = function (req, res) {
    StudentDetailsSchema.find({}, function (err, records) {

        if (err) {
            console.log(err);
            res.status(500).send("Error Occured while fetching data");
            return;
        } else {
            var data = records;
            res.status(200).send(data);
        }

    });

}


exports.getEmployeeDetails = function (req, res) {
    var id = req.params.id;
    StudentDetailsSchema.findOne({ "_id": id }, function (err, record) {
        if (err) {
            console.log(err);
            res.status(404).send("No Record Found");
            return;
        } else {
            var data = record;
            res.status(200).send(data);
        }
    });
}


exports.updateEmployeeDetails = function (req, res) {
    var id = req.params.id;
    StudentDetailsSchema.findOne({ "_id": id }, function (err, record) {
        if (err) {
            console.log("Error Occured ");
            res.status(404).send("Record Not Found");
        }
        else {
            if (!record) {
                res.status(404).send("No Employee found with id " + id);
            }
            else {
                var id = req.body.id;
                var subject = req.body.subject;
                var fee = req.body.fee;
                var department = req.body.department;


                record.id = id;
                record.subject = subject;
                record.fee = fee;
                record.department = department;
                
                record.save(function (err, updatedRecord) {
                    if (err) {
                        console.log("Error Occured while updating record")
                        res.status(500).send("Error Occured while updating record");
                    }
                    else {
                        res.status(200).send(updatedRecord);
                    }
                });
            }
        }

    });
}



exports.deleteEmployeeDetails = function (req, res) {
    var id = req.params.id;
    StudentDetailsSchema.findOneAndRemove({ "_id": id }, function (err) {
        if (err) {
            console.log("Error : " + err);
            return res.status(404).send("Record not found");
        }

        return res.status(200).send("Record deleted Successfully");
    });
}
