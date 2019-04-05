import React from 'react';
import ProductsListing from '../common/ProductsListing';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { search } from '../../redux/actions/products';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      queryString: this.props.match.params.query || ''
    };
  }

  componentDidMount() {
    const query = this.state.queryString;
    this.props.search(query).then(() => {
      this.setState({
        isLoading: false
      });
    });
  }

  render() {
    if (this.props.products.items.length && !this.state.isLoading) {
      return (
        <div>
          <ProductsListing
            products={this.props.products.items}
            isAuthenticated={this.props.user.isAuthenticated}
            tableName={`Результаты поиска по запросу "${this.state.queryString}"`}
          />
        </div>
      );
    }

    if (!this.state.isLoading) {
      return (
        <h3 className="text-center mt-5">
          Ничего не найдено по запросу "{this.state.queryString}"
        </h3>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  products: state.products,
  user: state.user
});

const mapDispatchToProps = {
  search
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Search));

Search.propTypes = {
  products: PropTypes.object,
  search: PropTypes.func,
  match: PropTypes.object,
  user: PropTypes.object
};
