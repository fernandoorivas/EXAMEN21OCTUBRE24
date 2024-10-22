import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api-menu-9b5g.onrender.com/menu');
        const result = await response.json();
        setMenuItems(result);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const AgregarCarrito = (item) => {
    setOrderItems([...orderItems, item]);
  };

  const handlePayment = () => {
    alert('Pago Realizado');
    setOrderItems([]); 
  };

  const total = orderItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h1>Menú</h1>
      {loading ? (
        <p>Cargando menú...</p>
      ) : (
        <div className="menu-container">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item">
              <strong>{item.name}</strong> - <strong>${item.price}</strong>
              <button className="agregar-boton" onClick={() => AgregarCarrito(item)}>Agregar</button>
            </div>
          ))}
        </div>
      )}
      
      <h2>Orden Actual</h2>
      <div className="cart-container">
        {orderItems.map((item, index) => (
          <div key={index} className="cart-item">
            <strong>{item.name}</strong> - <strong>${item.price}</strong>
          </div>
        ))}
      </div>

      <h3>Total: ${total}</h3>
      <button className="agregar-boton" onClick={handlePayment}>Pagar</button>
    </div>
  );
};

export default App;

/* ¿Qué sucede si se pasa una lista vacía como segundo argumento en useEffect?

El efecto se ejecuta solo una vez al montar el componente.*/