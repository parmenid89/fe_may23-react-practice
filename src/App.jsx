import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { ProductList } from './components/ProductList/ProductList';
import { PanelTabs } from './components/PanelTabs/PanelTabs';

const products = productsFromServer.map((product) => {
  // eslint-disable-next-line
  const category = categoriesFromServer.find(category => category.id === product.categoryId);
  // eslint-disable-next-line
  const user = usersFromServer.find(user => user.id === category.ownerId);

  return { ...product, category, user };
});

export const App = () => {
  const [user, setUser] = useState('');
  const [query, setQuery] = useState('');

  function normalizeText(text) {
    return text.toLowerCase().trim();
  }

  function filteredList() {
    let filteredProductsArr = [...products];
    // eslint-disable-next-line
    const filteredUsers = products.filter(product => product.user.name === user);

    if (filteredUsers.length > 0) {
      filteredProductsArr = [...filteredUsers];
    }

    if (query !== '') {
      // eslint-disable-next-line
      filteredProductsArr = filteredProductsArr.filter(product => normalizeText(product.name).includes(normalizeText(query)));
    }

    return filteredProductsArr;
  }

  const filteredProducts = filteredList();

  const handleUser = (userName) => {
    setUser(userName);
  };

  const handleInput = (Value) => {
    setQuery(Value);
  };

  const clearValue = () => {
    setQuery('');
  };

  const pickAllUsers = () => {
    setUser('');
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>
            <PanelTabs
              products={products}
              user={user}
              handleUser={handleUser}
              pickAllUsers={pickAllUsers}
            />
            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={e => handleInput(e.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {query && (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={clearValue}
                    />
                  )}
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  clearValue();
                  pickAllUsers();
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {(filteredProducts.length === 0) && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              {!((filteredProducts.length === 0) && query) && (
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      ID

                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Product

                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-down" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Category

                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-up" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      User

                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>
                </tr>
              )}

            </thead>

            <tbody>
              <ProductList
                products={filteredProducts}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
