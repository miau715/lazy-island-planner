import React from 'react';

function MenuBtn(props) {
  const id = props.data.mode || props.data.tool || props.data.item || props.data.colorName;
  let className;
  const isActive = props.isActive ? 'active' : '';
  if (props.data.colorName) {
    className = `color ${props.data.colorName} ${isActive}`;
  }
  else if (props.data.item) {
    className = `item ${props.type} ${props.data.item} ${isActive}`;
  }
  else {
    className = `${props.type} ${isActive}`;
  }
  if (props.data.image) {
    if (id === 'colorCustom') {
      return (
        <button id={id} onClick={props.onClick} className={className}>
          <label>
            <input type='color' defaultValue={props.customColor} onChange={props.changeColor} />
            <img alt={id} src={props.data.image} />
          </label>
        </button>
      )
    }
    else {
      if (props.type === 'tree') {
        const colorStyle = {background: props.data.color};
        return (
          <button id={id} onClick={props.onClick} className={className} style={colorStyle}>
            <img alt={id} src={props.data.image} />
          </button>
        )
      }
      else {
        return (
          <button id={id} onClick={props.onClick} className={className}>
            <img alt={id} src={props.data.image} />
          </button>
        )
      }
    }
  }
  else {
    let color;
    if (props.type === 'flower') {
      color = props.data.item;
    }
    else {
      color = props.data.color;
    }
    const colorStyle = {background: color};
    return (
      <button id={id} onClick={props.onClick} className={className}>
        <div className="colorBlock" style={colorStyle}></div>
      </button>
    )
  }
}

export default MenuBtn;