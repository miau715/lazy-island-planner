import React from 'react';
import MenuBtn from './menuBtn.js';

function MenuTools(props) {
  const listItems = props.currentModeData.tools.map((tool, i) =>
    <li key={i}>
      <MenuBtn data={tool} type='tool' isActive={props.currentTool === tool.tool} onClick={props.onClick} />
    </li>
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

export default MenuTools;