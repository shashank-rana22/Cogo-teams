import React from 'react';

function MapTooltip({ color = null, display_name = '', deviation = null, showDeviation = true }) {
	return (
		<div style={{ color: color || '#333' }}>
			<h3>{display_name}</h3>
			{showDeviation && (
				<h4>
					{`Deviation : ${deviation || 'No Rates'} ${deviation ? '%' : ''}`}
				</h4>
			)}
		</div>
	);
}

export default MapTooltip;
