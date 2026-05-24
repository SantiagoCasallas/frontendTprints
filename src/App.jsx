import { Navigate, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage.jsx';
import DesignsPage from './pages/DesignsPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import CreateAccountPage from './pages/CreateAccountPage.jsx';
import DesignStudioPage from './pages/DesignStudioPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Header1 from './components/Header1.jsx';

// Nuevos componentes
import DesignGallery from './components/metaphors/DesignsGallery.jsx';
import DesignCatalog from './components/metaphors/DesignCatalog.jsx';
import DesignWorkshop from './components/metaphors/DesignWorkshop.jsx';

export default function App() {
  return (
    <Routes>
      {/* Redirección por defecto */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Otras rutas */}
      <Route path="/inicio" element={<HomePage />} />
      <Route path="/productos" element={<ProductsPage />} />
      
      {/* Nuevas vistas independientes de metáforas */}
      <Route path="/galeria" element={<DesignGallery />} />
      <Route path="/catalogo" element={<DesignCatalog />} />
      <Route path="/taller" element={<DesignWorkshop />} />

      {/* Rutas de otras páginas */}
      <Route path="/disenos" element={<DesignsPage />} />
      <Route path="/disenar" element={<DesignStudioPage />} />
      <Route path="/pedidos" element={<OrdersPage />} />
      <Route path="/perfil" element={<ProfilePage />} />
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<CreateAccountPage />} />
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}