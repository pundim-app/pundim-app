import { Router } from 'express';
import cron from 'node-cron';

const router = Router();

interface ScheduledNotification {
  id: string;
  title: string;
  body: string;
  time: string; // HH:MM
  daysOfWeek: number[]; // 0-6 (Dom-Sab)
  isActive: boolean;
  cronJob?: any; // ScheduledTask do node-cron
}

// Armazena notificações agendadas (em produção, seria um banco de dados)
const scheduledNotifications = new Map<string, ScheduledNotification>();
const subscriptions = new Map<string, any>();

// POST /api/notifications/schedule
// Agenda uma notificação para ser enviada em horários específicos
router.post('/schedule', (req, res) => {
  try {
    const { title, body, time, daysOfWeek } = req.body;

    if (!title || !body || !time || !daysOfWeek || daysOfWeek.length === 0) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    const id = `notif-${Date.now()}`;
    const [hours, minutes] = time.split(':').map(Number);

    // Cria expressão cron
    // Formato: minuto hora * * dia-da-semana
    const cronExpression = `${minutes} ${hours} * * ${daysOfWeek.join(',')}`;

    console.log(`[Notifications] Agendando notificação: ${id}`);
    console.log(`[Notifications] Expressão cron: ${cronExpression}`);

    // Agenda o job
    const cronJob = cron.schedule(cronExpression, async () => {
      console.log(`[Notifications] Enviando notificação agendada: ${title}`);
      await broadcastNotification(title, body);
    });

    const notification: ScheduledNotification = {
      id,
      title,
      body,
      time,
      daysOfWeek,
      isActive: true,
      cronJob,
    };

    scheduledNotifications.set(id, notification);

    res.status(201).json({
      success: true,
      message: 'Notificação agendada com sucesso!',
      id,
    });
  } catch (error) {
    console.error('[Notifications] Erro ao agendar:', error);
    res.status(500).json({ error: 'Erro ao agendar notificação' });
  }
});

// GET /api/notifications/scheduled
// Retorna todas as notificações agendadas
router.get('/scheduled', (req, res) => {
  try {
    const notifications = Array.from(scheduledNotifications.values()).map((n) => ({
      id: n.id,
      title: n.title,
      body: n.body,
      time: n.time,
      daysOfWeek: n.daysOfWeek,
      isActive: n.isActive,
    }));

    res.json({
      success: true,
      notifications,
      total: notifications.length,
    });
  } catch (error) {
    console.error('[Notifications] Erro ao obter agendadas:', error);
    res.status(500).json({ error: 'Erro ao obter notificações' });
  }
});

// DELETE /api/notifications/scheduled/:id
// Remove uma notificação agendada
router.delete('/scheduled/:id', (req, res) => {
  try {
    const { id } = req.params;
    const notification = scheduledNotifications.get(id);

    if (!notification) {
      return res.status(404).json({ error: 'Notificação não encontrada' });
    }

    // Para o cron job
    if (notification.cronJob) {
      notification.cronJob.stop();
    }

    scheduledNotifications.delete(id);

    console.log(`[Notifications] Notificação removida: ${id}`);

    res.json({
      success: true,
      message: 'Notificação removida com sucesso!',
    });
  } catch (error) {
    console.error('[Notifications] Erro ao remover:', error);
    res.status(500).json({ error: 'Erro ao remover notificação' });
  }
});

// POST /api/notifications/send
// Envia uma notificação imediatamente para todos os usuários
router.post('/send', async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: 'Título e mensagem são obrigatórios' });
    }

    console.log(`[Notifications] Enviando notificação imediata: ${title}`);
    const count = await broadcastNotification(title, body);

    res.json({
      success: true,
      message: `Notificação enviada para ${count} usuários!`,
      count,
    });
  } catch (error) {
    console.error('[Notifications] Erro ao enviar:', error);
    res.status(500).json({ error: 'Erro ao enviar notificação' });
  }
});

// Função auxiliar para enviar notificação para todos os usuários inscritos
async function broadcastNotification(title: string, body: string): Promise<number> {
  let count = 0;

  // Em produção, isso seria integrado com um serviço de push real (Firebase, OneSignal, etc)
  // Por enquanto, apenas registra no console
  for (const [endpoint, subscription] of subscriptions.entries()) {
    try {
      console.log(`[Notifications] Enviando para: ${endpoint}`);
      // Aqui seria feito o envio real da notificação push
      count++;
    } catch (error) {
      console.error(`[Notifications] Erro ao enviar para ${endpoint}:`, error);
    }
  }

  console.log(`[Notifications] Notificação enviada para ${count} usuários`);
  return count;
}

// POST /api/notifications/subscribe
// Registra uma inscrição (reutiliza do arquivo anterior)
router.post('/subscribe', (req, res) => {
  try {
    const subscription = req.body;

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ error: 'Inscrição inválida' });
    }

    subscriptions.set(subscription.endpoint, subscription);
    console.log('[Notifications] Nova inscrição registrada');

    res.status(201).json({
      success: true,
      message: 'Inscrição realizada com sucesso!',
    });
  } catch (error) {
    console.error('[Notifications] Erro ao inscrever:', error);
    res.status(500).json({ error: 'Erro ao processar inscrição' });
  }
});

export default router;
