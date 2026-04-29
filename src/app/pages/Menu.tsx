import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ShoppingCart, User, Receipt } from 'lucide-react';
import { useSession } from '../context/SessionContext';
import { useCart } from '../context/CartContext';
import { categories, menuItems, MenuItem as MenuItemType, formatCOP, Table } from '../data/mockData';
import { MenuItem } from '../components/MenuItem';
import { ModifierModal } from '../components/ModifierModal';
import { CartDrawer } from '../components/CartDrawer';
import { TableDiners } from '../components/TableDiners';
import { getSupabase } from '../lib/supabaseClient';

export function Menu() {
  const { qrCode } = useParams<{ qrCode: string }>();
  const navigate = useNavigate();
  const { currentUser, tableNumber } = useSession();
  const { addItem, totalItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [showCart, setShowCart] = useState(false);
  
  const [currentTable, setCurrentTable] = useState<Table | null>(null);

  useEffect(() => {
    if (!currentUser || !qrCode) {
      navigate(`/onboarding/${qrCode}`);
      return;
    }

    const fetchTable = async () => {
      const supabase = getSupabase();
      if (!supabase) return;
      const { data } = await supabase.from('tables').select('*').eq('qr_code', qrCode).maybeSingle();
      if (data) setCurrentTable(data as Table);
    };

    void fetchTable();
  }, [qrCode, currentUser, navigate]);

  if (!currentUser || !qrCode) {
    return null;
  }

  const filteredItems = menuItems.filter(
    (item) => item.categoria_id === selectedCategory
  );

  const handleAddItem = (item: MenuItemType) => {
    if (item.modificadores.length > 0 || true) { // Always show modal to select type
      setSelectedItem(item);
    }
  };

  const handleConfirmItem = (
    tipo: 'personal' | 'compartido',
    modificadores: { nombre_grupo: string; opcion: string; precio_extra: number }[]
  ) => {
    if (!selectedItem) return;

    const cartItem = {
      id: `${selectedItem.id}-${Date.now()}`,
      item_id: selectedItem.id,
      nombre: selectedItem.nombre,
      precio: selectedItem.precio,
      cantidad: 1,
      tipo,
      modificadores,
      foto_url: selectedItem.foto_url,
    };

    addItem(cartItem);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl">La Mesa Redonda</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/account/${qrCode}`)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Receipt className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4" />
                <span>{currentUser.nombre}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Mesa {tableNumber}</div>
            {currentTable?.comensales && (
              <TableDiners 
                diners={currentTable.comensales} 
                currentUserName={currentUser.nombre}
              />
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 px-4 pb-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <MenuItem key={item.id} item={item} onAdd={handleAddItem} />
          ))}
        </div>
        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No hay ítems en esta categoría
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 right-6 bg-orange-500 text-white rounded-full p-4 shadow-lg hover:bg-orange-600 transition-all hover:scale-110"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </div>
        </button>
      )}

      {/* Modifiers Modal */}
      {selectedItem && (
        <ModifierModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onConfirm={handleConfirmItem}
        />
      )}

      {/* Cart Drawer */}
      {showCart && <CartDrawer onClose={() => setShowCart(false)} />}
    </div>
  );
}
