import React from 'react';

interface ListProps {
  items: string[] | null;
  onItemSelect: (item: string) => void;
  selectedItem: string | null;
}

const List: React.FC<ListProps> = ({ items, onItemSelect, selectedItem }) => {
  if (!items || items.length === 0) {
    return <div>事務局</div>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map((item, index) => (
        <li
          key={index}
          onClick={() => onItemSelect(item)}
          style={{
            padding: '10px',
            margin: '5px 0',
            backgroundColor: 'white',
            border: '1px solid black',
            borderRadius: '5px',
            cursor: 'pointer',
            // background: selectedItem === item ? 'lightblue' : 'white',
            color: 'black',
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default List;
