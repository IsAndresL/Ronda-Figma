import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { tables } from '../data/mockData';
import { Loader2 } from 'lucide-react';

export function TableLanding() {
  const { qrCode } = useParams<{ qrCode: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate QR code lookup
    setTimeout(() => {
      if (qrCode && tables[qrCode as keyof typeof tables]) {
        navigate(`/onboarding/${qrCode}`);
      } else {
        navigate('/*');
      }
    }, 1000);
  }, [qrCode, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 to-orange-600 flex items-center justify-center p-4">
      <div className="text-center text-white">
        <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" />
        <h1 className="text-2xl mb-2">Bienvenido a Ronda</h1>
        <p className="text-orange-100">Cargando tu mesa...</p>
      </div>
    </div>
  );
}
