const { Schema, model } = require("mongoose");

const VisitorRecordSchema = new Schema({
  visitorName: {
    type: String,
    required: true,
  },
  maskedId: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  vehiclePlate: {
    type: String,
    default: "",
  },
  visitingUnit: {
    type: String,
    required: true,
  },
  purposeOfVisit: {
    type: String,
    required: true,
  },
  accessPass: {
    type: String,
    required: true,
  },
  entryTime: {
    type: Date,
  },
  exitTime: {
    type: Date,
  },
});

const visitorRecord = model("visitorRecord", VisitorRecordSchema);

module.exports = visitorRecord;
