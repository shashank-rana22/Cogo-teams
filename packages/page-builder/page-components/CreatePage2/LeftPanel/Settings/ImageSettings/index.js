function ImageSettings({ item, onChange }) {
	const { src, alt, width, height } = item;

	const handleSrcChange = (e) => {
		onChange({ ...item, src: e.target.value });
	};

	const handleAltChange = (e) => {
		onChange({ ...item, alt: e.target.value });
	};

	const handleWidthChange = (e) => {
		onChange({ ...item, width: e.target.value });
	};

	const handleHeightChange = (e) => {
		onChange({ ...item, height: e.target.value });
	};

	return (
		<div>
			<div>Image Settings:</div>
			<label>
				Source:
				<input type="text" value={src} onChange={handleSrcChange} />
			</label>
			<br />
			<label>
				Alt:
				<input type="text" value={alt} onChange={handleAltChange} />
			</label>
			<br />
			<label>
				Width:
				<input type="range" min="50" max="800" value={width} onChange={handleWidthChange} />
				<span>
					{width}
					px
				</span>
			</label>
			<br />
			<label>
				Height:
				<input type="range" min="50" max="800" value={height} onChange={handleHeightChange} />
				<span>
					{height}
					px
				</span>
			</label>
		</div>
	);
}

export default ImageSettings;
