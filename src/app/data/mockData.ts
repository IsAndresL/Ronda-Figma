// Utility function to format Colombian Pesos
export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
}

// Utility function to get initials from a name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

// Categories
export interface Category {
  id: string;
  nombre: string;
}

export const categories: Category[] = [
  { id: 'entradas', nombre: 'Entradas' },
  { id: 'platos-fuertes', nombre: 'Platos Fuertes' },
  { id: 'postres', nombre: 'Postres' },
  { id: 'bebidas', nombre: 'Bebidas' },
];

// Menu Items
export interface MenuModifier {
  id: string;
  nombre_grupo: string;
  obligatorio: boolean;
  opciones: {
    texto: string;
    precio_extra: number;
  }[];
}

export interface MenuItem {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria_id: string;
  foto_url: string;
  disponible: boolean;
  modificadores: MenuModifier[];
}

export const menuItems: MenuItem[] = [
  {
    id: 'item-1',
    nombre: 'Empanadas',
    descripcion: 'Empanadas tradicionales con ají',
    precio: 15000,
    categoria_id: 'entradas',
    foto_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
    disponible: true,
    modificadores: [],
  },
  {
    id: 'item-2',
    nombre: 'Patacones',
    descripcion: 'Plátano verde frito con hogao',
    precio: 18000,
    categoria_id: 'entradas',
    foto_url: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400',
    disponible: true,
    modificadores: [],
  },
  {
    id: 'item-3',
    nombre: 'Bandeja Paisa',
    descripcion: 'Plato típico con frijoles, arroz, chicharrón, huevo, aguacate',
    precio: 35000,
    categoria_id: 'platos-fuertes',
    foto_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    disponible: true,
    modificadores: [
      {
        id: 'mod-1',
        nombre_grupo: 'Proteína adicional',
        obligatorio: false,
        opciones: [
          { texto: 'Sin adicional', precio_extra: 0 },
          { texto: 'Chorizo', precio_extra: 5000 },
          { texto: 'Morcilla', precio_extra: 5000 },
        ],
      },
    ],
  },
  {
    id: 'item-4',
    nombre: 'Ajiaco',
    descripcion: 'Sopa tradicional bogotana con pollo y papas',
    precio: 28000,
    categoria_id: 'platos-fuertes',
    foto_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
    disponible: true,
    modificadores: [],
  },
  {
    id: 'item-5',
    nombre: 'Tres Leches',
    descripcion: 'Pastel de tres leches tradicional',
    precio: 12000,
    categoria_id: 'postres',
    foto_url: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400',
    disponible: true,
    modificadores: [],
  },
  {
    id: 'item-6',
    nombre: 'Jugo Natural',
    descripcion: 'Jugo de frutas frescas',
    precio: 8000,
    categoria_id: 'bebidas',
    foto_url: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
    disponible: true,
    modificadores: [
      {
        id: 'mod-2',
        nombre_grupo: 'Sabor',
        obligatorio: true,
        opciones: [
          { texto: 'Mora', precio_extra: 0 },
          { texto: 'Lulo', precio_extra: 0 },
          { texto: 'Maracuyá', precio_extra: 0 },
          { texto: 'Mango', precio_extra: 0 },
        ],
      },
    ],
  },
];

// Tables
export interface Table {
  qr_code: string;
  numero: string;
  estado: 'libre' | 'ocupada' | 'reservada';
  comensales: {
    nombre: string;
    color: string;
  }[];
}

export const tables: Record<string, Table> = {
  'qr-mesa-4': {
    qr_code: 'qr-mesa-4',
    numero: '4',
    estado: 'ocupada',
    comensales: [
      { nombre: 'Carlos Ramírez', color: '#FF6B6B' },
      { nombre: 'María González', color: '#4ECDC4' },
      { nombre: 'Juan Pérez', color: '#FFE66D' },
    ],
  },
  'qr-mesa-7': {
    qr_code: 'qr-mesa-7',
    numero: '7',
    estado: 'ocupada',
    comensales: [
      { nombre: 'Ana Torres', color: '#95E1D3' },
      { nombre: 'Luis Martínez', color: '#F38181' },
    ],
  },
  'qr-mesa-1': {
    qr_code: 'qr-mesa-1',
    numero: '1',
    estado: 'libre',
    comensales: [],
  },
  'qr-mesa-2': {
    qr_code: 'qr-mesa-2',
    numero: '2',
    estado: 'libre',
    comensales: [],
  },
  'qr-mesa-3': {
    qr_code: 'qr-mesa-3',
    numero: '3',
    estado: 'libre',
    comensales: [],
  },
};

// Orders
export interface Order {
  id: string;
  mesa_numero: string;
  comensal: string;
  items: {
    nombre: string;
    cantidad: number;
    precio: number;
    modificadores: string[];
  }[];
  total: number;
  estado: 'pendiente' | 'en_preparacion' | 'listo' | 'servido';
  fecha: string;
  hora: string;
  tipo: 'personal' | 'compartido';
}

export const mockOrders: Order[] = [
  {
    id: 'ord-1',
    mesa_numero: '4',
    comensal: 'Carlos Ramírez',
    items: [
      { nombre: 'Bandeja Paisa', cantidad: 1, precio: 35000, modificadores: ['Chorizo'] },
      { nombre: 'Jugo Natural', cantidad: 1, precio: 8000, modificadores: ['Mora'] },
    ],
    total: 48000,
    estado: 'listo',
    fecha: '2026-03-16',
    hora: '12:30',
    tipo: 'personal',
  },
  {
    id: 'ord-2',
    mesa_numero: '4',
    comensal: 'María González',
    items: [
      { nombre: 'Ajiaco', cantidad: 1, precio: 28000, modificadores: [] },
      { nombre: 'Jugo Natural', cantidad: 1, precio: 8000, modificadores: ['Lulo'] },
    ],
    total: 36000,
    estado: 'en_preparacion',
    fecha: '2026-03-16',
    hora: '12:35',
    tipo: 'personal',
  },
  {
    id: 'ord-3',
    mesa_numero: '7',
    comensal: 'Ana Torres',
    items: [
      { nombre: 'Empanadas', cantidad: 2, precio: 15000, modificadores: [] },
      { nombre: 'Jugo Natural', cantidad: 1, precio: 8000, modificadores: ['Maracuyá'] },
    ],
    total: 38000,
    estado: 'servido',
    fecha: '2026-03-16',
    hora: '13:00',
    tipo: 'personal',
  },
];

// Payments
export interface Payment {
  id: string;
  mesa_numero: string;
  comensal: string;
  monto: number;
  metodo: 'nequi' | 'daviplata' | 'efectivo' | 'tarjeta';
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  referencia: string;
  fecha: string;
  hora: string;
  comprobante_url?: string;
}

export const mockPayments: Payment[] = [
  {
    id: 'pay-1',
    mesa_numero: '4',
    comensal: 'Carlos Ramírez',
    monto: 4840000, // 4400000 + 10% propina
    metodo: 'nequi',
    estado: 'pendiente',
    referencia: 'RONDA-4-1230-CR',
    fecha: '2026-03-16',
    hora: '13:15',
    comprobante_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
  },
  {
    id: 'pay-2',
    mesa_numero: '7',
    comensal: 'Ana Torres',
    monto: 2640000,
    metodo: 'efectivo',
    estado: 'aprobado',
    referencia: 'RONDA-7-1300-AT',
    fecha: '2026-03-16',
    hora: '13:00',
  },
  {
    id: 'pay-3',
    mesa_numero: '4',
    comensal: 'María González',
    monto: 3850000,
    metodo: 'daviplata',
    estado: 'pendiente',
    referencia: 'RONDA-4-1318-MG',
    fecha: '2026-03-16',
    hora: '13:18',
    comprobante_url: 'https://images.unsplash.com/photo-1554224311-9ff1c4e6f73a?w=400',
  },
];

export interface DinerAccount {
  nombre: string;
  color: string;
  pedidos: Order[];
  total: number;
  estado_pago: 'sin_pagar' | 'pendiente' | 'pagado';
  pago_id?: string;
}

export function getDinersByTable(tableNumber: string): DinerAccount[] {
  const table = Object.values(tables).find(t => t.numero === tableNumber);
  if (!table) return [];

  return table.comensales.map(comensal => {
    const dinerOrders = mockOrders.filter(o =>
      o.mesa_numero === tableNumber && o.comensal === comensal.nombre
    );
    const total = dinerOrders.reduce((sum, o) => sum + o.total, 0);
    const payment = mockPayments.find(p =>
      p.mesa_numero === tableNumber && p.comensal === comensal.nombre
    );

    let estado_pago: 'sin_pagar' | 'pendiente' | 'pagado' = 'sin_pagar';
    if (payment) {
      if (payment.estado === 'aprobado') estado_pago = 'pagado';
      else if (payment.estado === 'pendiente') estado_pago = 'pendiente';
    }

    return {
      nombre: comensal.nombre,
      color: comensal.color,
      pedidos: dinerOrders,
      total,
      estado_pago,
      pago_id: payment?.id,
    };
  });
}

// Restaurant configuration
export const restaurant = {
  nombre: 'La Mesa Redonda',
  metodos_pago: {
    nequi: {
      activo: true,
      numero: '3001234567',
    },
    daviplata: {
      activo: true,
      numero: '3109876543',
    },
    efectivo: {
      activo: true,
    },
    tarjeta: {
      activo: true,
    },
  },
};

// Generate payment reference code
export function generateReferenceCode(tableNumber: string, nombre: string): string {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const initials = getInitials(nombre);
  return `RONDA-${tableNumber}-${hours}${minutes}-${initials}`;
}