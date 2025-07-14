# Portfolio Profesional

Proyecto full-stack con backend Node.js/Express/TypeScript/Prisma y frontend React/Vite/TypeScript.

## 🏗️ Estructura del Proyecto

```
dimitrisVamvoukasPersonal/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── config/
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── utils/
    │   ├── types/
    │   └── App.tsx
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🚀 Instalación y Configuración

### 1. Configurar Base de Datos PostgreSQL

```bash
# Instalar PostgreSQL (si no lo tienes)
# macOS con Homebrew:
brew install postgresql
brew services start postgresql

# Crear base de datos
createdb portfolio_db
```

### 2. Configurar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
# Editar .env con tu DATABASE_URL:
# DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db"

# Generar cliente Prisma
npm run db:generate

# Sincronizar esquema con base de datos
npm run db:push
```

### 3. Configurar Frontend

```bash
cd frontend

# Instalar dependencias
npm install
```

## 🏃‍♂️ Ejecutar el Proyecto

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
El backend estará disponible en: http://localhost:3000

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
El frontend estará disponible en: http://localhost:5173

## 📡 Endpoints de la API

- `GET /api/ping` - Devuelve "pong" (test de conexión)
- `POST /api/visits` - Crear nueva visita
- `GET /api/visits` - Obtener todas las visitas

## 🎨 Características del Frontend

- **Tema**: Negro elegante con distintos tonos
- **Animaciones**: Framer Motion para transiciones suaves
- **Estilos**: TailwindCSS para diseño responsive
- **Estado**: Indicador de conexión con backend en tiempo real

## 🛠️ Comandos Útiles

### Backend
```bash
npm run dev          # Desarrollo con ts-node-dev
npm run build        # Compilar TypeScript
npm run start        # Ejecutar producción
npm run db:studio    # Abrir Prisma Studio
```

### Frontend
```bash
npm run dev          # Desarrollo con Vite
npm run build        # Build para producción
npm run preview      # Preview del build
```

## 🔧 Tecnologías Utilizadas

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- CORS habilitado

### Frontend
- React 18
- Vite
- TypeScript
- TailwindCSS
- Framer Motion
- Axios para API calls

## 📝 Próximos Pasos

1. Configurar tu `DATABASE_URL` en `backend/.env`
2. Ejecutar `npm run db:push` para crear las tablas
3. Iniciar ambos servidores
4. ¡Tu portfolio está listo! 🎉 # portafolio
