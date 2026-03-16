import { QrCode, ArrowRight, ChefHat, Users } from 'lucide-react';
import { useNavigate } from 'react-router';

export function Home() {
  const navigate = useNavigate();

  const mesas = [
    { qr: 'qr-mesa-4', numero: '4', estado: 'Disponible' },
    { qr: 'qr-mesa-7', numero: '7', estado: 'Disponible' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-red-600">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center text-white mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
              <QrCode className="w-10 h-10" />
            </div>
            <h1 className="text-5xl mb-4">RONDA</h1>
            <p className="text-xl text-orange-100 mb-2">Sistema de Pedidos para Restaurantes</p>
            <p className="text-orange-200">Demo del Flujo del Cliente - Fase 1 MVP</p>
          </div>

          {/* Staff Access */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => navigate('/admin')}
              className="bg-white rounded-xl shadow-2xl p-6 hover:shadow-xl transition-all hover:scale-105 group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-4 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <ChefHat className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-xl font-medium mb-1">Panel Administrador</h3>
                  <p className="text-sm text-gray-600">Gestionar menú, pagos y mesas</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => navigate('/waiter')}
              className="bg-white rounded-xl shadow-2xl p-6 hover:shadow-xl transition-all hover:scale-105 group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-xl font-medium mb-1">Panel Camarero</h3>
                  <p className="text-sm text-gray-600">Ver comandas y cobrar</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-2xl mb-6 text-center">Funcionalidades Incluidas</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <div className="font-medium">QR & Onboarding</div>
                  <div className="text-sm text-gray-600">Ingreso rápido con nombre</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <div className="font-medium">Menú Interactivo</div>
                  <div className="text-sm text-gray-600">Categorías y modificadores</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <div className="font-medium">Pedidos Personal/Compartido</div>
                  <div className="text-sm text-gray-600">División automática de cuenta</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <div className="font-medium">Estado de Cuenta</div>
                  <div className="text-sm text-gray-600">Desglose en tiempo real</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <div className="font-medium">Pago Digital</div>
                  <div className="text-sm text-gray-600">Nequi, Daviplata, Efectivo, Tarjeta</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <div className="font-medium">Comprobante PDF</div>
                  <div className="text-sm text-gray-600">Descarga instantánea</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm mb-2 text-blue-900">💡 Cómo Probar</h3>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Selecciona una mesa abajo</li>
                <li>Ingresa tu nombre</li>
                <li>Explora el menú y agrega platos</li>
                <li>Confirma tu pedido</li>
                <li>Revisa tu cuenta y paga</li>
                <li>Descarga tu comprobante</li>
              </ol>
            </div>
          </div>

          {/* Mesas Disponibles */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl mb-6 text-center">Selecciona una Mesa para Empezar</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {mesas.map((mesa) => (
                <button
                  key={mesa.qr}
                  onClick={() => navigate(`/m/${mesa.qr}`)}
                  className="group bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all hover:scale-105 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-left">
                      <div className="text-sm text-orange-100">Mesa</div>
                      <div className="text-3xl">{mesa.numero}</div>
                    </div>
                    <QrCode className="w-12 h-12 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                      {mesa.estado}
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center text-white mt-8">
            <p className="text-sm text-orange-100 mb-2">
              🍽️ La Mesa Redonda - Restaurante Demo
            </p>
            <p className="text-xs text-orange-200">
              Esta es una demostración del flujo del cliente. Los datos son simulados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}