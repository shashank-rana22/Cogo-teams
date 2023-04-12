import React, { useCallback } from 'react';

import styles from './styles.module.css';

const settings = [
	{ label: 'Background Color', key: 'background-color', type: 'color' },
	{ label: 'Border Color', key: 'border-color', type: 'color' },
	{ label: 'Border Width', key: 'border-width', type: 'number' },
	{
		label   : 'Border Style',
		key     : 'border-style',
		type    : 'select',
		options : ['none', 'solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset'],
	},
	{
		label : 'Box Shadow',
		key   : 'box-shadow',
		type  : 'text',
	},
	{
		label   : 'Display',
		key     : 'display',
		type    : 'select',
		options : ['block', 'inline', 'inline-block', 'flex', 'grid', 'none'],
	},
	{
		label : 'Height',
		key   : 'height',
		type  : 'number',
	},
	{
		label : 'Width',
		key   : 'width',
		type  : 'number',
	},
	{
		label   : 'Flex Direction',
		key     : 'flex-direction',
		type    : 'select',
		options : ['row', 'row-reverse', 'column', 'column-reverse'],
	},
	{
		label : 'Flex Grow',
		key   : 'flex-grow',
		type  : 'number',
	},
	{
		label : 'Flex Shrink',
		key   : 'flex-shrink',
		type  : 'number',
	},
	{
		label : 'Flex Basis',
		key   : 'flex-basis',
		type  : 'number',
	},
	{
		label   : 'Align Items',
		key     : 'align-items',
		type    : 'select',
		options : ['stretch', 'center', 'flex-start', 'flex-end', 'baseline'],
	},
	{
		label   : 'Align Content',
		key     : 'align-content',
		type    : 'select',
		options : ['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around'],
	},
	{
		label   : 'Align Self',
		key     : 'align-self',
		type    : 'select',
		options : ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
	},
	{
		label   : 'Justify Content',
		key     : 'justify-content',
		type    : 'select',
		options : ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
	},
	{
		label : 'Margin',
		key   : 'margin',
		type  : 'number',
	},
	{
		label : 'Padding',
		key   : 'padding',
		type  : 'number',
	},
];

function DivSettings(props) {
	const { component, setComponent } = props;

	const handleChange = useCallback((key, value) => {
		setComponent((prev) => ({
			...prev,
			style: {
				...component.style,
				[key]: value,
			},

		}));
	}, []);

	const handleInputChange = useCallback((e, key) => {
		const { value } = e.target;

		handleChange(key, value);
	}, [handleChange]);

	const handleSelectChange = useCallback((value, key) => {
		handleChange(key, value);
	}, [handleChange]);

	return (
		<div className={styles.container}>

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
					<label htmlFor={key}>{label}</label>
					{type === 'select' ? (
						<select
							style={{ width: '120px' }}
							id={key}
							name={key}
							onChange={(e) => handleSelectChange(e.target.value, key)}
						>
							{options.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
					) : (
						<input
							style={{ width: '120px' }}
							type={type}
							id={key}
							name={key}
							onChange={(e) => handleInputChange(e, key)}
						/>

					)}
				</div>
			))}

		</div>
	);
}

export default DivSettings;
