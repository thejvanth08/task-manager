const mongoose = require("mongoose");

// to setup structure for all documents in the collection (schema)
// fields & it's datatype
const TaskSchema = new mongoose.Schema({
    // name: String (only datatype)
    name: {
        type: String,
        // required: true (we can also have custom msg)
        required: [true, "must provide name"],
        trim: true,
        // to limit length of string
        maxlength: [20, "name can not be more than 20 characters"]
    },
    // completed: Boolean,
    completed: {
        type: Boolean,
        // we dont need to pass the value, as we set the default 
        default: false 
    }

    // we can also setup validations for fields in schema
    // by setting prop (fields) as objects & setup validations, datatypes
});

// since we setup schema, only the data with that schema going to be stored in db
// everything (other fields) else is going to be ignored


// to create model using schema (interface to interact with db collections)
// instance of model is document
// collection name -> tasks (model name will be converted into smallcase, plural form)
module.exports = mongoose.model("Task", TaskSchema);