import React from 'react';
import MenuBtn from './MenuBtn.js';

function MenuModes(props) {
  const toolData = [...props.toolData];
  const listItems = toolData.map((tool, i) =>
    <li key={i}>
      <MenuBtn data={tool[1]} type='mode' isActive={props.currentMode === tool[1].mode} onClick={props.onClick} />
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

export default MenuModes;