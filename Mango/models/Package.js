const mongoose = require("mongoose");
// ES6 Promise
mongoose.Promise = global.Promise;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const Schema = mongoose.Schema;

const PackageSchema = new Schema({
    tracking_number: Number
});

const Package = mongoose.model('Package', PackageSchema);

module.exports = Package;
