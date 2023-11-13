const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Lista todos os posts
 *     description: Retorna uma lista de posts.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de posts.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/api/posts', (req, res) => {
  // Lógica para obter a lista de posts
  const posts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
  ];

  res.status(200).json(posts);
});

module.exports = router;
