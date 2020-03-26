const db = require('../database');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await db('incidents').count();

    const incidents = await db('incidents')
      .limit(5)
      .offset((page - 1) * 5)
      .select('*');

    res.json({ incidents, count });
  },
  async create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;
    const [id] = await db('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return res.json({ id });
  },
  async destroy(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incidentToDelete = await db('incidents').where('id', id).select('ong_id').first();

    if (incidentToDelete !== undefined) {
      if (incidentToDelete.ong_id === ong_id) {
        await db('incidents').where('id', id).delete();
        return res.status(204).send();
      } else {
        return res.status(403).json({ message: 'acesso bloqueado' });
      }
    } else {
      return res.status(400).json({ message: 'id inválido' });
    }
  },
};
