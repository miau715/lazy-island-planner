import React from 'react';
import MenuBtn from './MenuBtn.js';

function MenuModes(props) {
  const toolData = props.toolData;
  const listItems = toolData.map((mode, i) =>
    <li key={i}>
      <MenuBtn data={mode} type='mode' isActive={props.currentMode === mode.mode} onClick={props.onClick} />
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

export default MenuModes;