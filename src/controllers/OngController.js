const db = require('../database');
const crypto = require('crypto');

module.exports = {
  async index(req, res) {
    const ongs = await db('ongs').select('*');

    return res.json({ ongs });
  },
  async show(req, res) {},
  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await db('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return res.json({ id });
  },
  async update(req, res) {},
  async destroy(req, res) {
    const { id } = req.body;

    db('ongs').where('id', id).del();

    return res.json({ message: 'ong excluída com sucesso' });
  },
};
