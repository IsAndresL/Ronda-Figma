import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { SessionProvider } from './context/SessionContext';
import { Toaster } from 'sonner';
import { WaiterAuthProvider } from './context/WaiterAuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

function App() {
  return (
    <SessionProvider>
      <AdminAuthProvider>
        <WaiterAuthProvider>
          <CartProvider>
            <RouterProvider router={router} />
            <Toaster position="top-center" richColors />
          </CartProvider>
        </WaiterAuthProvider>
      </AdminAuthProvider>
    </SessionProvider>
  );
}

export default App;