# RONDA - Demo del Cliente

Esta es una **demo funcional** del flujo completo del cliente para la plataforma RONDA.

## 🎯 ¿Qué incluye esta demo?

### ✅ Funcionalidades Implementadas

1. **Escaneo de QR y Onboarding**
   - Simulación de escaneo de código QR
   - Ingreso de nombre del cliente
   - Generación de URL de recuperación de sesión

2. **Menú Interactivo**
   - 4 categorías con navegación por tabs (Entradas, Platos Fuertes, Bebidas, Postres)
   - 11 ítems de menú con fotos, precios y descripciones
   - Indicadores de tiempo de preparación
   - Ítems agotados (no disponibles)

3. **Modificadores de Pedidos**
   - Modal para seleccionar opciones de cada plato
   - Modificadores obligatorios y opcionales
   - Modificadores con costo adicional
   - Selección de tipo: Personal o Compartido

4. **Carrito de Pedidos**
   - Vista de carrito flotante (FAB con contador)
   - Ajuste de cantidades
   - Eliminación de ítems
   - Confirmación de pedido con notificación

5. **Estado de Cuenta**
   - Desglose de consumo personal
   - Desglose de consumo compartido (dividido entre comensales)
   - Indicador de estado de pago
   - Cálculo de total y pendiente

6. **Flujo de Pago Completo**
   - **Paso 1**: Selección de propina (0%, 5%, 10%, 15%, personalizada)
   - **Paso 2**: Selección de método (Nequi, Daviplata, Efectivo, Tarjeta)
   - **Paso 3**: Instrucciones de pago digital con número para copiar
   - **Paso 4**: Upload de comprobante (imagen)
   - **Paso 5**: Simulación de aprobación

7. **Comprobante Descargable**
   - Pantalla de confirmación de pago exitoso
   - Generación de código de referencia único (formato: RONDA-MESA-HORA-INICIALES)
   - Descarga de comprobante en PDF con jsPDF
   - Desglose completo del consumo

## 🚀 Cómo Probar la Demo

### Opción 1: URL Directa de Mesa
Visita cualquiera de estas URLs para simular escanear un QR:

- **Mesa 4**: `/m/MESA-04-RONDA`
- **Mesa 7**: `/m/MESA-07-RONDA`

### Opción 2: Flujo Completo Paso a Paso

1. **Ingresa a la mesa**
   - URL: `/m/MESA-04-RONDA`
   - Espera 1 segundo (simulación de lookup)

2. **Ingresa tu nombre**
   - Ejemplo: "Santiago García"
   - Haz clic en "Continuar"
   - Copia el enlace de recuperación (opcional)
   - Haz clic en "Ir al Menú"

3. **Explora el menú**
   - Cambia entre categorías
   - Haz clic en "Agregar" en cualquier plato

4. **Configura tu pedido**
   - Selecciona modificadores (ej: tipo de ají, punto del huevo)
   - Elige si es "Solo para mí" o "Para el centro"
   - Haz clic en "Agregar al pedido"

5. **Revisa tu carrito**
   - Haz clic en el botón flotante naranja (abajo derecha)
   - Ajusta cantidades con +/-
   - Haz clic en "Confirmar Pedido"

6. **Ver tu cuenta**
   - Haz clic en el ícono de recibo (arriba derecha)
   - Revisa el desglose de tu consumo

7. **Pagar**
   - Haz clic en "Pagar Cuenta"
   - Selecciona propina (10% es la opción popular)
   - Selecciona método de pago:
     - **Nequi/Daviplata**: Sigue las instrucciones, sube una imagen cualquiera como comprobante
     - **Efectivo/Tarjeta**: Espera confirmación automática
   - Descarga tu comprobante en PDF

## 📱 Características Técnicas

### Stack Utilizado
- **React 18** con TypeScript
- **React Router** para navegación multi-página
- **Context API** para estado global (sesión y carrito)
- **Tailwind CSS** para estilos
- **Lucide React** para íconos
- **jsPDF** para generación de comprobantes
- **Sonner** para notificaciones toast

### Datos Mock
Todos los datos son simulados:
- 2 mesas disponibles (MESA-04-RONDA, MESA-07-RONDA)
- 11 ítems de menú con fotos de Unsplash
- 4 categorías
- Métodos de pago: Nequi (3001234567), Daviplata (3009876543), Efectivo, Tarjeta

### Persistencia
- **LocalStorage**: La sesión del usuario se guarda localmente
- Si cierras el navegador, puedes volver usando el enlace de recuperación
- Los pedidos y pagos se simulan en memoria

## 🎨 Formato de Precios
Los precios se manejan en **centavos de COP** internamente:
- $12.000 COP = 1200000 centavos
- Se formatean automáticamente con `Intl.NumberFormat('es-CO')`

## 🔄 Flujo de División de Cuenta Compartida
En esta versión (Fase 1):
- Los ítems "Para el centro" se dividen **entre todos** los comensales de la mesa
- Simulación: División entre 3 personas (hardcoded)
- Cada persona ve su parte proporcional en "Consumo compartido"

## 📋 Limitaciones de la Demo

Esta es una **demo frontend-only**. NO incluye:
- ❌ Backend real (Fastify)
- ❌ Base de datos (Supabase)
- ❌ Autenticación real
- ❌ Tiempo real con Supabase Realtime
- ❌ Upload real de imágenes a Cloudinary
- ❌ Panel de administración (staff)
- ❌ Panel de meseros
- ❌ Múltiples usuarios simultáneos reales
- ❌ Validación de comprobantes por admin

## 🎯 Siguiente Paso

Para convertir esto en una aplicación real, necesitarías:

1. Configurar Supabase con el schema de base de datos
2. Crear el backend con Fastify
3. Implementar autenticación real
4. Conectar Cloudinary para upload de imágenes
5. Implementar Supabase Realtime para sincronización
6. Construir el panel de staff (admin y meseros)
7. Implementar RLS (Row Level Security) para multi-tenancy
8. Desplegar a Vercel (frontend) y Railway (backend)

---

## 💡 Tips para la Demostración

- Prueba agregar múltiples ítems al carrito
- Mezcla ítems personales y compartidos
- Prueba los modificadores con costo adicional (ej: Bandeja Paisa con extras)
- Descarga el comprobante PDF al final
- Observa cómo se genera el código de referencia único
- Prueba copiar el número de Nequi/Daviplata
- Revisa las notificaciones toast cuando confirmas pedidos

¡Disfruta la demo! 🎉
