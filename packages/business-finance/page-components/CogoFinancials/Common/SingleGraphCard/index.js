import React from 'react';

import RenderCardHeader from '../RenderCardHeader';
import MyResponsiveBar from '../ResponsiveBar';

import styles from './styles.module.css';

function SingleGraphCard({ heading = '' }) {
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

	];

	return (
		<div className={styles.container}>
			<div className={styles.flexhead}>
				<RenderCardHeader title={heading} />
			</div>

			<MyResponsiveBar
				data={NEW_DATA}
				keys={['surface', 'air']}
				legendX=""
				legendY=""
				width="300px"
				height="300px"
				colors={['#88CAD1']}
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
export default SingleGraphCard;
