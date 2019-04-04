import React from 'react';
import './index.css';

export default function Table(props) {
  return (
    <div>
      <h2 className="text-center mt-5">Выберите марку автозапчастей:</h2>
      <div className="container mt-2 offset-md-4 col-sm-4 border">
        {props.brands.map(brand => {
          return (
            <div className="row border autoparts-brand" key={brand.id}>
              <a
                href="category"
                className="col-sm-12 d-flex justify-content-center align-items-center">
                <span className="brand-link">{brand.name}</span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
