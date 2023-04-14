import { Input, Select } from '@cogoport/components';
import React, { useCallback } from 'react';

import imageSettings from '../../../../../configurations/image-settings';

function ImageSettings({ item }) {
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
			{imageSettings.map(({ label, key, type, options }) => (
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
						<Select
							value={item[key]}
							onChange={(value) => handleSelectChange(value, key)}
							style={{ width: '200px' }}
							options={options}
						/>
					) : (
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

export default ImageSettings;
