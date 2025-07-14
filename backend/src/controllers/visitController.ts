import { Request, Response } from 'express';
import prisma from '../config/database';

export const createVisit = async (req: Request, res: Response) => {
  try {
    const { ip, country, page } = req.body;
    
    const visit = await prisma.visit.create({
      data: {
        ip,
        country,
        page
      }
    });
    
    res.status(201).json(visit);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear visita' });
  }
};

export const getVisits = async (req: Request, res: Response) => {
  try {
    const visits = await prisma.visit.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json(visits);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener visitas' });
  }
}; 