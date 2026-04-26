import { Router } from 'express';

const router = Router();

// Frases criativas do Pundim para notificações
const PUNDIM_PHRASES = [
  {
    title: 'Pundim 🍮',
    body: 'Neste exato momento, alguém em Jundiaí está desfrutando de um Pundim. Por que não você?',
  },
  {
    title: 'Pundim 🍮',
    body: 'A vida é curta demais para não experimentar um pudim caseiro. Peça o seu agora!',
  },
  {
    title: 'Pundim 🍮',
    body: 'Aquele caramelo dourado te chamando... Você consegue resistir?',
  },
  {
    title: 'Pundim 🍮',
    body: 'Pudim cremoso, sem furinhos, feito com amor. Isso é Pundim!',
  },
  {
    title: 'Pundim 🍮',
    body: 'Doce de Leite, Tradicional ou Chocolate? Escolha seu sabor favorito!',
  },
  {
    title: 'Pundim 🍮',
    body: 'Pronta entrega em 120ml. Encomendas de 500ml e 1000ml com 24h de antecedência.',
  },
  {
    title: 'Pundim 🍮',
    body: 'Aquele pudim que muda tudo? Ele está aqui em Jundiaí!',
  },
  {
    title: 'Pundim 🍮',
    body: 'Cada colherada é uma experiência. Cada sabor é uma descoberta.',
  },
  {
    title: 'Pundim 🍮',
    body: 'Confraternização? Aniversário? Casamento? Pundim resolve!',
  },
  {
    title: 'Pundim 🍮',
    body: 'Caseiro, cremoso e sem furinhos. A receita perfeita do Pundim.',
  },
  {
    title: 'Pundim 🍮',
    body: 'Você já experimentou o Pundim de Doce de Leite? Prepare-se para a surpresa!',
  },
  {
    title: 'Pundim 🍮',
    body: 'Chocolate intenso, pudim cremoso, calda perfeita. Isso é Pundim de Chocolate!',
  },
  {
    title: 'Pundim 🍮',
    body: 'Aquele momento em que você bate o garfo e o pudim derrete na boca...',
  },
  {
    title: 'Pundim 🍮',
    body: 'Jundiaí tem um tesouro: o Pundim! Já provou?',
  },
  {
    title: 'Pundim 🍮',
    body: 'Memória afetiva em forma de pudim. Isso é o Pundim Tradicional.',
  },
  {
    title: 'Pundim 🍮',
    body: 'Simples, gostoso e sem furinhos. A filosofia do Pundim.',
  },
  {
    title: 'Pundim 🍮',
    body: 'Aquele pudim que você sonha em comer? Ele existe, e está em Jundiaí!',
  },
  {
    title: 'Pundim 🍮',
    body: 'Pronta entrega ou encomenda? Escolha como prefere aproveitar o Pundim.',
  },
  {
    title: 'Pundim 🍮',
    body: 'A receita secreta? Amor, qualidade e muita dedicação em cada pudim.',
  },
  {
    title: 'Pundim 🍮',
    body: 'Pudim que muda tudo: na sua mesa, na sua vida, no seu coração.',
  },
];

// Armazena inscrições (em produção, seria um banco de dados)
const subscriptions = new Map<string, PushSubscription>();

// POST /api/notifications/subscribe
// Recebe a inscrição push do cliente
router.post('/subscribe', (req, res) => {
  try {
    const subscription = req.body;

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ error: 'Inscrição inválida' });
    }

    // Salva a inscrição
    const subscriptionId = subscription.endpoint;
    subscriptions.set(subscriptionId, subscription);

    console.log('[Notifications] Nova inscrição:', subscriptionId);

    res.status(201).json({
      success: true,
      message: 'Inscrição realizada com sucesso!',
      subscriptionId,
    });
  } catch (error) {
    console.error('[Notifications] Erro ao inscrever:', error);
    res.status(500).json({ error: 'Erro ao processar inscrição' });
  }
});

// POST /api/notifications/unsubscribe
// Remove a inscrição push do cliente
router.post('/unsubscribe', (req, res) => {
  try {
    const { endpoint } = req.body;

    if (!endpoint) {
      return res.status(400).json({ error: 'Endpoint inválido' });
    }

    subscriptions.delete(endpoint);
    console.log('[Notifications] Inscrição removida:', endpoint);

    res.json({ success: true, message: 'Desinscrito com sucesso!' });
  } catch (error) {
    console.error('[Notifications] Erro ao desinscrever:', error);
    res.status(500).json({ error: 'Erro ao processar desincrição' });
  }
});

// GET /api/notifications/random-phrase
// Retorna uma frase aleatória do Pundim
router.get('/random-phrase', (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * PUNDIM_PHRASES.length);
    const phrase = PUNDIM_PHRASES[randomIndex];

    res.json({
      success: true,
      phrase,
      totalPhrases: PUNDIM_PHRASES.length,
    });
  } catch (error) {
    console.error('[Notifications] Erro ao obter frase:', error);
    res.status(500).json({ error: 'Erro ao obter frase' });
  }
});

// GET /api/notifications/phrases
// Retorna todas as frases do Pundim
router.get('/phrases', (req, res) => {
  try {
    res.json({
      success: true,
      phrases: PUNDIM_PHRASES,
      total: PUNDIM_PHRASES.length,
    });
  } catch (error) {
    console.error('[Notifications] Erro ao obter frases:', error);
    res.status(500).json({ error: 'Erro ao obter frases' });
  }
});

// GET /api/notifications/subscriptions-count
// Retorna o número de inscrições ativas (apenas para admin)
router.get('/subscriptions-count', (req, res) => {
  try {
    const count = subscriptions.size;
    res.json({
      success: true,
      count,
    });
  } catch (error) {
    console.error('[Notifications] Erro ao contar inscrições:', error);
    res.status(500).json({ error: 'Erro ao contar inscrições' });
  }
});

export default router;
