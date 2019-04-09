import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './index.css';

export default function Table(props) {
  return (
    <div>
      <h2 className="text-center mt-5">Выберите ассортиментную группу:</h2>
      <div className="container mt-2 offset-sm-2 col-sm-8 my-3 d-flex flex-wrap">
        {props.categories.map(category => {
          return (
            <div
              className="border col-sm-12 col-md-6 col-12 col-lg-4 ml-0"
              key={category.id}>
              <Link
                to={`../products/${category.name}`}
                className="d-flex justify-content-center align-items-center">
                <span className="category-link text-center">
                  {`${category.id}. ${category.name}`}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Table.propTypes = {
  brand: PropTypes.string,
  categories: PropTypes.array
};
