exports.getAllDonates = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      donates: {}
    }
  });
};

exports.getDonate = (req, res) => {
  const { id } = req.params.id;

  res.status(200).json({
    status: 'success',
    data: {
      donates: { id }
    }
  });
};

exports.createDonate = (req, res) => {
  const donate = req.body;

  res.status(201).json({
    status: 'success',
    data: {
      donates: [donate]
    }
  });
};

exports.updateDonate = (req, res) => {
  const { id } = req.params.id;
  res.status(200).json({
    status: 'success',
    data: { donate: `Donate with id ${id} updated...` }
  });
};

exports.deleteDonate = (req, res) => {
  res.status(204).send({ status: 'success', data: null });
};
