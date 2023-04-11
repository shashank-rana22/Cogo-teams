import React, { useCallback } from 'react';

function ButtonSettings({ item }) {
	const handleChange = useCallback((key, value) => {
		console.log(`Setting ${key} to ${value}`);
	}, []);

	const settings = [
		{ label: 'Text', key: 'text' },
		{ label: 'Background Color', key: 'backgroundColor', type: 'color' },
		{ label: 'Text Color', key: 'color', type: 'color' },
		{
			label   : 'Border Style',
			key     : 'borderStyle',
			type    : 'select',
			options : ['none', 'solid', 'dashed', 'dotted'],
		},
		{
			label : 'Border Width',
			key   : 'borderWidth',
			type  : 'number',
		},
		{
			label : 'Border Color',
			key   : 'borderColor',
			type  : 'color',
		},
		{
			label : 'Border Radius',
			key   : 'borderRadius',
			type  : 'number',
		},
		{
			label   : 'Font Weight',
			key     : 'fontWeight',
			type    : 'select',
			options : ['normal', 'bold'],
		},
		{
			label : 'Font Size',
			key   : 'fontSize',
			type  : 'number',
		},
		{
			label   : 'Text Align',
			key     : 'textAlign',
			type    : 'select',
			options : ['left', 'center', 'right', 'justify'],
		},
		{
			label : 'Padding',
			key   : 'padding',
			type  : 'number',
		},
		{
			label : 'Margin',
			key   : 'margin',
			type  : 'number',
		},
	];

	const handleInputChange = useCallback((e, key) => {
		const { value } = e.target;
		handleChange(key, value);
	}, [handleChange]);

	const handleSelectChange = useCallback((value, key) => {
		handleChange(key, value);
	}, [handleChange]);

	return (
		<div className="container">
			{settings.map(({ label, key, type, options }) => (
				<div
					key={key}
					style={{
						margin         : '8px 0',
						padding        : '8px',
						display        : 'flex',
						justifyContent : 'space-between',
					}}
				>
					<div style={{ marginRight: '8px' }}>{label}</div>
					{type === 'select' ? (
						<select
							value={item[key]}
							onChange={(e) => handleSelectChange(e.target.value, key)}
							style={{ width: '200px' }}
						>
							{options.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
					) : (
						<input
							value={item[key]}
							type={type || 'text'}
							style={{ width: '200px' }}
							onChange={(e) => handleInputChange(e, key)}
						/>
					)}
				</div>
			))}
		</div>
	);
}

export default ButtonSettings;
