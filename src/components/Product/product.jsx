/* eslint-disable jsx-a11y/accessible-emoji */
import cn from 'classnames';

export const Product = ({ product }) => (
  <tr data-cy="Product">
    <td className="has-text-weight-bold" data-cy="ProductId">
      {product.id}
    </td>

    <td data-cy="ProductName">{product.name}</td>
    <td data-cy="ProductCategory">{`${product.category.icon} - ${product.category.title}`}</td>

    <td
      data-cy="ProductUser"
      className={cn({
        'has-text-link': product.user.sex === 'f',
        'has-text-danger': product.user.sex === 'm',
      })}
    >
      {product.user.name}
    </td>
  </tr>
);
