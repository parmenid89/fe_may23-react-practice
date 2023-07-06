/* eslint-disable react/jsx-one-expression-per-line */
import cn from 'classnames';

export const PanelTabs = ({ products, user, handleUser, pickAllUsers }) => {
  const users = products.map(product => product.user.name);

  const uniqueUsersArr = [...new Set(users)];

  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        onClick={() => pickAllUsers()}
      >
        All
      </a>

      {uniqueUsersArr.map(us => (
        <a
          key={us}
          data-cy="FilterUser"
          href="#/"
          className={cn({ 'is-active': us === user })}
          onClick={() => handleUser(us)}
        >
          {us}
        </a>
      ))};
    </p>
  );
};
