import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useCart } from '../context/CartContext';
import { useSession } from '../context/SessionContext';
import { formatCOP } from '../data/mockData';
import { toast } from 'sonner';

interface CartDrawerProps {
  onClose: () => void;
}

export function CartDrawer({ onClose }: CartDrawerProps) {
  const navigate = useNavigate();
  const { qrCode } = useParams<{ qrCode: string }>();
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  const { updateUserTotals, currentUser } = useSession();

  const handleConfirm = () => {
    if (items.length === 0) return;

    // Calculate totals
    const personalTotal = items
      .filter((item) => item.tipo === 'personal')
      .reduce((sum, item) => {
        const modTotal = item.modificadores.reduce((s, m) => s + m.precio_extra, 0);
        return sum + (item.precio + modTotal) * item.cantidad;
      }, 0);

    const compartidoTotal = items
      .filter((item) => item.tipo === 'compartido')
      .reduce((sum, item) => {
        const modTotal = item.modificadores.reduce((s, m) => s + m.precio_extra, 0);
        return sum + (item.precio + modTotal) * item.cantidad;
      }, 0);

    // Update user totals
    if (currentUser) {
      updateUserTotals({
        total_personal: currentUser.total_personal + personalTotal,
        total_compartido: currentUser.total_compartido + compartidoTotal / 3, // Simulate division among 3 people
      });
    }

    // Clear cart and show confirmation
    clearCart();
    onClose();
    toast.success('¡Pedido confirmado! Tu orden está en camino');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50">
      <div className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl">Tu Pedido</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Tu carrito está vacío
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="mb-1">{item.nombre}</h3>
                      <div className="text-xs text-gray-600 mb-1">
                        {item.tipo === 'personal' ? '👤 Personal' : '🍽️ Compartido'}
                      </div>
                      {item.modificadores.length > 0 && (
                        <div className="text-sm text-gray-600 space-y-1">
                          {item.modificadores.map((mod, idx) => (
                            <div key={idx}>
                              • {mod.opcion}
                              {mod.precio_extra > 0 && (
                                <span className="text-xs ml-1">
                                  (+{formatCOP(mod.precio_extra)})
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 hover:bg-red-100 rounded text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.cantidad}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-orange-600">
                      {formatCOP(
                        (item.precio +
                          item.modificadores.reduce((s, m) => s + m.precio_extra, 0)) *
                          item.cantidad
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-xl text-orange-600">{formatCOP(subtotal)}</span>
            </div>
            <button
              onClick={handleConfirm}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Confirmar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
