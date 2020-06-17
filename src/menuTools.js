import React from 'react';
import MenuBtn from './MenuBtn.js';

function MenuTools(props) {
  const listItems = [...props.currentModeData.tools].map((tool, i) =>
    <li key={i}>
      <MenuBtn data={tool[1]} type='tool' isActive={props.currentTool === tool[1].tool} onClick={props.onClick} />
    </li>
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

export default MenuTools;