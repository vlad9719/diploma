import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default function Form(props) {
  return (
    <form
      className="mt-5 mb-5 offset-sm-2 offset-md-3 offset-lg-4 col-sm-8 col-md-6 col-lg-4 border"
      onChange={props.handleChange}>
      <h2 className="text-center mt-3 mb-3">Регистрация</h2>
      <div className="form-group">
        <label htmlFor="name">Ваше имя:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Имя"
          title="Пожалуйста, введите Ваше настоящее имя"
          required
        />
        {props.errors.name && (
          <span className="text-danger">{props.errors.name}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="organization">Ваша организация:</label>
        <input
          type="text"
          className="form-control"
          id="organization"
          placeholder="Организация"
          title="Пожалуйста, введите организацию, в которой Вы работаете"
        />
        {props.errors.organization && (
          <span className="text-danger">{props.errors.organization}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="phone">Ваш номер телефона:</label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          placeholder="Телефон"
          pattern=".{9}"
          title="Пожалуйста, введите 9 цифр Вашего телефона"
          aria-describedby="phoneHelp"
        />
        {props.errors.phone && (
          <span className="text-danger">{props.errors.phone}</span>
        )}
        <span id="phoneHelp" className="form-text text-muted">
          Введите последние 9 цифр Вашего телефона
        </span>
      </div>
      <div className="form-group">
        <label htmlFor="email">Ваш E-mail:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Email"
          title="Пожалуйста, введите корректный email-адрес"
          aria-describedby="emailHelp"
        />
        {props.errors.email && (
          <span className="text-danger">{props.errors.email}</span>
        )}
        <span id="emailHelp" className="form-text text-muted">
          Введите рабочий email-адрес
        </span>
      </div>
      <div className="form-group">
        <label htmlFor="password">Придумайте пароль:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          minLength="8"
          placeholder="Пароль"
          aria-describedby="passwordHelp"
          title="Пароль должен содержать не менее 8 символов. Допускаются только буквы латинского алфавита, цифры и знаки"
        />
        {props.errors.password && (
          <span className="text-danger">{props.errors.password}</span>
        )}
        <span id="passwordHelp" className="form-text text-muted">
          Пароль должен содержать не менее 8 символов. Допускаются только буквы
          латинского алфавита, цифры и знаки
        </span>
      </div>
      <button
        type="button"
        className="btn btn-primary col-sm-12 mb-3"
        onClick={props.handleSubmit}>
        Подтвердить
      </button>
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  errors: PropTypes.object
};
