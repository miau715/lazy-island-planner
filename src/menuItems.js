import React from 'react';
import MenuBtn from './MenuBtn.js';

function MenuItems(props) {
  let menuItems, compareTarget;
  const type = props.currentTool;
  if (props.currentMode === 'draw') {
    menuItems = [...props.currentModeData.colors];
    compareTarget = 'colorName';
  }
  else {
    menuItems = [...props.currentModeData.tools.get(props.currentTool).items];
    compareTarget = 'item';
  }
  const listItems = menuItems.map((tool, i) =>
    <li key={i}>
      <MenuBtn data={tool[1]} type={type} isActive={tool[1][compareTarget] === props.currentItem} onClick={props.onClick} customColor={props.customColor} changeColor={props.changeColor} />
    </li>
  );
  return (
    <div className="menuItems">
      <hr />
      <ul>
        {listItems}
      </ul>
    </div>
  )
}

export default MenuItems;