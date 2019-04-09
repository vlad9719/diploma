import React from 'react';
import Table from './Table';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getBrands } from '../../redux/actions/brands';

class Catalog extends React.Component {
  componentDidMount() {
    this.props.getBrands();
  }

  render() {
    if (this.props.brands.items.length) {
      return <Table brands={this.props.brands.items} />;
    }

    return null;
  }
}

const mapStateToProps = state => ({
  brands: state.brands
});

const mapDispatchToProps = {
  getBrands
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Catalog));

Catalog.propTypes = {
  brands: PropTypes.object,
  getBrands: PropTypes.func
};
