import fetch from 'node-fetch';
import { Request } from 'express';

export function getClientIp(req: Request): string | null {
  let ip = req.headers['x-forwarded-for'] || req.ip || '';
  if (Array.isArray(ip)) ip = ip[0];
  if (typeof ip === 'string' && ip.includes(',')) ip = ip.split(',')[0].trim();
  if (ip === '::1' || ip === '127.0.0.1') return null;
  return ip || null;
}

export async function getCountry(ip: string | null): Promise<string | null> {
  if (!ip || process.env.NODE_ENV === 'development') return null;
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();
    return data.country_name || null;
  } catch {
    return null;
  }
} 