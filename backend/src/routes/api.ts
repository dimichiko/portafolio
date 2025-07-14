import { Router } from 'express';
import { createVisit, getVisits } from '../controllers/visitController';
import prisma from '../config/database';
import { getClientIp, getCountry } from '../utils/ipUtils';

const router = Router();

// Endpoint de prueba
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Rutas de visitas
router.post('/visits', createVisit);
router.get('/visits', getVisits);

// Ruta para tracking de visitas
router.post('/visit', async (req, res) => {
  try {
    const { page } = req.body;
    let ip = getClientIp(req);
    let country: string | null = null;

    if (ip) {
      country = await getCountry(ip);
    }

    await prisma.visit.create({
      data: {
        ip: ip || 'unknown',
        country,
        page: page || '/',
      },
    });

    console.log(`✅ Visita: IP=${ip || 'local'} | País=${country || 'N/A'} | Página=${page}`);

    res.json({ status: 'ok' });
  } catch (error) {
    console.error('❌ Error registrando visita:', error);
    res.status(500).json({ error: 'Error registrando visita' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const visits = await prisma.visit.findMany();
    // Agrupar por fecha y país
    const stats: Record<string, { total: number; countries: Record<string, number> }> = {};

    visits.forEach((v) => {
      const date = v.createdAt.toISOString().slice(0, 10);
      if (!stats[date]) stats[date] = { total: 0, countries: {} };
      stats[date].total += 1;
      const country = v.country || 'Desconocido';
      stats[date].countries[country] = (stats[date].countries[country] || 0) + 1;
    });

    const result = Object.entries(stats).map(([date, { total, countries }]) => ({
      date,
      total,
      countries,
    }));

    res.json(result);
  } catch (error) {
    console.error('❌ Error obteniendo stats:', error);
    res.status(500).json({ error: 'Error obteniendo stats' });
  }
});

export default router; 