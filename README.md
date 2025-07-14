# Portafolio Profesional – React + Tailwind + TypeScript

Portfolio profesional moderno, responsive y accesible, con internacionalización (ES/EN), formulario de contacto funcional vía Formspree y sin backend propio.

## Características principales
- **100% Frontend:** No requiere backend, fácil de desplegar en Vercel, Netlify, GitHub Pages, etc.
- **Internacionalización:** Español e inglés, con selector global.
- **Formulario de contacto:** Validación en tiempo real, accesibilidad, microinteracciones, integración con Formspree.
- **Diseño profesional:** Animaciones, dark mode, responsive, UX optimizada.
- **Código limpio:** Sin `any`, sin dependencias ni archivos no usados.

## Configuración rápida

1. **Clona el repo:**
   ```bash
   git clone https://github.com/dimichiko/portafolio.git
   cd portafolio/frontend
   ```

2. **Instala dependencias:**
   ```bash
   npm install
   ```

3. **Configura Formspree:**
   - Regístrate en [Formspree](https://formspree.io/).
   - Crea un formulario y copia tu endpoint (ejemplo: `https://formspree.io/f/xxxxxxx`).
   - Abre `src/components/Contact.tsx` y reemplaza la URL en el fetch del handleSubmit:
     ```ts
     const response = await fetch('https://formspree.io/f/xxxxxxx', { ... });
     ```

4. **Ejecuta en desarrollo:**
   ```bash
   npm run dev
   ```

5. **Despliega donde quieras:**
   - Vercel, Netlify, GitHub Pages, etc.

## Personalización
- Edita tus datos, proyectos y experiencia en `src/pages/HomePage.tsx` y `src/utils/translations.ts`.
- Cambia los archivos de CV en `public/resumeSpanish.pdf` y `public/resumeEnglish.pdf`.

## Limpieza y mejoras
- Eliminado todo backend y dependencias no usadas.
- Eliminados archivos de API y tipos de visitas.
- Navbar eliminado si no se usa.
- Solo quedan componentes y utilidades realmente usados.

## Contacto
- El formulario de contacto funciona sin backend, directo a tu email vía Formspree.
- Si quieres usar otro servicio (Getform, Netlify Forms, etc.), solo cambia la URL del fetch.

---

¡Portfolio listo para destacar y recibir oportunidades internacionales! 🚀
