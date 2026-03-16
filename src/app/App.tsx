import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { SessionProvider } from './context/SessionContext';
import { Toaster } from 'sonner';

function App() {
  return (
    <SessionProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" richColors />
      </CartProvider>
    </SessionProvider>
  );
}

export default App;