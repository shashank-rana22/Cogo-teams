import React from 'react';

import MyResponsiveBar from '../Common/ResponsiveBar';

function ReceivablesOutstandings() {
	const data = [
		{
			Duration : '06-11-2023 to 06-11-2023',
			sandwich : 24,
			fries    : 57,
		},
		{
			Duration : '07-11-2023 to 08-11-2023',
			sandwich : 190,
			fries    : 91,
		},
		{
			Duration : '08-11-2023 to 09-11-2023',
			sandwich : 99,
			fries    : 155,
		},
		{
			Duration : '09-11-2023 to 10-11-2023',
			sandwich : 97,
			fries    : 181,
		},
		{
			Duration : '11-11-2023 to 12-11-2023',
			sandwich : 41,
			fries    : 22,
		},
		{
			Duration : '12-11-2023 to 13-11-2023',
			sandwich : 121,
			fries    : 88,
		},
		{
			Duration : '13-11-2023 to 14-11-2023',
			sandwich : 133,
			fries    : 157,
		},
	];

	const NEW_DATA = [
		{
			name    : 'surface',
			surface : 24,
		},
		{
			name    : 'air',
			surface : 190,
		},
		{
			name    : 'surfaces',
			surface : 99,
		},
		{
			name : 'airs',
			air  : -5,
		},
		{
			name    : 'surfacess',
			surface : 99,
		},
		{
			name : 'airss',
			air  : -5,
		},
		{
			name    : 'surfacesss',
			surface : 99,
		},
		{
			name : 'airsss',
			air  : -5,
		},
		{
			name    : 'surfacessss',
			surface : 99,
		},
		{
			name : 'airssss',
			air  : -5,
		},
	];

	return (
		<div>
			<MyResponsiveBar data={data} />
			<MyResponsiveBar
				data={NEW_DATA}
				keys={['surface', 'air']}
				legendX=""
				legendY=""
				width="45%"
				colors={['#88CAD1']}
				height="274px"
				indexBy="name"
				enableGridY
				legends={false}
				margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
				axisLeft={{
					tickSize       : 0,
					tickPadding    : 0,
					tickRotation   : 0,
					legend         : 'Percentage',
					legendPosition : 'middle',
					legendOffset   : -40,
					ariaHidden     : true,
				}}
			/>
		</div>
	);
}

export default ReceivablesOutstandings;
