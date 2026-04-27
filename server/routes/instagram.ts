import { Router } from 'express';

const router = Router();

// GET /api/instagram/posts
// Retorna posts do Instagram da Pundim
router.get('/posts', async (req, res) => {
  try {
    // Em produção, isso seria integrado com a Instagram Graph API
    // Por enquanto, retorna posts de exemplo
    
    const posts = [
      {
        id: '1',
        caption: 'Pudim Tradicional 🍮 O clássico que nunca decepciona! Cremoso, sem furinhos e feito com amor.',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
        permalink: 'https://www.instagram.com/pundim.jundiai/',
        timestamp: new Date().toISOString(),
        like_count: 234,
        comments_count: 12,
      },
      {
        id: '2',
        caption: 'Pudim de Doce de Leite ✨ Cremoso com calda especial. Pronta entrega em 120ml!',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
        permalink: 'https://www.instagram.com/pundim.jundiai/',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        like_count: 189,
        comments_count: 8,
      },
      {
        id: '3',
        caption: 'Pudim de Chocolate 🍫 Intenso, cremoso e irresistível. Encomenda com 24h de antecedência!',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
        permalink: 'https://www.instagram.com/pundim.jundiai/',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        like_count: 312,
        comments_count: 15,
      },
    ];

    res.json({
      success: true,
      posts,
      total: posts.length,
    });
  } catch (error) {
    console.error('[Instagram] Erro ao obter posts:', error);
    res.status(500).json({ error: 'Erro ao obter posts do Instagram' });
  }
});

// GET /api/instagram/profile
// Retorna informações do perfil do Instagram
router.get('/profile', async (req, res) => {
  try {
    const profile = {
      username: 'pundim.jundiai',
      name: 'Pundim',
      bio: 'Pudim caseiro e cremoso 🍮 Simples, gostoso e sem furinhos. Pronta entrega e encomendas em Jundiaí e região.',
      followers: 37,
      following: 2,
      posts: 6,
      profilePictureUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop',
      website: 'https://wa.me/5511996706389',
    };

    res.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error('[Instagram] Erro ao obter perfil:', error);
    res.status(500).json({ error: 'Erro ao obter perfil do Instagram' });
  }
});

export default router;
