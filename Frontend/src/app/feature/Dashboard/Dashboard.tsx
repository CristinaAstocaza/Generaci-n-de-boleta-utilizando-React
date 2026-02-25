import React from 'react';
import { Outlet } from 'react-router-dom';
import { SideNav } from '../SideNav/Sidenav';
import './Dashboard.scss';

export const Dashboard: React.FC = () => {
  return (
    <main className="container my-4 flex-grow-1">
      <div className="row g-4">
       
        <aside className="col-lg-3">
          <SideNav />
        </aside>

       
        <section className="col-lg-9">
          <div className="bg-white p-4 rounded shadow-sm">
            {/* Aquí se renderizan Tabla o Formulario según la ruta */}
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  );
};