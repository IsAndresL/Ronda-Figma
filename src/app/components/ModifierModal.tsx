import { useState } from 'react';
import { X } from 'lucide-react';
import { MenuItem, MenuModifier, formatCOP } from '../data/mockData';

interface SelectedModifier {
  nombre_grupo: string;
  opcion: string;
  precio_extra: number;
}

interface ModifierModalProps {
  item: MenuItem;
  onClose: () => void;
  onConfirm: (tipo: 'personal' | 'compartido', modificadores: SelectedModifier[]) => void;
}

export function ModifierModal({ item, onClose, onConfirm }: ModifierModalProps) {
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string>>({});
  const [tipo, setTipo] = useState<'personal' | 'compartido'>('personal');

  const handleModifierChange = (grupo: string, opcion: string) => {
    setSelectedModifiers((prev) => ({
      ...prev,
      [grupo]: opcion,
    }));
  };

  const handleConfirm = () => {
    const modifiers: SelectedModifier[] = [];
    
    item.modificadores.forEach((mod) => {
      const selected = selectedModifiers[mod.nombre_grupo];
      if (selected) {
        const opcionObj = mod.opciones.find((o) => o.texto === selected);
        if (opcionObj) {
          modifiers.push({
            nombre_grupo: mod.nombre_grupo,
            opcion: selected,
            precio_extra: opcionObj.precio_extra,
          });
        }
      }
    });

    // Check if all obligatory modifiers are selected
    const allObligatorySelected = item.modificadores
      .filter((mod) => mod.obligatorio)
      .every((mod) => selectedModifiers[mod.nombre_grupo]);

    if (!allObligatorySelected) {
      alert('Por favor selecciona todas las opciones obligatorias');
      return;
    }

    onConfirm(tipo, modifiers);
  };

  const totalExtras = Object.entries(selectedModifiers).reduce((sum, [grupo, opcion]) => {
    const mod = item.modificadores.find((m) => m.nombre_grupo === grupo);
    const opcionObj = mod?.opciones.find((o) => o.texto === opcion);
    return sum + (opcionObj?.precio_extra || 0);
  }, 0);

  const totalPrice = item.precio + totalExtras;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50">
      <div className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl">{item.nombre}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Modificadores */}
          {item.modificadores.map((mod) => (
            <div key={mod.id}>
              <h3 className="mb-3">
                {mod.nombre_grupo}
                {mod.obligatorio && <span className="text-red-500 ml-1">*</span>}
              </h3>
              <div className="space-y-2">
                {mod.opciones.map((opcion) => (
                  <label
                    key={opcion.texto}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={mod.nombre_grupo}
                        value={opcion.texto}
                        checked={selectedModifiers[mod.nombre_grupo] === opcion.texto}
                        onChange={() => handleModifierChange(mod.nombre_grupo, opcion.texto)}
                        className="w-4 h-4 text-orange-500"
                      />
                      <span>{opcion.texto}</span>
                    </div>
                    {opcion.precio_extra > 0 && (
                      <span className="text-sm text-gray-600">
                        +{formatCOP(opcion.precio_extra)}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Tipo de pedido */}
          <div>
            <h3 className="mb-3">¿Para quién es este pedido?</h3>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="tipo"
                    value="personal"
                    checked={tipo === 'personal'}
                    onChange={() => setTipo('personal')}
                    className="w-4 h-4 text-orange-500"
                  />
                  <div>
                    <div>Solo para mí</div>
                    <div className="text-sm text-gray-500">Se sumará a tu cuenta personal</div>
                  </div>
                </div>
              </label>
              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="tipo"
                    value="compartido"
                    checked={tipo === 'compartido'}
                    onChange={() => setTipo('compartido')}
                    className="w-4 h-4 text-orange-500"
                  />
                  <div>
                    <div>Para el centro</div>
                    <div className="text-sm text-gray-500">Se dividirá entre todos</div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">Total:</span>
            <span className="text-xl text-orange-600">{formatCOP(totalPrice)}</span>
          </div>
          <button
            onClick={handleConfirm}
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Agregar al pedido
          </button>
        </div>
      </div>
    </div>
  );
}
