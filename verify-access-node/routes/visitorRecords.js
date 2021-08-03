const { Router } = require("express");
const VisitorRecord = require("../models/VisitorRecord");

const router = Router();

router.get("", async (req, res) => {
  try {
    const visitorRecords = await VisitorRecord.find({
      exitTime: { $exists: false },
    });
    if (!visitorRecords) throw new Error("No Visitor Records!");
    const sorted = visitorRecords.sort((a, b) => {
      return new Date(a.entryTime).getTime() - new Date(b.entryTime).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/history", async (req, res) => {
  try {
    const visitorRecords = await VisitorRecord.find();
    if (!visitorRecords) throw new Error("No Visitor Records!");
    const sorted = visitorRecords.sort((a, b) => {
      return new Date(a.entryTime).getTime() - new Date(b.entryTime).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/history/daily", async (req, res) => {
  try {
    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);

    const visitorRecords = await VisitorRecord.find({
      entryTime: { $gte: start, $lt: end },
    });
    if (!visitorRecords) throw new Error("No Visitor Records!");
    const sorted = visitorRecords.sort((a, b) => {
      return new Date(a.entryTime).getTime() - new Date(b.entryTime).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/history/weekly", async (req, res) => {
  try {
    var today = new Date();
    var firstDayOfWeek = today.getDate() - today.getDay();
    var start = new Date(today.setDate(firstDayOfWeek));
    var end = new Date(today.setDate(firstDayOfWeek + 6));

    const visitorRecords = await VisitorRecord.find({
      entryTime: { $gte: start, $lt: end },
    });
    if (!visitorRecords) throw new Error("No Visitor Records!");
    const sorted = visitorRecords.sort((a, b) => {
      return new Date(a.entryTime).getTime() - new Date(b.entryTime).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("", async (req, res) => {
  const newVisitorRecord = new VisitorRecord(req.body);
  try {
    const visitorRecord = await newVisitorRecord.save();
    if (!visitorRecord) throw new Error("Unable to save new visitor record!");
    res.status(200).json(visitorRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await VisitorRecord.findByIdAndUpdate(
      id,
      { exitTime: Date.now() },
      { upsert: true, new: true }
    );
    if (!response) throw new Error("Unable to update visitor record!");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
