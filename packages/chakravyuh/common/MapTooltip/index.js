import React from 'react';

function MapTooltip({ color = null, display_name = '', accuracy = null }) {
	return (
		<div style={{ color: color || '#333' }}>
			<h3>{display_name}</h3>
			{accuracy && (
				<h4>
					{`Accuracy : ${accuracy || 'No Rates'} ${accuracy ? '%' : ''}`}
				</h4>
			)}
		</div>
	);
}

export default MapTooltip;
