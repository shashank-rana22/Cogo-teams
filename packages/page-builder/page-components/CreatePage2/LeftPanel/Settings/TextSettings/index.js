function TextSettings({ item, onChange }) {
	const { text, color, fontSize, fontWeight } = item;

	const handleTextChange = (e) => {
		onChange({ ...item, text: e.target.value });
	};

	const handleColorChange = (e) => {
		onChange({ ...item, color: e.target.value });
	};

	const handleFontSizeChange = (e) => {
		onChange({ ...item, fontSize: e.target.value });
	};

	const handleFontWeightChange = (e) => {
		onChange({ ...item, fontWeight: e.target.value });
	};

	return (
		<div>
			<div>Text Settings:</div>
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
				Font Size:
				<input type="range" min="12" max="72" value={fontSize} onChange={handleFontSizeChange} />
				<span>
					{fontSize}
					px
				</span>
			</label>
			<br />
			<label>
				Font Weight:
				<select value={fontWeight} onChange={handleFontWeightChange}>
					<option value="normal">Normal</option>
					<option value="bold">Bold</option>
				</select>
			</label>
		</div>
	);
}

export default TextSettings;
