import { Input, Select } from '@cogoport/components';
import { IcMAttach } from '@cogoport/icons-react';
import React, { useCallback } from 'react';

import textSettings from '../../../../../configurations/text-settings';

function TextSettings({ item }) {
	const handleChange = useCallback((key, value) => {
		console.log(`Setting ${key} to ${value}`);
	}, []);

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
			{textSettings.map(({ label, key, type, options }) => (
				<div
					key={key}
					style={{
						margin         : '8px 0',
						padding        : '8px',
						display        : 'flex',
						justifyContent : 'space-between',
					}}
				>
					<div>{label}</div>

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
