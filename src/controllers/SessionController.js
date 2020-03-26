const db = require('../database');

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    const ong = await db('ongs').where('id', id).select('name').first();

    if (!ong) {
      return res.status(400).json({ error: 'No ong found with the provided id' });
    }

    return res.json({ ong });
  },
};
