import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/user';
import { withRouter } from 'react-router-dom';
import logo from '../assets/logo.png';

class Navbar extends Component {
  onLogout = () => this.props.logoutUser(this.props.history);

  render() {
    let { isAuthenticated, userInfo } = this.props.user;
    let authLinks = (
      <ul className="navbar-nav mr-0">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle active"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            {userInfo.name}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to="/">
              Мой профиль
            </Link>
            <Link to="/" className="dropdown-item">
              Мои заказы
            </Link>
          </div>
        </li>
        <Link to="/" className="nav-link active" onClick={this.onLogout}>
          Выход
        </Link>
      </ul>
    );

    let guestLinks = (
      <ul className="navbar-nav mr-0">
        <li className="nav-item">
          <Link className="nav-link active" to="/register">
            Регистрация
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/login">
            Вход
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img src={logo} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Главная
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Каталог
              </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0 ml-auto mr-5">
            <input
              className="form-control mr-sm-3"
              type="search"
              placeholder="Поиск запчасти"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-secondary my-2 my-sm-0"
              type="submit">
              Найти
            </button>
          </form>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
