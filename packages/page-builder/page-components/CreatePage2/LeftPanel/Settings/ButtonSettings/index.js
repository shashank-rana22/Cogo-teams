function ButtonSettings({ item, onChange }) {
	const { text, color, backgroundColor, fontSize, borderRadius } = item;

	const handleTextChange = (e) => {
		onChange({ ...item, text: e.target.value });
	};

	const handleColorChange = (e) => {
		onChange({ ...item, color: e.target.value });
	};

	const handleBackgroundColorChange = (e) => {
		onChange({ ...item, backgroundColor: e.target.value });
	};

	const handleFontSizeChange = (e) => {
		onChange({ ...item, fontSize: e.target.value });
	};

	const handleBorderRadiusChange = (e) => {
		onChange({ ...item, borderRadius: e.target.value });
	};

	return (
		<div>
			<div>Button Settings:</div>
			<label>
				Text:
				<input type="text" value={text} onChange={handleTextChange} />
			</label>
			<br />
			<label>
				Color:
				<input type="color" value={color} onChange={handleColorChange} />
			</label>
			<br />
			<label>
				Background Color:
				<input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
			</label>
			<br />
			<label>
				Font Size:
				<input type="range" min="12" max="72" value={fontSize} onChange={handleFontSizeChange} />
				<span>
					{fontSize}
					px
				</span>
			</label>
			<br />
			<label>
				Border Radius:
				<input type="range" min="0" max="50" value={borderRadius} onChange={handleBorderRadiusChange} />
				<span>
					{borderRadius}
					px
				</span>
			</label>
		</div>
	);
}

export default ButtonSettings;
