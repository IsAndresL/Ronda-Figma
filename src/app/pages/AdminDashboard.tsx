import { useState } from 'react';
import { 
  LayoutDashboard, 
  Utensils, 
  CreditCard, 
  Settings, 
  Users,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  ChefHat,
  Eye,
  X
} from 'lucide-react';
import { tables, mockOrders, mockPayments, menuItems, categories, formatCOP, Order, Payment, MenuItem, getDinersByTable } from '../data/mockData';

type TabType = 'overview' | 'orders' | 'payments' | 'menu' | 'tables';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [menuItemsState, setMenuItemsState] = useState<MenuItem[]>(menuItems);
  const [viewingReceipt, setViewingReceipt] = useState<string | null>(null);

  const handleApprovePayment = (paymentId: string) => {
    setPayments(prev =>
      prev.map(p => p.id === paymentId ? { ...p, estado: 'aprobado' as const } : p)
    );
  };

  const handleRejectPayment = (paymentId: string) => {
    setPayments(prev =>
      prev.map(p => p.id === paymentId ? { ...p, estado: 'rechazado' as const } : p)
    );
  };

  const handleToggleItemAvailability = (itemId: string) => {
    setMenuItemsState(prev =>
      prev.map(item => item.id === itemId ? { ...item, disponible: !item.disponible } : item)
    );
  };

  const tablesArray = Object.values(tables);
  const totalTables = tablesArray.length;
  const occupiedTables = tablesArray.filter(t => t.estado !== 'libre').length;
  const pendingPayments = payments.filter(p => p.estado === 'pendiente').length;
  const activeOrders = orders.filter(o => o.estado !== 'servido').length;

  const totalSales = payments
    .filter(p => p.estado === 'aprobado')
    .reduce((sum, p) => sum + p.monto, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl">Panel Administrador</h1>
              <p className="text-sm text-gray-600">La Mesa Redonda</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg">
              <ChefHat className="w-5 h-5" />
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <nav className="flex overflow-x-auto">
            <TabButton
              icon={<LayoutDashboard className="w-5 h-5" />}
              label="Resumen"
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            />
            <TabButton
              icon={<Utensils className="w-5 h-5" />}
              label="Pedidos"
              active={activeTab === 'orders'}
              onClick={() => setActiveTab('orders')}
              badge={activeOrders}
            />
            <TabButton
              icon={<CreditCard className="w-5 h-5" />}
              label="Pagos"
              active={activeTab === 'payments'}
              onClick={() => setActiveTab('payments')}
              badge={pendingPayments}
            />
            <TabButton
              icon={<ChefHat className="w-5 h-5" />}
              label="Menú"
              active={activeTab === 'menu'}
              onClick={() => setActiveTab('menu')}
            />
            <TabButton
              icon={<Users className="w-5 h-5" />}
              label="Mesas"
              active={activeTab === 'tables'}
              onClick={() => setActiveTab('tables')}
            />
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={<Users className="w-8 h-8 text-blue-600" />}
                label="Mesas Ocupadas"
                value={`${occupiedTables}/${totalTables}`}
                bgColor="bg-blue-50"
              />
              <StatCard
                icon={<Utensils className="w-8 h-8 text-orange-600" />}
                label="Pedidos Activos"
                value={activeOrders.toString()}
                bgColor="bg-orange-50"
              />
              <StatCard
                icon={<CreditCard className="w-8 h-8 text-purple-600" />}
                label="Pagos Pendientes"
                value={pendingPayments.toString()}
                bgColor="bg-purple-50"
              />
              <StatCard
                icon={<DollarSign className="w-8 h-8 text-green-600" />}
                label="Ventas Hoy"
                value={formatCOP(totalSales)}
                bgColor="bg-green-50"
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg mb-4">Actividad Reciente</h2>
              <div className="space-y-3">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium">Mesa {order.mesa_numero} - {order.comensal}</p>
                      <p className="text-sm text-gray-600">
                        {order.items.length} items • {formatCOP(order.total)}
                      </p>
                    </div>
                    <OrderStatusBadge estado={order.estado} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg">Gestión de Pedidos</h2>
            </div>
            <div className="divide-y">
              {orders.map((order) => (
                <div key={order.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Mesa {order.mesa_numero}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">{order.comensal}</span>
                      </div>
                      <p className="text-sm text-gray-500">{order.hora} • {order.fecha}</p>
                    </div>
                    <OrderStatusBadge estado={order.estado} />
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <div>
                          <span className="font-medium">{item.cantidad}x</span> {item.nombre}
                          {item.modificadores.length > 0 && (
                            <span className="text-gray-500 text-xs ml-2">
                              ({item.modificadores.join(', ')})
                            </span>
                          )}
                        </div>
                        <span className="text-gray-600">{formatCOP(item.precio * item.cantidad)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <span className="font-medium">Total: {formatCOP(order.total)}</span>
                    <div className="flex gap-2">
                      {order.estado === 'pendiente' && (
                        <button
                          onClick={() => setOrders(prev =>
                            prev.map(o => o.id === order.id ? { ...o, estado: 'en_preparacion' as const } : o)
                          )}
                          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
                        >
                          Iniciar Preparación
                        </button>
                      )}
                      {order.estado === 'en_preparacion' && (
                        <button
                          onClick={() => setOrders(prev =>
                            prev.map(o => o.id === order.id ? { ...o, estado: 'listo' as const } : o)
                          )}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                          Marcar Listo
                        </button>
                      )}
                      {order.estado === 'listo' && (
                        <button
                          onClick={() => setOrders(prev =>
                            prev.map(o => o.id === order.id ? { ...o, estado: 'servido' as const } : o)
                          )}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                        >
                          Marcar Servido
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg">Gestión de Pagos</h2>
            </div>
            <div className="divide-y">
              {payments.map((payment) => (
                <div key={payment.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Mesa {payment.mesa_numero}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">{payment.comensal}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {payment.hora} • {payment.fecha}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Ref: {payment.referencia}
                      </p>
                    </div>
                    <PaymentStatusBadge estado={payment.estado} />
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Método de pago</p>
                      <p className="font-medium capitalize">{payment.metodo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Monto</p>
                      <p className="text-xl font-medium text-green-600">{formatCOP(payment.monto)}</p>
                    </div>
                  </div>

                  {payment.comprobante_url && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Comprobante</p>
                      <button
                        onClick={() => setViewingReceipt(payment.comprobante_url!)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        Ver comprobante de pago
                      </button>
                    </div>
                  )}

                  {payment.estado === 'pendiente' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprovePayment(payment.id)}
                        className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Aprobar
                      </button>
                      <button
                        onClick={() => handleRejectPayment(payment.id)}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Rechazar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="space-y-6">
            {categories.filter(c => c.activa).map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-lg">{category.nombre}</h2>
                </div>
                <div className="divide-y">
                  {menuItemsState
                    .filter(item => item.categoria_id === category.id)
                    .map((item) => (
                      <div key={item.id} className="p-6 hover:bg-gray-50">
                        <div className="flex items-start gap-4">
                          {item.foto_url && (
                            <img 
                              src={item.foto_url} 
                              alt={item.nombre}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-medium">{item.nombre}</h3>
                                <p className="text-sm text-gray-600">{item.descripcion}</p>
                              </div>
                              <span className="font-medium text-green-600">{formatCOP(item.precio)}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-3">
                              <span className="text-sm text-gray-500">
                                Tiempo prep: {item.tiempo_prep_min} min
                              </span>
                              <button
                                onClick={() => handleToggleItemAvailability(item.id)}
                                className={`px-3 py-1 rounded-full text-sm ${
                                  item.disponible
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {item.disponible ? 'Disponible' : 'No disponible'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tables' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tablesArray.map((table) => (
              <div key={table.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium">Mesa {table.numero}</h3>
                    <p className="text-sm text-gray-500">{table.qr_codigo}</p>
                  </div>
                  <TableStatusBadge estado={table.estado} />
                </div>
                
                {table.comensales.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Comensales ({table.comensales.length})
                    </p>
                    <div className="space-y-2">
                      {table.comensales.map((comensal, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                            style={{ backgroundColor: comensal.color }}
                          >
                            {comensal.nombre.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                          </div>
                          <span className="text-sm">{comensal.nombre}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {table.estado !== 'libre' && (
                  <button
                    className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Cerrar Mesa
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Receipt Viewer Modal */}
      {viewingReceipt && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setViewingReceipt(null)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-medium">Comprobante de Pago</h3>
              <button
                onClick={() => setViewingReceipt(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <img 
                src={viewingReceipt} 
                alt="Comprobante" 
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TabButton({ 
  icon, 
  label, 
  active, 
  onClick, 
  badge 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors relative ${
        active
          ? 'border-orange-500 text-orange-600'
          : 'border-transparent text-gray-600 hover:text-gray-900'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  bgColor 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  bgColor: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-4">
        <div className={`${bgColor} p-3 rounded-lg`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-medium mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
}

function OrderStatusBadge({ estado }: { estado: Order['estado'] }) {
  const styles = {
    pendiente: 'bg-yellow-100 text-yellow-700',
    en_preparacion: 'bg-orange-100 text-orange-700',
    listo: 'bg-blue-100 text-blue-700',
    servido: 'bg-green-100 text-green-700',
  };

  const labels = {
    pendiente: 'Pendiente',
    en_preparacion: 'En preparación',
    listo: 'Listo',
    servido: 'Servido',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${styles[estado]}`}>
      {labels[estado]}
    </span>
  );
}

function PaymentStatusBadge({ estado }: { estado: Payment['estado'] }) {
  const styles = {
    pendiente: 'bg-yellow-100 text-yellow-700',
    aprobado: 'bg-green-100 text-green-700',
    rechazado: 'bg-red-100 text-red-700',
  };

  const labels = {
    pendiente: 'Pendiente',
    aprobado: 'Aprobado',
    rechazado: 'Rechazado',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${styles[estado]}`}>
      {labels[estado]}
    </span>
  );
}

function TableStatusBadge({ estado }: { estado: string }) {
  const styles = {
    libre: 'bg-green-100 text-green-700',
    ocupada: 'bg-blue-100 text-blue-700',
    pidiendo: 'bg-orange-100 text-orange-700',
    pagando: 'bg-purple-100 text-purple-700',
  };

  const labels = {
    libre: 'Libre',
    ocupada: 'Ocupada',
    pidiendo: 'Pidiendo',
    pagando: 'Pagando',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${styles[estado as keyof typeof styles]}`}>
      {labels[estado as keyof typeof labels]}
    </span>
  );
}