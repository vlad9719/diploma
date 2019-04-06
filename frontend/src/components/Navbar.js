import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/user';
import { withRouter } from 'react-router-dom';
import logo from '../assets/logo.png';
import { search } from '../redux/actions/products';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const searchString = event.target.value;
    this.setState({
      searchString
    });
  }

  onLogout = () => this.props.logoutUser(this.props.history);
  onSearch = (event) => {
    this.props.search(this.props.history, this.state.searchString);
    event.preventDefault();
  };

  render() {
    let { isAuthenticated, userInfo } = this.props.user;
    let authLinks = (
      <ul className="navbar-nav ml-lg-5">
        <li className="nav-item dropdown cursor-pointer">
          <div
            className="nav-link dropdown-toggle active"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            {userInfo.name}
          </div>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to="/profile">
              Мой профиль
            </Link>
            <Link to="/orders" className="dropdown-item">
              Мои заказы
            </Link>
          </div>
        </li>
        <Link to="/cart" className="nav-link active">
          Корзина ({this.props.cart.items.length})
        </Link>
        <Link to="/" className="nav-link active" onClick={this.onLogout}>
          Выход
        </Link>
      </ul>
    );

    let guestLinks = (
      <ul className="navbar-nav mr-lg-4">
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
          <img src={logo} alt="ООО Ремавтоснаб" />
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
              <Link className="nav-link" to="/catalog">
                Каталог
              </Link>
            </li>
          </ul>
          <div className="navbar-text ml-auto mr-lg-4">
            Телефон:
            <a href="tel:8 (017)-380-23-72">8 (017)-380-23-72</a>
          </div>
          {isAuthenticated ? authLinks : guestLinks}
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-3"
              type="search"
              placeholder="Поиск запчасти"
              aria-label="Search"
              onChange={this.handleChange}
            />
            <button
              className="btn btn-outline-secondary my-2 my-sm-0"
              type="submit"
              onClick={this.onSearch}>
              Найти
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart
});

const mapDispatchToProps = {
  logoutUser,
  search
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object,
  search: PropTypes.func,
  cart: PropTypes.object
};
