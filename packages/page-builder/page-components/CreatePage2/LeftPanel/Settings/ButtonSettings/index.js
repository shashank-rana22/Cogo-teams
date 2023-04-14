import React, { useCallback } from 'react';

import buttonSettings from '../../../../../configurations/button-settings';

function ButtonSettings({ item }) {
	const handleChange = useCallback((key, value) => {
		console.log(`Setting ${key} to ${value}`);
	}, []);

	const handleInputChange = useCallback((e, key) => {
		const { value } = e.target;
		handleChange(key, value);
	}, [handleChange]);

	const handleSelectChange = useCallback((value, key) => {
		handleChange(key, value);
	}, [handleChange]);

	return (
		<div>
			{buttonSettings.map(({ label, key, type, options }) => (
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
