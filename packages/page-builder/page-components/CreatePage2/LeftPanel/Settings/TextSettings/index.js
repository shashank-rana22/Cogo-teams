import { Input, Select } from '@cogoport/components';
import { IcMAttach } from '@cogoport/icons-react';
import React, { useCallback } from 'react';

function TextSettings({ item }) {
	const handleChange = useCallback((key, value) => {
		console.log(`Setting ${key} to ${value}`);
	}, []);

	const settings = [
		{
			label : 'Background Image',
			key   : 'backgroundImage',
			type  : 'file',
		},

		{ label: 'Text', key: 'text' },
		{ label: 'Font Size', key: 'fontSize', type: 'number' },
		{ label: 'Color', key: 'color', type: 'color' },
		{
			label   : 'Font Weight',
			key     : 'fontWeight',
			type    : 'select',
			options : ['normal', 'bold'],
		},
		{
			label   : 'Text Decoration',
			key     : 'textDecoration',
			type    : 'select',
			options : ['none', 'underline', 'overline', 'line-through'],
		},
		{
			label   : 'Text Align',
			key     : 'textAlign',
			type    : 'select',
			options : ['left', 'center', 'right', 'justify'],
		},
		{ label: 'Letter Spacing', key: 'letterSpacing', type: 'number' },
		{ label: 'Line Height', key: 'lineHeight', type: 'number' },
		{
			label   : 'Font Style',
			key     : 'fontStyle',
			type    : 'select',
			options : ['normal', 'italic', 'oblique'],
		},
		{
			label   : 'Text Transform',
			key     : 'textTransform',
			type    : 'select',
			options : ['none', 'capitalize', 'uppercase', 'lowercase'],
		},
		{
			label   : 'Word Wrap',
			key     : 'wordWrap',
			type    : 'select',
			options : ['normal', 'break-word'],
		},
		{
			label   : 'White Space',
			key     : 'whiteSpace',
			type    : 'select',
			options : ['normal', 'nowrap', 'pre-wrap'],
		},
		{ label: 'Word Spacing', key: 'wordSpacing', type: 'number' },
		{ label: 'Text Indent', key: 'textIndent', type: 'number' },
		{
			label   : 'Vertical Align',
			key     : 'verticalAlign',
			type    : 'select',
			options : ['baseline', 'top', 'middle', 'bottom'],
		},

	];

	const handleInputChange = useCallback(
		(e, key) => {
			const { value } = e.target;
			handleChange(key, value);
		},
		[handleChange],
	);

	const handleSelectChange = useCallback(
		(value, key) => {
			handleChange(key, value);
		},
		[handleChange],
	);

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

					{type === 'file' && (
						<IcMAttach width={20} height={20} />
					)}

					{type === 'select' && (
						<Select
							value={item[key]}
							onChange={(value) => handleSelectChange(value, key)}
							style={{ width: '200px' }}
							options={options}
						/>
					)}

					{!['file', 'select'].includes(type) && (
						<Input
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

export default TextSettings;
