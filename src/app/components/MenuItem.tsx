import { Clock } from 'lucide-react';
import { MenuItem as MenuItemType } from '../data/mockData';
import { formatCOP } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MenuItemProps {
  item: MenuItemType;
  onAdd: (item: MenuItemType) => void;
}

export function MenuItem({ item, onAdd }: MenuItemProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${!item.disponible ? 'opacity-60' : ''}`}>
      <div className="relative h-40">
        <ImageWithFallback
          src={item.foto_url}
          alt={item.nombre}
          className="w-full h-full object-cover"
        />
        {!item.disponible && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white px-3 py-1 bg-red-500 rounded-full text-sm">
              Agotado
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="mb-1">{item.nombre}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.descripcion}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-600">{formatCOP(item.precio)}</p>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <Clock className="w-3 h-3" />
              <span>{item.tiempo_prep_min} min</span>
            </div>
          </div>
          <button
            onClick={() => onAdd(item)}
            disabled={!item.disponible}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
