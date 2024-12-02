const { Trace } = require('../models');

const traceController = {
    // get all traces
    getAllTrace(req, res) {
      Trace.find({})
      .populate({
        path: 'comments',
        select: '-__v'
      })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbTraceData => res.json(dbTraceData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // get one trace by id
    getTraceById({ params }, res) {
      Trace.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v'
      })
        .select('-__v')
        .then(dbTraceData => {
          // If no trace is found, send 404
          if (!dbTraceData) {
            res.status(404).json({ message: 'No trace found with this id!' });
            return;
          }
          res.json(dbTraceData)
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },


    // createTrace
    createTrace({ body }, res) {
        Trace.create(body)
        .then(dbTraceData => res.json(dbTraceData))
        .catch(err => res.status(400).json(err));
    },

    // update trace by id
    updateTrace({ params, body }, res) {
      Trace.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbTraceData => {
          if (!dbTraceData) {
            res.status(404).json({ message: 'No trace found with this id!' });
            return;
          }
          res.json(dbTraceData);
        })
        .catch(err => res.json(err));
    },

    // delete trace
    deleteTrace({ params }, res) {
        Trace.findOneAndDelete({ _id: params.id })
        .then(dbTraceData => {
            if (!dbTraceData) {
            res.status(404).json({ message: 'No trace found with this id!' });
            return;
            }
            res.json(dbTraceData);
        })
        .catch(err => res.status(400).json(err));
     }

}

module.exports = traceController;
