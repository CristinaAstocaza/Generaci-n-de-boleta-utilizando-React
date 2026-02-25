import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './app/shared/Header/Header';
import Footer from './app/shared/Footer/Footer';
import Inicio from './app/feature/inicio/Inicio';
import { Dashboard } from './app/feature/Dashboard/Dashboard';
import { Tabla } from './app/feature/Tabla/Tabla';
import { Formulario } from './app/feature/Formulario/Formulario';
import { AuthPage } from './app/feature/AuthPage/AuthPage';

// Importar Guards
import { ProtectedRoute } from './app/core/guards/ProtectedRoute';
import { PublicRoute } from './app/core/guards/ProtectedRoute';

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
         
          <Route
            path="/"
            element={
              <PublicRoute>
                <Inicio />
              </PublicRoute>
            }
          />

          <Route
            path="/autenticacion"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/*MANDA URL A SUS HIJOS PERO POR DEFECTO SALE LA TABLA DE BOLETAS */}
            <Route index element={<Navigate to="tabla-boletas" replace />} />

            
            <Route path="tabla-boletas" element={<Tabla />} />
            <Route path="formulario-boletas" element={<Formulario />} />

            
            <Route path="*" element={<div>Página no encontrada en Dashboard</div>} />
          </Route>

          {/* RUTA GLOBAL POR SI SE PONE OTRO ENLACE */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;