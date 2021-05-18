import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
	const [value, setColor] = useState('#db3e00');
	const colors = [
		{ name: 'red', color: '#db3e00' },
		{ name: 'yellow', color: '#fccb00' },
		{ name: 'green', color: '#008b02' },
		{ name: 'blue', color: '#1273de' },
	] 
	const handleChangeColor = newValue => {
		setColor(newValue);
  };
	return (
		<div className="wrapper">
			<ColorPicker value={value} colors={colors} onChange={handleChangeColor}  />
		</div>
	);
}
const ColorPicker = ({value, colors, onChange}) => {
  const [showHideBlock, setShowHideBlock] = useState('hide');
	return(
		<div className="color-picker">
			<span className="current-color-name">{value}</span>
			<div className="controls">
				<div>
					<span className="default-color" style={{backgroundColor: `${value}`}} onClick={() => setShowHideBlock(showHideBlock == 'show-sliders' ? 'hide' : 'show-sliders')} ></span>
				</div>
				<div>
					<span className="arrow" onClick={() => setShowHideBlock(showHideBlock == 'show-colors' ? 'hide' : 'show-colors')} ></span>
				</div>
			</div>
			{showHideBlock == 'show-colors' ? <DefaultColors value={value} colorsArr={colors} handleChangeColor={onChange} setShowHideBlock={setShowHideBlock} showHideBlock={showHideBlock} /> : null}
			{showHideBlock == 'show-sliders' ? <Sliders value={value} handleChangeColor={onChange} setShowHideBlock={setShowHideBlock} showHideBlock={showHideBlock} /> : null}
		</div>
	)
}

const DefaultColors = ({value, colorsArr, handleChangeColor, setShowHideBlock, showHideBlock}) => {
	const colors = colorsArr;
	const colorItems = colors.map((item) => 
		<div className={item.color == value ? 'active' : ''} key={item.color} onClick={() => {handleChangeColor(item.color);setShowHideBlock(showHideBlock == 'show-colors' ? 'hide' : 'show-colors')}} >
			<span className="name">{item.name}</span>
			<span className="color" style={{backgroundColor: `${item.color}`}}></span>
		</div>
	);
	return (
		<div className="container-default-colors">
			{colorItems}
		</div>
  )
}

const hexToRGB = (value) => {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
	return result ? {
		red: parseInt(result[1], 16),
		green: parseInt(result[2], 16),
		blue: parseInt(result[3], 16)
	} : null;
}

const rgbToHex = (r, g, b) => {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

const Sliders = ({value, handleChangeColor, setShowHideBlock, showHideBlock}) => {
	let rgb = hexToRGB(value);
	const [newColorValue, setNewValue] = useState(value);
	const handleNewValue = newColor => {
		console.log(newColor);
		
		setNewValue(newColor);
  };
	return (
			<div className="sliders">
				<div className="red">
					<label>
						R
					</label>
					<input id="red" type="range" 
						min="0" 
						max="255" 
						steps="1" 
						value={rgb.red} 
						onChange={e => handleNewValue(rgbToHex(e.target.value, rgb.green, rgb.blue))}
					/>
				</div>
				<div className="green">
					<label>
						G
					</label>
					<input id="green" type="range" 
						min="0" 
						max="255" 
						steps="1" 
						value={rgb.green} 
						onChange={e => handleNewValue(rgbToHex(rgb.red, e.target.value, rgb.blue))} 
					/>
				</div>
				
				<div className="blue">
					<label>
						B
					</label>
					<input id="blue" type="range"  
						min="0" 
						max="255" 
						steps="1" 
						value={rgb.blue} 
						onChange={e => handleNewValue(rgbToHex(rgb.red, rgb.green, Number(e.target.value)))} 
					/>
				</div>
				<button onClick={() => { handleChangeColor(newColorValue); setShowHideBlock(showHideBlock == 'show-sliders' ? 'hide' : 'show-sliders');}}>OK</button>
				<button onClick={() => {handleChangeColor(value); setShowHideBlock(showHideBlock == 'show-sliders' ? 'hide' : 'show-sliders')}}>Cancel</button>
		</div>
	)
}



export default App;