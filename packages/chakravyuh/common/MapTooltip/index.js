import React from 'react';

function MapTooltip({ color = null, display_name = '', value = null, key = '', alt_text = 'No Rates' }) {
	return (
		<div style={{ color: color || '#333' }}>
			<h3>{display_name}</h3>
			{value && (
				<h4>
					{`${key} : ${value || alt_text} ${value ? '%' : ''}`}
				</h4>
			)}
		</div>
	);
}

export default MapTooltip;
