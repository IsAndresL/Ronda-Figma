import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSession } from '../context/SessionContext';
import { tables } from '../data/mockData';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';
import { TableDiners } from '../components/TableDiners';

export function Onboarding() {
  const { qrCode } = useParams<{ qrCode: string }>();
  const navigate = useNavigate();
  const { setSession } = useSession();
  const [nombre, setNombre] = useState('');
  const [showRecoveryUrl, setShowRecoveryUrl] = useState(false);
  const [copied, setCopied] = useState(false);

  const table = qrCode ? tables[qrCode as keyof typeof tables] : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !qrCode || !table) return;

    // Simulate creating session
    const mockToken = `mock_jwt_${Date.now()}`;
    const mockUser = {
      id: `user-${Date.now()}`,
      nombre: nombre.trim(),
      estado_pago: 'pendiente' as const,
      total_personal: 0,
      total_compartido: 0,
      total_propina: 0,
      total_abonado: 0,
    };

    setSession(mockToken, mockUser, qrCode, table.numero);
    setShowRecoveryUrl(true);
  };

  const recoveryUrl = `${window.location.origin}/m/${qrCode}?token=${showRecoveryUrl ? 'mock_jwt' : ''}`;

  const handleCopy = () => {
    copyToClipboard(recoveryUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContinue = () => {
    navigate(`/table/${qrCode}`);
  };

  if (!table) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl mb-2">Mesa no encontrada</h1>
          <p className="text-gray-600">El código QR no es válido</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 to-orange-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2">La Mesa Redonda</h1>
            <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full">
              Mesa {table.numero}
            </div>
            {table.comensales && table.comensales.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Comensales en la mesa:</p>
                <div className="flex justify-center">
                  <TableDiners diners={table.comensales} />
                </div>
              </div>
            )}
          </div>

          {!showRecoveryUrl ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="nombre" className="block text-sm mb-2 text-gray-700">
                  ¿Cuál es tu nombre?
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  placeholder="Escribe tu nombre"
                  autoFocus
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Continuar
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 mb-3">
                  <strong>Guarda este enlace</strong> para volver si cierras el navegador:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={recoveryUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-blue-300 rounded text-sm"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Ir al Menú
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-white text-sm mt-4">
          Bienvenido, {nombre || 'invitado'}
        </p>
      </div>
    </div>
  );
}