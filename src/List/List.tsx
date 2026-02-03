import React, { Fragment, useState, useCallback, memo } from "react";
import "./List.css";
import ListItem, { type Item } from "./ListItem";

// Implement a feature to allow item selection with the following requirements:
// 1. Clicking an item selects/unselects it.
// 2. Multiple items can be selected at a time.
// 3. Make sure to avoid unnecessary re-renders of each list item in the big list (performance).
// 4. Currently selected items should be visually highlighted.
// 5. Currently selected items' names should be shown at the top of the page.
//
// Feel free to change the component structure at will.

type ListProps = {
  items: Item[];
};

const List = ({ items }: ListProps) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const toggleItemSelection = useCallback((itemName: string) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = new Set(prevSelectedItems);
      if (newSelectedItems.has(itemName)) {
        newSelectedItems.delete(itemName);
      } else {
        newSelectedItems.add(itemName);
      }
      return newSelectedItems;
    });
  }, []);
  return (
    <Fragment>
      {selectedItems.size > 0 ? (
        <div>
          <div className="title-text">Selected Items: </div>
          <div className="selected-items-container">
            {[...selectedItems].map((key) => {
              const [name, color] = key.split("|");
              return (
                <div
                  key={name}
                  className={`selected-item List__item List__item--${color}`}
                  onClick={() => toggleItemSelection(`${name}|${color}`)}
                >
                  {name}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="title-text">Click on items to select them</div>
      )}
      <ul className="List">
        {items.map((item) => (
          <ListItem
            key={item.name}
            item={item}
            isSelected={selectedItems.has(`${item.name}|${item.color}`)}
            onClick={toggleItemSelection}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default memo(List);
