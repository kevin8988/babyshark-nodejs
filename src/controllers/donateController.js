const donateDAO = require('./../dao/donateDAO');

exports.getDonates = async (req, res) => {
  try {
    const donates = await donateDAO.getDonates();
    res.status(200).json({ status: 'success', data: { donates } });
  } catch (error) {
    res.status(404).json({ status: 'fail', data: error });
  }
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

exports.createDonate = async (req, res) => {
  try {
    const { body } = req;
    const donate = await donateDAO.create(body);

    res.status(201).json({ status: 'success', data: { donate } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
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
