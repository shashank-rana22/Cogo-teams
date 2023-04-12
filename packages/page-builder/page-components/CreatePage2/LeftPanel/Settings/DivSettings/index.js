import React from 'react';

import styles from './styles.module.css';

const settings = [
	{ label: 'Background Color', key: 'backgroundColor', type: 'color' },
	{ label: 'Border Color', key: 'borderColor', type: 'color' },
	{ label: 'Border Width', key: 'borderWidth', type: 'number' },
	{
		label   : 'Border Style',
		key     : 'borderStyle',
		type    : 'select',
		options : ['none', 'solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset'],
	},
	{
		label : 'Box Shadow',
		key   : 'boxShadow',
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
		key     : 'flexDirection',
		type    : 'select',
		options : ['row', 'row-reverse', 'column', 'column-reverse'],
	},
	{
		label : 'Flex Grow',
		key   : 'flexGrow',
		type  : 'number',
	},
	{
		label : 'Flex Shrink',
		key   : 'flexShrink',
		type  : 'number',
	},
	{
		label : 'Flex Basis',
		key   : 'flexBasis',
		type  : 'number',
	},
	{
		label   : 'Align Items',
		key     : 'alignItems',
		type    : 'select',
		options : ['stretch', 'center', 'flex-start', 'flex-end', 'baseline'],
	},
	{
		label   : 'Align Content',
		key     : 'alignContent',
		type    : 'select',
		options : ['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around'],
	},
	{
		label   : 'Align Self',
		key     : 'alignSelf',
		type    : 'select',
		options : ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
	},
	{
		label   : 'Justify Content',
		key     : 'justifyContent',
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
						<select style={{ width: '120px' }} id={key} name={key}>
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
						/>

					)}
				</div>
			))}

		</div>
	);
}

export default DivSettings;
