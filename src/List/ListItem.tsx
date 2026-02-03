import React, { memo } from "react";
import "./List.css";

export type Item = {
  name: string;
  color: string;
};

type ListItemProps = {
  item: Item;
  isSelected: boolean;
  onClick: (name: string) => void;
};
function capitalizeWord(str: string) {
  return str
    .split(" ")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

const ListItem = memo(({ item, isSelected, onClick }: ListItemProps) => (
  <li
    key={item.name}
    className={`List__item List__item--${item.color} ${isSelected ? "selected" : ""}`}
    onClick={() => onClick(`${item.name}|${item.color}`)}
  >
    {isSelected ? capitalizeWord(item.name) : item.name}
  </li>
));

export default memo(ListItem);