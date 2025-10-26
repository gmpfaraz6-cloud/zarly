import './Menus.css';

function Menus() {
  const menus = [
    {
      name: 'Main menu',
      items: 'BEST SELLING, Featured Products, Contact, SUMMER COLLECTION, WINTER COLLECTION'
    },
    {
      name: 'Footer menu',
      items: 'Search'
    },
    {
      name: 'Customer account main menu',
      items: 'Shop, Orders'
    }
  ];

  return (
    <div className="menus-page">
      <div className="menus-content">
        <table className="menus-table">
          <thead>
            <tr>
              <th>Menu <span className="sort-icon">▼</span></th>
              <th>Menu items</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, idx) => (
              <tr key={idx}>
                <td className="menu-name-cell">
                  <a href="#" className="menu-name-link">{menu.name}</a>
                </td>
                <td className="menu-items-cell">{menu.items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Menus;

