# Notas de Desarrollo - RONDA Demo

## 🏗️ Arquitectura de la Aplicación

### Context API para Estado Global

La aplicación usa dos contextos principales:

#### 1. SessionContext (`/src/app/context/SessionContext.tsx`)
Maneja la sesión del usuario:
- **sessionToken**: JWT simulado del usuario
- **currentUser**: Objeto con datos del usuario (nombre, totales, estado_pago)
- **qrCode**: Código QR de la mesa actual
- **tableNumber**: Número de mesa
- **restaurantName**: Nombre del restaurante

**Métodos:**
- `setSession()`: Crea nueva sesión y guarda en localStorage
- `updateUserTotals()`: Actualiza totales (personal, compartido, propina, abonado)
- `clearSession()`: Limpia sesión completa

#### 2. CartContext (`/src/app/context/CartContext.tsx`)
Maneja el carrito de pedidos:
- **items**: Array de ítems en el carrito
- **totalItems**: Cantidad total de ítems
- **subtotal**: Total en centavos COP

**Métodos:**
- `addItem()`: Agrega ítem al carrito
- `removeItem()`: Elimina ítem del carrito
- `updateQuantity()`: Cambia cantidad de un ítem
- `clearCart()`: Vacía el carrito

---

## 🔄 Flujo de Datos

### 1. Escaneo de QR → Sesión
```
/m/MESA-04-RONDA 
  → TableLanding (verifica mesa existe)
    → Onboarding (ingresa nombre)
      → Crea usuario en SessionContext
        → Guarda en localStorage
          → Navega a /menu
```

### 2. Pedido → Carrito → Cuenta
```
Menu (selecciona ítem)
  → ModifierModal (configura opciones + tipo)
    → CartContext.addItem()
      → Muestra en CartDrawer
        → Confirmar pedido
          → SessionContext.updateUserTotals()
            → Refleja en /account
```

### 3. Pago → Comprobante
```
Account (ver total)
  → Payment (paso 1: propina)
    → Payment (paso 2: método)
      → Payment (paso 3: instrucciones) [si digital]
        → Payment (paso 4: upload) [si digital]
          → Payment (paso 5: waiting)
            → PaymentSuccess (descarga PDF)
```

---

## 💾 Persistencia con LocalStorage

### Keys Utilizadas
```typescript
localStorage.setItem('ronda_session_token', token);
localStorage.setItem('ronda_user', JSON.stringify(user));
localStorage.setItem('ronda_qr_code', qrCode);
localStorage.setItem('ronda_table_number', tableNumber);
```

### Recuperación de Sesión
- Se carga automáticamente en `SessionProvider` useEffect
- Si existe sesión guardada, el usuario puede continuar donde quedó
- URL de recuperación incluye el token en query params (simulado)

---

## 🎨 Estilos y Diseño

### Colores Principales
- **Orange-500**: Color principal de marca (#f97316)
- **Orange-600**: Hover states (#ea580c)
- **Green-500**: Estados de éxito (#22c55e)
- **Red-500**: Badges de "Agotado" (#ef4444)
- **Gray-50**: Background general (#f9fafb)

### Componentes Clave
- **FAB (Floating Action Button)**: Carrito flotante en `/menu`
- **Drawer**: Panel deslizable para carrito y modificadores
- **Toast**: Notificaciones con Sonner
- **Badges**: Indicadores de estado (Pendiente, Pagado, etc.)

### Responsive
- **Mobile-first**: Optimizado para móvil (uso principal)
- **Breakpoint md**: 768px para tablet/desktop
- **Grid adaptativo**: 1 col móvil → 2-3 cols desktop

---

## 📊 Formato de Datos

### Precios
```typescript
// Almacenamiento interno: centavos COP (Integer)
const precio = 1200000; // $12.000 COP

// Display: formato colombiano
formatCOP(1200000) // → "$12.000"

// Función de formateo:
function formatCOP(centavos: number): string {
  const pesos = centavos / 10000;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(pesos);
}
```

### Estructura de CartItem
```typescript
interface CartItem {
  id: string;                    // Único: item_id + timestamp
  item_id: string;               // ID del ítem de menú
  nombre: string;
  precio: number;                // En centavos
  cantidad: number;
  tipo: 'personal' | 'compartido';
  modificadores: Modifier[];
  foto_url?: string;
}
```

### Estructura de MenuItem
```typescript
interface MenuItem {
  id: string;
  categoria_id: string;
  nombre: string;
  descripcion: string;
  precio: number;                // En centavos
  foto_url: string;
  tiempo_prep_min: number;
  disponible: boolean;
  modificadores: MenuModifier[];
}
```

---

## 🔧 Extensiones Posibles

### Para Convertir en Producción

1. **Backend API**
   - Reemplazar mock data con llamadas a Fastify
   - Endpoints: `/api/v1/menu`, `/api/v1/pedidos`, `/api/v1/pagos`
   - Autenticación con JWT real

2. **Base de Datos**
   - Migrar de mockData a Supabase
   - Implementar Row Level Security
   - Schema completo según especificaciones

3. **Tiempo Real**
   - Supabase Realtime para sincronización
   - Canales: `sesion:{id}`, `pedidos:{id}`, `mesas:{restaurant_id}`

4. **Upload Real**
   - Cloudinary para comprobantes
   - Validación de imágenes en servidor
   - Almacenamiento en `comprobantes_pago` table

5. **Panel de Staff**
   - Crear `/admin` y `/mesero` routes
   - Implementar autenticación por rol
   - Vistas: mapa de mesas, monitor de pagos, gestión de menú

---

## 🐛 Debug Tips

### Ver Estado de Contextos
```javascript
// En cualquier componente:
const { currentUser } = useSession();
console.log('User:', currentUser);

const { items, subtotal } = useCart();
console.log('Cart:', items, 'Total:', formatCOP(subtotal));
```

### Limpiar LocalStorage
```javascript
// En la consola del navegador:
localStorage.clear();
// Luego recargar la página
```

### Simular Diferentes Mesas
```javascript
// En la consola:
window.location.href = '/m/MESA-04-RONDA'; // Mesa 4
window.location.href = '/m/MESA-07-RONDA'; // Mesa 7
```

### Ver Datos Mock
```javascript
import { menuItems, categories, tables } from './data/mockData';
console.log('Menu:', menuItems);
console.log('Categorías:', categories);
console.log('Mesas:', tables);
```

---

## 🎯 Próximas Mejoras (Para la Demo)

### UI/UX
- [ ] Animaciones con Motion (framer-motion)
- [ ] Skeleton loaders durante "carga"
- [ ] Transiciones entre páginas
- [ ] Gestos de swipe para categorías

### Funcionalidades
- [ ] Búsqueda de ítems en el menú
- [ ] Filtros (vegetariano, sin gluten, etc.)
- [ ] Favoritos/Recomendados
- [ ] Historia de pedidos en la sesión
- [ ] Modo oscuro

### Performance
- [ ] Lazy loading de imágenes
- [ ] Virtual scrolling para menú largo
- [ ] Code splitting por ruta
- [ ] Optimización de bundle size

---

## 📚 Recursos Útiles

### Documentación
- [React Router v7](https://reactrouter.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [jsPDF](https://github.com/parallax/jsPDF)
- [Sonner](https://sonner.emilkowal.ski/)

### Guías de Estilo
- Formato de precios: Siempre en centavos internamente
- Nombres de variables: camelCase
- Componentes: PascalCase
- Archivos: kebab-case o PascalCase según tipo

---

## ✅ Checklist de Testing

- [ ] Flujo completo desde QR hasta comprobante
- [ ] Agregar ítems con y sin modificadores
- [ ] Mezclar ítems personales y compartidos
- [ ] Probar todos los métodos de pago
- [ ] Verificar cálculos de totales
- [ ] Probar recuperación de sesión (cerrar y volver)
- [ ] Descargar comprobante PDF
- [ ] Responsive en móvil y desktop
- [ ] Ítems agotados no se pueden agregar
- [ ] Modificadores obligatorios se validan

---

**Última actualización**: Febrero 2026
